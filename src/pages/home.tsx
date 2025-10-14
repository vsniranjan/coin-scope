import CoinCard from "../components/CoinCard";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";
import LimitSelector from "../components/LimitSelector";
import type { Coin } from "../App";

interface HomePageProps {
  coins: Coin[];
  filter: string;
  limit: number;
  sortBy: string;
  loading: boolean;
  error: Error | null;
  setFilter: (filter: string) => void;
  setLimit: (limit: number) => void;
  setSortBy: (sortBy: string) => void;
}

const HomePage = ({
  coins,
  filter,
  limit,
  sortBy,
  loading,
  error,
  setSortBy,
  setFilter,
  setLimit,
}: HomePageProps) => {
  // Showing Filtered coins
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLocaleLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLocaleLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      {!loading && !error && (
        <main className='grid'>
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
