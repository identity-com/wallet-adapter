import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';
import { useSnackbar } from 'notistack';

export const SendOneLamportToRandomAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, signAllTransactions } = useWallet();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: Keypair.generate().publicKey,
                lamports: 1,
            }),
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: Keypair.generate().publicKey,
                lamports: 1,
            })
        );

        const transaction2 = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: Keypair.generate().publicKey,
                lamports: 1,
            }),
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: Keypair.generate().publicKey,
                lamports: 1,
            })
        );

        transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        transaction2.recentBlockhash = transaction.recentBlockhash;
        transaction.feePayer = publicKey;
        transaction2.feePayer = publicKey;

        try {
            enqueueSnackbar('Sending Transaction....');

            // Test bulk TX Signing.
            if (signAllTransactions) {
                const signedTxs = await signAllTransactions([transaction, transaction2]);
                enqueueSnackbar('Signed all transactions!');

                await Promise.all(signedTxs.map(async (transaction, i) => {
                    const send = enqueueSnackbar(`Sending transaction ${i}`);
                    const signature = await connection.sendRawTransaction(transaction.serialize());
                    closeSnackbar(send);

                    const confirm = enqueueSnackbar(`Confirming transaction ${i}`);
                    await connection.confirmTransaction(signature, 'processed');
                    closeSnackbar(confirm);

                    enqueueSnackbar(`Transaction ${i} confirmed!`, { variant: 'success' });
                }))
            }
            else{
                const signature = await sendTransaction(transaction, connection);
                const confirm = enqueueSnackbar('Confirming Transaction 1....');

                await connection.confirmTransaction(signature, 'processed');
                closeSnackbar(confirm);
                enqueueSnackbar('Transaction 1 confirmed!', { variant: 'success' });

                const signature2 = await sendTransaction(transaction2, connection);
                const confirm2 = enqueueSnackbar('Confirming Transaction 2....');

                await connection.confirmTransaction(signature2, 'processed');
                closeSnackbar(confirm2);
                enqueueSnackbar('Transaction 2 confirmed!', { variant: 'success' });
            }
        } catch (e) {
            enqueueSnackbar((e as Error).message, { variant: 'error' });
            console.error(e);
        }
    }, [publicKey, sendTransaction, connection]);

    return (
        <button onClick={onClick} disabled={!publicKey}>
            Send 1 lamport to a random address!
        </button>
    );
};
