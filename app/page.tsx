import { CoinList } from "@/components/CoinList";
import getListCoins from "@/services/coin";

const getData = async () => {
  const data = getListCoins();
  return data;
};

const Home = async () => {
  const assets = await getData();

  return <CoinList coins={assets} />;
};

export default Home;
