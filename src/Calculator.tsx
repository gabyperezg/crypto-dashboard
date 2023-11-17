import React, { ChangeEvent, useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { CoinType, CurrencyType, Data } from "./App";

const Calculator = ({ data }: { data: Data }) => {
  console.log(data);
  const [amount, setAmount] = useState("0");
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>("USD");
  const [selectedCoin, setSelectedCoin] = useState<CoinType>("BTC");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value.toString());
  };

  const handleCurrencyChange = (e: SelectChangeEvent<string>) => {
    setSelectedCurrency(e.target.value as CurrencyType);
  };

  const handleCoinChange = (e: SelectChangeEvent<string>) => {
    setSelectedCoin(e.target.value as CoinType);
  };

  useEffect(() => {
    if (data && data[selectedCoin] && data[selectedCoin][selectedCurrency]) {
      const conversionRate = data[selectedCoin][selectedCurrency];
      const converted = parseInt(amount) * conversionRate;
      setConvertedAmount(converted);
    }
  }, [amount, selectedCurrency, selectedCoin, data]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Calculator
      </Typography>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            type="number"
            value={amount}
            onChange={handleAmountChange}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={4} alignSelf="center">
          <Select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            variant="outlined"
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={8}>
          <TextField
            type="number"
            value={convertedAmount}
            variant="outlined"
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4} alignSelf="center">
          <Select
            value={selectedCoin}
            onChange={handleCoinChange}
            variant="outlined"
          >
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </>
  );
};

export default Calculator;
