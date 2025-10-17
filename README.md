# CoinScope - Cryptocurrency Tracker

A modern React + TypeScript web application for tracking live cryptocurrency prices and market data. Built with Vite, React Router, and powered by the CoinGecko API.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- **Real-time Crypto Data**: Track live prices, market caps, and 24h changes
- **Interactive Charts**: 7-day price history visualization using Chart.js
- **Advanced Filtering**: Search coins by name or symbol
- **Flexible Sorting**: Sort by market cap, price, or 24h change (ascending/descending)
- **Adjustable Display**: Show 5, 10, 20, 50, or 100 coins at once
- **Detailed Coin Pages**: View comprehensive information including:
  - Current price, market cap, and trading volume
  - 24h high/low prices
  - All-time high/low with dates
  - Circulating and total supply
  - Official website and blockchain explorer links
- **Type-Safe**: Full TypeScript implementation

## Tech Stack

**Frontend:**

- React 19 with TypeScript
- React Router 7 for navigation
- Vite for development and builds
- Axios for API requests
- Chart.js with react-chartjs-2 for data visualization
- React Spinners for loading states
- Modern CSS with CSS variables

**Build Tools:**

- TypeScript compiler
- ESLint for code quality
- Vite plugin for React

**API:**

- CoinGecko API for cryptocurrency data

## Project Structure

```
CoinScope/
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
├── eslint.config.js             # ESLint rules
├── .env                         # Environment variables
├── public/                      # Static assets
└── src/
    ├── main.tsx                 # Application entry point
    ├── App.tsx                  # Root component with routing
    ├── index.css                # Global styles
    ├── components/              # Reusable components
    │   ├── Header.tsx           # Navigation header
    │   ├── CoinCard.tsx         # Individual coin display
    │   ├── CoinChart.tsx        # Price chart component
    │   ├── FilterInput.tsx      # Search filter
    │   ├── SortSelector.tsx     # Sorting dropdown
    │   ├── LimitSelector.tsx    # Results limit selector
    │   └── Sinner.tsx           # Loading spinner
    └── pages/                   # Route pages
        ├── home.tsx             # Main coin listing page
        ├── coin-details.tsx     # Individual coin details
        ├── about.tsx            # About page
        └── not-found.tsx        # 404 page
```

## Installation

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Git

### Setup

1. Clone the repository

```bash
git clone https://github.com/vsniranjan/coin-scope.git
cd coin-scope
```

2. Install dependencies

```bash
npm install
```

3. Create environment file

```bash
# Create .env file in root directory
VITE_API_URL="https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr"
VITE_COIN_API_URL="https://api.coingecko.com/api/v3/coins"
```

4. (Optional) Configure CoinGecko API Key

For higher rate limits, sign up at [CoinGecko](https://www.coingecko.com/en/api) and add your API key to API requests.

## Usage

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

Access the application at `http://localhost:5173`

### Production

Build the optimized production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## API Integration

### CoinGecko Endpoints

**Markets List** (`/coins/markets`)

- Fetches top cryptocurrencies by market cap
- Parameters: `vs_currency`, `order`, `per_page`, `page`, `sparkline`
- Returns: Array of coin objects with price and market data

**Coin Details** (`/coins/{id}`)

- Fetches comprehensive data for a specific coin
- Returns: Detailed coin information including description, links, and market data

**Market Chart** (`/coins/{id}/market_chart`)

- Fetches historical price data
- Parameters: `vs_currency`, `days`
- Returns: Time-series price data for charting

### Rate Limiting

CoinGecko's free tier has rate limits (~10-30 calls/minute). Consider:

- Implementing request debouncing
- Caching responses
- Using the demo API key for higher limits

## Environment Variables

Create a `.env` file in the root directory:

```env
# CoinGecko API base URLs
VITE_API_URL="https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr"
VITE_COIN_API_URL="https://api.coingecko.com/api/v3/coins"

# Optional: Add API key for higher rate limits
# VITE_COINGECKO_API_KEY=your_api_key_here
```

**Note:** `.env` file isn't git-ignored for this project as there is no sensitive data

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Niranjan V S**  
GitHub: [@vsniranjan](https://github.com/vsniranjan)

---

**Disclaimer:** Cryptocurrency prices are provided by CoinGecko API and are for informational purposes only. This application is not financial advice.
