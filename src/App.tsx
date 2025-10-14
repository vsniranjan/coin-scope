import { useState, useEffect, use } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import axios from "axios";

import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import NoteFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";

const API_URL: string = import.meta.env.VITE_API_URL;

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const App = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  // Initial Rendering of coins and updation in changing limit
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get<Coin[]>(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        setCoins(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit, sortBy]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/coin/:id' element={<CoinDetailsPage />} />
        <Route path='*' element={<NoteFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
