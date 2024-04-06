import { coins } from "./coin";

export const wsUrl = `wss://stream.binance.com:9443/stream?streams=${coins
  .map((coin) => `${coin.toLowerCase()}@ticker`)
  .join("/")}`;
