import { useState, useEffect } from "react";
import Graph from "./Graph";
interface CoinData {
  USD: number;
  EUR: number;
}
export interface Data {
  time: Date;
  ETH: CoinData;
  BTC: CoinData;
}

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const btcResponse = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR",
        {
          headers: {
            authorization: `Apikey ${apiKey}`,
          },
        }
      );
      const ethResponse = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR",
        {
          headers: {
            authorization: `Apikey ${apiKey}`,
          },
        }
      );

      const ethResult = await ethResponse.json();
      const btcResult = await btcResponse.json();

      setData((prevData) => {
        if (prevData.length === 10) {
          return [
            ...prevData.slice(1),
            { time: new Date(), BTC: btcResult, ETH: ethResult },
          ];
        } else {
          return [
            ...prevData,
            { time: new Date(), BTC: btcResult, ETH: ethResult },
          ];
        }
      });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  console.log(data);

  return (
    <div>
      <Graph data={data} />
    </div>
  );
};

export default App;
