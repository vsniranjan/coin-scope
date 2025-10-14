import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import axios from "axios";

import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import NoteFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";

const API_URL: string = import.meta.env.VITE_API_URL;

// For /coins/markets endpoint (list view)
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

// For /coins/{id} endpoint (details view)
export interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  last_updated: string;
  categories: string[];

  description: {
    en: string;
  };

  links: {
    homepage: string[];
    blockchain_site: string[];
  };

  image: {
    thumb: string;
    small: string;
    large: string;
  };

  market_data: {
    total_supply: number;
    circulating_supply: number;
    price_change_percentage_24h: number;

    current_price: {
      inr: number;
    };

    market_cap: {
      inr: number;
    };

    price_change_24h_in_currency: {
      inr: number;
    };

    high_24h: {
      inr: number;
    };

    low_24h: {
      inr: number;
    };

    ath: {
      inr: number;
    };

    ath_date: {
      inr: string;
    };

    atl: {
      inr: number;
    };

    atl_date: {
      inr: string;
    };
  };
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
  }, [limit]);

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
