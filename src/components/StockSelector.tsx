import React from 'react';
import { ChevronDown } from 'lucide-react';

interface StockSelectorProps {
  symbols: { symbol: string; name: string }[];
  selectedSymbol: string;
  onSymbolChange: (symbol: string) => void;
}

const StockSelector: React.FC<StockSelectorProps> = ({
  symbols,
  selectedSymbol,
  onSymbolChange,
}) => {
  return (
    <div className="relative inline-block text-left">
      <select
        value={selectedSymbol}
        onChange={(e) => onSymbolChange(e.target.value)}
        className="block appearance-none w-full bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {symbols.map((item) => (
          <option key={item.symbol} value={item.symbol}>
            {item.name} ({item.symbol})
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
};

export default StockSelector;
