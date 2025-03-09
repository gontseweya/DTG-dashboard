import React, { useState, useEffect, useRef } from 'react';
import { fetchStockData } from './utils/api';
import StockSelector from './components/StockSelector';
import StockChart from './components/StockChart';
import StockTable from './components/StockTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { STOCK_SYMBOLS, REFRESH_INTERVAL } from './config';

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(STOCK_SYMBOLS[0].symbol);
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const cache = useRef<{ [symbol: string]: { data: any[]; timestamp: number } }>({});

  const fetchData = async (symbol: string) => {
    setLoading(true);
    setError(null);

    try {
      // Check if data is in the cache and not expired
      if (cache.current[symbol] && (Date.now() - cache.current[symbol].timestamp < REFRESH_INTERVAL)) {
        setStockData(cache.current[symbol].data);
        setLastUpdated(cache.current[symbol].timestamp);
        setLoading(false); // Set loading to false immediately when using cached data
        return;
      }

      const data = await fetchStockData(symbol);
      setStockData(data);
      const timestamp = Date.now();
      setLastUpdated(timestamp);

      // Store data in cache
      cache.current[symbol] = { data, timestamp };
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data only when the component mounts and when selectedSymbol changes
    fetchData(selectedSymbol);

    const intervalId = setInterval(() => {
      fetchData(selectedSymbol);
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [selectedSymbol]);

  const selectedStock = STOCK_SYMBOLS.find(stock => stock.symbol === selectedSymbol);

  const formattedLastUpdated = lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never';

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center gradient-text">
        Stock Price Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="glassmorphism p-4">
          <StockSelector
            symbols={STOCK_SYMBOLS}
            selectedSymbol={selectedSymbol}
            onSymbolChange={setSelectedSymbol}
          />
        </div>
        <div className="glassmorphism p-4">
          <p>Last Updated: {formattedLastUpdated}</p>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <LoadingSpinner />}

      {!loading && !error && stockData.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          <div className="text-center text-2xl font-bold mb-4 text-gray-300">
            {selectedStock?.name} ({selectedSymbol})
          </div>
          <div className="glassmorphism p-4 glowing-container">
            <StockChart data={stockData} />
          </div>
          <div className="glassmorphism p-4 glowing-container">
            <StockTable data={stockData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
