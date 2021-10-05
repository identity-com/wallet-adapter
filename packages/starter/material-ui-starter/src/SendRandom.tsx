import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback } from 'react';
import { useSnackbar } from 'notistack';

export const SendOneLamportToRandomAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, signAllTransactions } = useWallet();

    const { enqueueSnackbar } = useSnackbar();

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
        }
    }, [publicKey, sendTransaction, connection]);

    return (
        <button onClick={onClick} disabled={!publicKey}>
            Send 1 lamport to a random address!
        </button>
    );
};
