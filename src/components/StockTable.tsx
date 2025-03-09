import React from 'react';
import { format } from 'date-fns';

interface StockTableProps {
  data: any[];
}

const StockTable: React.FC<StockTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-400">No table data available.</div>;
  }

  return (
    <div className="overflow-x-auto glassmorphism">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Open
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              High
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Low
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Close
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((item) => (
            <tr key={item.date} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                {format(new Date(item.date), 'PPP')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-200">{item.open}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-200">{item.high}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-200">{item.low}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-200">{item.close}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
