import { useWallet } from '@identity.com/wallet-adapter-react';
import { WalletDisconnectButton, WalletMultiButton } from '@identity.com/wallet-adapter-react-ui';
import React, { FC } from 'react';

const Navigation: FC = () => {
    const { wallet } = useWallet();

    return (
        <nav>
            <h1>Solana Starter App</h1>
            <div>
                <WalletMultiButton />
                {wallet && <WalletDisconnectButton />}
            </div>
        </nav>
    );
};

export default Navigation;
