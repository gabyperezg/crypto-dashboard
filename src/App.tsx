import { useState, useEffect } from "react";
import Graph from "./Graph";
import moment from "moment";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import PriceTable from "./PriceTable";
import Calculator from "./Calculator";
import Typography from "@mui/material/Typography";
interface CoinData {
  USD: number;
  EUR: number;
}
export interface Data {
  time: string;
  ETH: CoinData;
  BTC: CoinData;
}

export type CoinType = "BTC" | "ETH";
export type CurrencyType = "USD" | "EUR";
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

      setData((prevData) => [
        ...(prevData.length === 10 ? prevData.slice(1) : prevData),
        {
          time: moment().format("MMMM Do YYYY, h:mm:ss a"),
          BTC: btcResult,
          ETH: ethResult,
        },
      ]);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom align="center">
        Crypto Dashboard
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={8}>
          <Graph data={data} />
        </Grid>
        <Grid item xs={4}>
          <Calculator data={data[data.length - 1]} />
        </Grid>
        <Grid item xs={6}>
          <PriceTable data={data} type="BTC" />
        </Grid>
        <Grid item xs={6}>
          <PriceTable data={data} type="ETH" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
