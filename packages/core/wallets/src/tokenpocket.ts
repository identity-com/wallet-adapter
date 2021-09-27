import { TokenPocketWalletAdapter, TokenPocketWalletAdapterConfig } from '@solana/wallet-adapter-tokenpocket';
import { Wallet, WalletName } from './types';

export const getTokenPocketWallet = (config: TokenPocketWalletAdapterConfig = {}): Wallet => ({
    name: WalletName.TokenPocket,
    url: 'https://tokenpocket.pro',
    icon: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0uNS0uNWgxMDI0djEwMjRoLTEwMjR6IiBmaWxsPSIjMjk4MGZlIi8+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTQ2NC4xIDM4OS43aC0xOS4xdi0xMzYuNGgtMjUyYy00LjggMC04LjcgMy45LTguNyA4Ljd2MTkyLjNjMCA0LjggMy45IDguNyA4LjcgOC43aDk2LjJ2MzQ5LjdjMCA0LjggMy45IDguNyA4LjcgOC43aDE1Ny40YzQuOCAwIDguNy0zLjkgOC43LTguN3YtNDIzeiIgb3BhY2l0eT0iLjYiLz48cGF0aCBkPSJtNjMwLjggMjAxLjVoLTYwLjUtMTY2LjFjLTQuOCAwLTguNyAzLjktOC43IDguN3Y1NTAuOGMwIDQuOCAzLjkgOC43IDguNyA4LjdoMTU3LjRjNC44IDAgOC43LTMuOSA4LjctOC43di0xMzkuOWg2MC41YzExNS45IDAgMjA5LjgtOTMuOSAyMDkuOC0yMDkuOHMtOTMuOS0yMDkuOC0yMDkuOC0yMDkuOHoiLz48L2c+PC9zdmc+',
    adapter: () => new TokenPocketWalletAdapter(config),
});
