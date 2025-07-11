import React from 'react';
import { LineChart, Line, ResponsiveContainer ,YAxis } from 'recharts';
import CustomImage from './Image';

const CoinRow = ({ rank, logo, name, price, sparkData = [] }) => {
  const formattedData = (sparkData || [] ).map((value, index) => ({ value, time: index }));
  const isUp = sparkData.length >= 2 && sparkData[0] < sparkData[sparkData.length - 1];
  const strokeColor = isUp ? '#4ade80' : '#f87171';

  return (
    <div className="flex items-center justify-between w-full text-sm">
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="w-4">{rank}</span>
        <CustomImage src={logo} w={20} h={20} />
        <span className="max-w-[80px]">{name}</span>
      </div>
      <span className="ml-auto mr-4 text-right font-medium text-black">${price}</span>
     <div className="w-[120px] h-[50px] ml-2">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={formattedData}
      margin={{ top: 5, bottom: 5 }}
    >
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


    </div>
  );
};


export default CoinRow;
