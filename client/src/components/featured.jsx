import React from 'react';
import { Link } from 'react-router-dom';
import CoinRow from './Coinraw';

const Featured = ({
  heading = "Trending Coins",
  icons = [],
  data = []
}) => {
  return (
    <div className="flex-1 min-w-[300px] rounded-md text-black p-1">
      <div className="bg-white w-full rounded-xl shadow-lg text-xs font-semibold p-3">
        <div className="flex items-center justify-between mb-3">
          <h5>{heading} <Link className="text-blue-500">&gt;</Link></h5>
          <div className="flex items-center gap-2 text-zinc-700">
            {icons.map((Icon, idx) => (
              <Icon key={idx} className="text-sm" />
            ))}
          </div>
        </div>

        {/* Coin List */}
        <div className="flex flex-col gap-1">
          {data.map((coin, idx) => (
            <Link key={idx}>
              <CoinRow
                rank={coin.rank}
                logo={coin.logo}
                name={coin.name}
                price={coin.price}
                sparkData={coin.sparkData}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
