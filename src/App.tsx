import { useState, useEffect } from "react";

interface Data {
  time: Date;
  USD: number;
  EUR: number;
}

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [btcData, setBtcData] = useState<Data[]>([]);
  const [ethData, setEthData] = useState<Data[]>([]);

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
      const btcResult = await btcResponse.json();

      setBtcData((prevBtcData) => {
        if (prevBtcData.length === 10) {
          return [...prevBtcData.slice(1), { time: new Date(), ...btcResult }];
        } else {
          return [...prevBtcData, { time: new Date(), ...btcResult }];
        }
      });

      const ethResponse = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR",
        {
          headers: {
            authorization: `Apikey ${apiKey}`,
          },
        }
      );
      const ethResult = await ethResponse.json();
      setEthData((prevEthData) => {
        if (prevEthData.length === 10) {
          return [...prevEthData.slice(1), { time: new Date(), ...ethResult }];
        } else {
          return [...prevEthData, { time: new Date(), ...ethResult }];
        }
      });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  console.log(btcData);
  console.log(ethData);
  return <div></div>;
};

export default App;
