import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

import type { CoinDetails } from "../App";

const API_URL: string = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await axios.get<CoinDetails>(`${API_URL}/${id}`);
        setCoin(res.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <div className='coin-details-container'>
      <Link to={"/"}> Back To Home</Link>
      <h1 className='coin-details-title'>
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>
      {loading && <p>Loading...</p>}
      {error && <div className='error'>{error.message}</div>}
      {!loading && !error && (
        <>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            className='coin-details-image'
          />
          <p>{coin?.description.en.split(". ")[0] + "."}</p>
          <div className='coin-details-info'>
            <h3>Rank: {coin?.market_cap_rank}</h3>
            <h3>
              Current Price: ₹
              {coin?.market_data.current_price.inr.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ₹{coin?.market_data.market_cap.inr.toLocaleString()}
            </h4>
            <h4>
              24h High: ₹{coin?.market_data.high_24h.inr.toLocaleString()}
            </h4>
            <h4>24h Low: ₹{coin?.market_data.low_24h.inr.toLocaleString()}</h4>
            <h4>
              24h Price Change: ₹
              {coin?.market_data.price_change_24h_in_currency.inr.toFixed(2)} (
              {coin?.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              Circulating Supply:{" "}
              {coin?.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{" "}
              {coin?.market_data.total_supply?.toLocaleString() || "N/A"}
            </h4>
            <h4>
              All-Time High: ₹{coin?.market_data.ath.inr.toLocaleString()} on{" "}
              {coin?.market_data.ath_date.inr
                ? new Date(coin.market_data.ath_date.inr).toLocaleDateString(
                    "en-GB"
                  )
                : "N/A"}
            </h4>

            <h4>
              All-Time Low: ₹{coin?.market_data.atl.inr.toLocaleString()} on{" "}
              {coin?.market_data.atl_date.inr
                ? new Date(coin.market_data.atl_date.inr).toLocaleDateString(
                    "en-GB"
                  )
                : "N/A"}
            </h4>

            <h4>
              Last Updated:{" "}
              {coin?.last_updated
                ? new Date(coin.last_updated).toLocaleDateString("en-GB")
                : "N/A"}
            </h4>
          </div>
          <div className='coin-details-links'>
            {coin?.links.homepage[0] && (
              <p>
                <a
                  href={coin.links.homepage[0]}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Website
                </a>
              </p>
            )}

            {coin?.links.blockchain_site[0] && (
              <p>
                <a
                  href={coin.links.blockchain_site[0]}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Blockchain Explorer
                </a>
              </p>
            )}

            {coin?.categories && coin.categories.length > 0 && (
              <p>Categories: {coin?.categories.join(", ")}</p>
            )}

            {!loading && !error && !coin && <p>No Data Found</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetailsPage;
