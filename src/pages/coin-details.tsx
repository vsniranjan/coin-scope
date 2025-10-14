import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import type { Coin } from "../App";

const API_URL: string = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await axios.get<Coin>(`${API_URL}/${id}`);
        console.log(res.data);
        setCoin(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return <div>Coin Details {id}</div>;
};

export default CoinDetailsPage;
