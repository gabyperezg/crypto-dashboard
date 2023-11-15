import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Data } from "./App";

const Graph = ({ data }: { data: Data[] }) => {
  const graphData = data.map((entry) => {
    console.log(entry);
    console.log(
      entry.time.getHours() + entry.time.getMinutes() + entry.time.getSeconds()
    );
    return {
      time:
        entry.time.getHours() +
        entry.time.getMinutes() +
        entry.time.getSeconds(),
      BTC: entry.BTC.USD,
      ETH: entry.ETH.USD,
    };
  });

  return (
    <LineChart width={800} height={400} data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="BTC" stroke="#8884d8" />
      <Line type="monotone" dataKey="ETH" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Graph;
