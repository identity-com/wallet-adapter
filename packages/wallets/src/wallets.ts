import { MessageSignerWalletAdapter, SignerWalletAdapter, WalletAdapter } from '@solana/wallet-adapter-base';
import { BitpieWalletAdapter, BitpieWalletAdapterConfig } from '@solana/wallet-adapter-bitpie';
import { BloctoWalletAdapter, BloctoWalletAdapterConfig } from '@solana/wallet-adapter-blocto';
import { Coin98WalletAdapter, Coin98WalletAdapterConfig } from '@solana/wallet-adapter-coin98';
import { LedgerWalletAdapter, LedgerWalletAdapterConfig } from '@solana/wallet-adapter-ledger';
import { MathWalletWalletAdapter, MathWalletWalletAdapterConfig } from '@solana/wallet-adapter-mathwallet';
import { PhantomWalletAdapter, PhantomWalletAdapterConfig } from '@solana/wallet-adapter-phantom';
import { SafePalWalletAdapter, SafePalWalletAdapterConfig } from '@solana/wallet-adapter-safepal';
import { SlopeWalletAdapter, SlopeWalletAdapterConfig } from '@solana/wallet-adapter-slope';
import { SolflareWalletAdapter, SolflareWalletAdapterConfig } from '@solana/wallet-adapter-solflare';
import { SolletWalletAdapter, SolletWalletAdapterConfig } from '@solana/wallet-adapter-sollet';
import { SolongWalletAdapter, SolongWalletAdapterConfig } from '@solana/wallet-adapter-solong';
import { TorusWalletAdapter, TorusWalletAdapterConfig } from '@solana/wallet-adapter-torus';
import { CloverWalletWalletAdapter, CloverWalletWalletAdapterConfig } from '@solana/wallet-adapter-clover';
export enum WalletName {
    Bitpie = 'Bitpie',
    Blocto = 'Blocto',
    Coin98 = 'Coin98',
    Ledger = 'Ledger',
    MathWallet = 'MathWallet',
    Phantom = 'Phantom',
    SafePal = 'SafePal',
    Slope = 'Slope',
    Solflare = 'Solflare',
    SolflareWeb = 'Solflare (Web)',
    Sollet = 'Sollet',
    SolletExtension = 'Sollet (Extension)',
    Solong = 'Solong',
    Torus = 'Torus',
    Clover = 'Clover',
}

export interface Wallet {
    name: WalletName;
    url: string;
    icon: string;
    adapter: () => WalletAdapter | SignerWalletAdapter | MessageSignerWalletAdapter;
}

export const ICONS_URL = 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons';

export const getBitpieWallet = (config: BitpieWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.Bitpie,
    url: 'https://bitpiecn.com',
    icon: `${ICONS_URL}/bitpie.svg`,
    adapter: () => new BitpieWalletAdapter(config),
});

export const getBloctoWallet = (config: BloctoWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.Blocto,
    url: 'https://wallet.blocto.app',
    icon: `${ICONS_URL}/blocto.svg`,
    adapter: () => new BloctoWalletAdapter(config),
});

export const getCoin98Wallet = (config: Coin98WalletAdapterConfig = {}): Wallet => ({
    name: WalletName.Coin98,
    url: 'https://coin98.com',
    icon: `${ICONS_URL}/coin98.svg`,
    adapter: () => new Coin98WalletAdapter(config),
});

export const getLedgerWallet = (config: LedgerWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.Ledger,
    url: 'https://www.ledger.com',
    icon: `${ICONS_URL}/ledger.svg`,
    adapter: () => new LedgerWalletAdapter(config),
});

export const getMathWallet = (config: MathWalletWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.MathWallet,
    url: 'https://mathwallet.org',
    icon: `${ICONS_URL}/mathwallet.svg`,
    adapter: () => new MathWalletWalletAdapter(config),
});

export const getPhantomWallet = (config: PhantomWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.Phantom,
    url: 'https://www.phantom.app',
    icon: `${ICONS_URL}/phantom.svg`,
    adapter: () => new PhantomWalletAdapter(config),
});

export const getSafePalWallet = (config: SafePalWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.SafePal,
    url: 'https://www.safepal.io',
    icon: `${ICONS_URL}/safepal.svg`,
    adapter: () => new SafePalWalletAdapter(config),
});

export const getSlopeWallet = (config: SlopeWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.Slope,
    url: 'https://www.slope.finance/#/wallet',
    icon: `${ICONS_URL}/slope.svg`,
    adapter: () => new SlopeWalletAdapter(config),
});

export const getSolflareWallet = (config: SolflareWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.Solflare,
    url: 'https://solflare.com',
    icon: `${ICONS_URL}/solflare.svg`,
    adapter: () => new SolflareWalletAdapter(config),
});

export const getSolflareWebWallet = ({ provider, ...config }: SolletWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.SolflareWeb,
    url: 'https://solflare.com',
    icon: `${ICONS_URL}/solflare.svg`,
    adapter: () => new SolletWalletAdapter({ provider: 'https://solflare.com/access-wallet', ...config }),
});

export const getSolletWallet = ({ provider, ...config }: SolletWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.Sollet,
    url: 'https://www.sollet.io',
    icon: `${ICONS_URL}/sollet.svg`,
    adapter: () => new SolletWalletAdapter({ provider: 'https://www.sollet.io', ...config }),
});

export const getSolletExtensionWallet = ({ provider, ...config }: SolletWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.SolletExtension,
    url: 'https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno',
    icon: `${ICONS_URL}/sollet_extension.png`,
    adapter: () => new SolletWalletAdapter(config),
});

export const getSolongWallet = (config: SolongWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.Solong,
    url: 'https://solongwallet.com',
    icon: `${ICONS_URL}/solong.png`,
    adapter: () => new SolongWalletAdapter(config),
});

export const getTorusWallet = (config: TorusWalletAdapterConfig): Wallet => ({
    name: WalletName.Torus,
    url: 'https://tor.us',
    icon: `${ICONS_URL}/torus.svg`,
    adapter: () => new TorusWalletAdapter(config),
});

export const getCloverWallet = (config: CloverWalletWalletAdapterConfig): Wallet => ({
    name: WalletName.Clover,
    url: 'https://clover.finance',
    icon: `${ICONS_URL}/clover.svg`,
    adapter: () => new CloverWalletWalletAdapter(config),
});
