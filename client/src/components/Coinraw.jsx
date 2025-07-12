import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import CustomImage from './Image';

const CoinRow = ({ rank, logo, name, price, sparkData = [], change24h }) => {
  const formattedData = (sparkData || []).map((value, index) => ({ value, time: index }));
  const isUp = sparkData.length >= 2 && sparkData[0] < sparkData[sparkData.length - 1];
  const strokeColor = isUp ? '#4ade80' : '#f87171';

  const formattedChange = change24h !== undefined ? parseFloat(change24h).toFixed(2) : '0.00';
  const changeColor = change24h >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';

  return (
    <div className="flex items-center justify-between w-full text-sm">
      {/* Left: Rank, Logo, Name */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="w-4">{rank}</span>
        <CustomImage src={logo} w={20} h={20} />
        <span className="max-w-[80px]">{name}</span>
      </div>

      {/* Middle: Price */}
      <div className="text-right min-w-[80px] ml-auto mr-2">
        <p className="text-black font-medium">${price}</p>
      </div>
      <div className="flex flex-col items-center w-[120px] h-[60px]">
        <div className="w-full h-[40px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, bottom: 5 }}>
              <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={2}
                dot={false}
                strokeLinecap="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <span className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${changeColor}`}>
          {formattedChange}%
        </span>
      </div>
    </div>
  );
};

export default CoinRow;
