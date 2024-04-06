import { Coin } from "@/types";
import axios from "axios";

const BASE_URL = "https://api.binance.com/api/v3";

const getListCoins = async (): Promise<Coin[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/ticker/24hr?symbols=["ETHBTC","BTCUSDT","ETHUSDT","BTCUSDC","ETHUSDC","XRPUSDC","USDCUSDT","SOLUSDC","MATICUSDC"]`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-MBX-APIKEY": process.env.BINANCE_API_KEY,
        },
      }
    );
    return response.data.map((item: Coin) => {
      return {
        symbol: item.symbol,
        lastPrice: item.lastPrice,
        priceChangePercent: item.priceChangePercent,
        volume: item.volume,
        quoteVolume: item.quoteVolume,
      };
    });
  } catch (error) {
    throw new Error(`Error fetching Binance data: ${(error as Error).message}`);
  }
};

export default getListCoins;
