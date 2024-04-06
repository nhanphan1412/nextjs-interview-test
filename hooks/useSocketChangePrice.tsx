import { wsUrl } from "@/constants";
import { Coin } from "@/types";
import { useEffect, useState } from "react";

export function useSocketChangePrice(assets: Coin[]) {
  const [state, setState] = useState({
    assets: assets || [],
    loading: true,
    errorMessage: "",
  });

  const updateState = (obj = {}) => {
    setState((prev) => {
      return { ...prev, ...obj };
    });
  };

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    const interval = setInterval(() => {
      ws.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);
        const newData = {
          symbol: message.data?.s,
          lastPrice: message.data?.c,
          priceChangePercent: message.data?.P,
          volume: message.data?.v,
          quoteVolume: message.data?.q,
          highlight: false,
        };
        const res = state.assets?.map((el: Coin) => {
          if (newData.symbol === el.symbol) {
            return {
              ...newData,
              highlight: newData !== el ? true : false,
            };
          }
          return { ...el, highlight: false };
        });
        updateState({ assets: res, loading: false, errorMessage: "" });
      };
    }, 5000);

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, [state.assets]);

  return {
    data: state?.assets || [],
    error: state?.errorMessage || "",
    loading: state?.loading,
  };
}
