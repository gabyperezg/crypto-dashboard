// App.js
import React, { useState, useEffect } from "react";

const App = () => {
  const [btcData, setBtcData] = useState(null);
  const [ethData, setEthData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const btcResponse = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR",
        {
          headers: {
            authorization:
              "Apikey 1f7b26536d7cddeb07670231a6219095065fd96b27e259b54b7de6a6d4357d34",
          },
        }
      );
      const btcResult = await btcResponse.json();
      setBtcData(btcResult);

      const ethResponse = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR",
        {
          headers: {
            authorization:
              "Apikey 1f7b26536d7cddeb07670231a6219095065fd96b27e259b54b7de6a6d4357d34",
          },
        }
      );
      const ethResult = await ethResponse.json();
      setEthData(ethResult);
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
