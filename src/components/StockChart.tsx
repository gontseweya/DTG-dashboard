import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface StockChartProps {
  data: any[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No chart data available.</div>;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glassmorphism p-2">
          <p className="label">{`${format(new Date(label), 'PPP')}`}</p>
          <p className="intro">{`Open : $${payload[0].payload.open}`}</p>
          <p className="desc">{`High : $${payload[0].payload.high}`}</p>
          <p className="desc">{`Low : $${payload[0].payload.low}`}</p>
          <p className="desc">{`Close : $${payload[0].payload.close}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(tick) => format(new Date(tick), 'MMM dd')}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="open"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line type="monotone" dataKey="high" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="low" stroke="#ffc658" strokeWidth={2} />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#ff7300"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
