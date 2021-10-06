import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';
import { useSnackbar } from 'notistack';

export const SendOneLamportToRandomAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: Keypair.generate().publicKey,
                lamports: 1,
            })
        );

        transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash
        transaction.feePayer = publicKey

        console.log(await connection.getEpochInfo('recent'));

        try {
            enqueueSnackbar('Sending Transaction....')

            // Test bulk TX Signing.
            // if (signAllTransactions) {
            //     const signedTxs = await signAllTransactions([transaction]);
            //     console.log('Signed all txes!')
            // }

            const signature = await sendTransaction(transaction, connection);
            enqueueSnackbar('Confirming Transaction....')

            await connection.confirmTransaction(signature, 'processed');
            enqueueSnackbar('Transaction confirmed!', { variant: 'success' })
        } catch (e) {
            enqueueSnackbar((e as Error).message, { variant: 'error' });
            console.error(e);
        }
    }, [publicKey, sendTransaction, connection, enqueueSnackbar]);

    const onFailingClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const transaction = new Transaction();
        const newAccount = Keypair.generate();
        const program = Keypair.generate().publicKey;
        transaction.add(SystemProgram.createAccount({ fromPubkey: publicKey, lamports: 100, space: 0, programId: program, newAccountPubkey: newAccount.publicKey}));
        transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

        enqueueSnackbar(`Creating account \`${newAccount.publicKey.toBase58()}\` with 100 lamports and assigning to \`${program.toBase58()}\``)
        try {
            const signature = await sendTransaction(transaction, connection, {signers: [newAccount]})
            const confirm = enqueueSnackbar('Confirming transaction...');

            await connection.confirmTransaction(signature, 'processed');
            closeSnackbar(confirm);
            enqueueSnackbar('Transaction confirmed!', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar((e as Error).message, { variant: 'error' });
            console.error(e);
        }
    }, [publicKey, sendTransaction, connection, enqueueSnackbar, closeSnackbar]);

    return (
        <React.Fragment>
            <button onClick={onClick} disabled={!publicKey}>
                Send 1 lamport to a random address!
            </button>
            <button onClick={onFailingClick} disabled={!publicKey}>
                Failing transaction that will succeed when fixed!
            </button>
        </React.Fragment>
    );
};
