import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import CustomImage from './Image';

const CoinRow = ({ rank, logo, name, price, sparkData }) => {
  const formattedData = sparkData.map((value, index) => ({ value, time: index }));

  return (
   <div className="flex items-center justify-between w-full text-sm">
  <div className="flex items-center gap-2 flex-shrink-0">
    <span className="w-4">{rank}</span>
    <CustomImage src={logo} w={20} h={20} />
    <span className="max-w-[80px]">{name}</span>
  </div>
  <span className="ml-auto mr-4 text-right font-medium text-black">${price}</span>
  <div className="w-[60px] h-10">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={formattedData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={sparkData[0] < sparkData[sparkData.length - 1] ? '#4ade80' : '#f87171'}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>


    
  );
};

export default CoinRow;
