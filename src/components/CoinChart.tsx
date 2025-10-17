const API_URL: string = import.meta.env.VITE_COIN_API_URL;
import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

interface CoinChartProps {
  coinId: string | undefined;
}

interface ChartData {
  datasets: {
    label: string;
    data: { x: number; y: number }[];
    fill: boolean;
    borderColor: string;
    backgroundColor: string;
    pointRadius: number;
    tension: number;
  }[];
}

const CoinChart = ({ coinId }: CoinChartProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await axios.get(
        `${API_URL}/${coinId}/market_chart?vs_currency=inr&days=7`
      );

      const data = res.data;

      const prices: { x: number; y: number }[] = data.prices.map(
        (price: [number, number]) => ({ x: price[0], y: price[1] })
      );

      setChartData({
        datasets: [
          {
            label: "Price (INR)",
            data: prices,
            fill: true,
            borderColor: "#007bff",
            backgroundColor: "rgba(0,123,255, 0.1)",
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });

      setLoading(false);
    };

    fetchPrices();
  }, [coinId]);
  return <>Chart</>;
};

export default CoinChart;
