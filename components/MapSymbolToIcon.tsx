import { ECoinSymbol } from "@/constants";
import Image from "next/image";

export function mapSymbolToIcon(symbol: string) {
  switch (symbol) {
    case ECoinSymbol.BTCUSDT:
    case ECoinSymbol.BTCUSDC:
      return (
        <Image
          src="/icons/btc.png"
          width={28}
          height={28}
          alt={symbol}
          className="rounded-full"
        />
      );
    case ECoinSymbol.ETHUSDT:
    case ECoinSymbol.ETHUSDC:
    case ECoinSymbol.ETHBTC:
      return (
        <Image
          src="/icons/eth.png"
          width={28}
          height={28}
          alt={symbol}
          className="rounded-full"
        />
      );
    case ECoinSymbol.USDCUSDT:
      return (
        <Image
          src="/icons/usdc.png"
          width={28}
          height={28}
          alt={symbol}
          className="rounded-full"
        />
      );
    case ECoinSymbol.SOLUSDC:
      return (
        <Image
          src="/icons/sol.png"
          width={28}
          height={28}
          alt={symbol}
          className="rounded-full"
        />
      );
    case ECoinSymbol.XRPUSDC:
      return (
        <Image
          src="/icons/xrp.png"
          width={28}
          height={28}
          alt={symbol}
          className="rounded-full"
        />
      );
    case ECoinSymbol.MATICUSDC:
      return (
        <Image
          src="/icons/matic.png"
          width={28}
          height={28}
          alt={symbol}
          className="rounded-full"
        />
      );
    default:
      return null;
  }
}
