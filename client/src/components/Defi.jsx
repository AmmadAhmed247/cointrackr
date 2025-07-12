import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CoinRow from './Coinraw';
import { FaFire, FaClock, FaEye, FaChartLine, FaRocket, FaBell } from 'react-icons/fa';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getDefiCoins=async()=>{
  const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/coins/Defitrendingcoins`)
  return res.data;
}
const DefiCoinsFeatured = () => {  
    const trendingIcons = [FaFire, FaClock, FaEye];
    const{data,isLoading,isError}=useQuery({
      queryKey:['DefiCoins'],
      queryFn:getDefiCoins,
      staleTime:1000*60*5,
    })
    if(isLoading) return <div className='text-black  text-center' >Tokens are loading</div>
    if(isError) return <div className='text-red-500 text-center'  >Failed to fetch Data..(Defi)</div>

      const DefiData=data?.map((coin,index)=>({
        id:coin.id,
        rank:index+1,
        logo:coin.image,
        name:coin.symbol.toUpperCase(),
        price:coin.current_price.toLocaleString(),
        sparkData:coin.sparkline_in_7d.price,    
        change24h: coin.price_change_percentage_24h?.toFixed(2),
      }))
        
  return (
    <div className="flex-1 min-w-[300px] rounded-md text-black p-1">
      <div className="bg-white w-full rounded-xl shadow-lg text-xs font-semibold p-3">
        <div className="flex items-center justify-between mb-3">
          <h5>Defi Coins <Link className="text-blue-500">&gt;</Link></h5>
          <div className="flex items-center gap-5 bg-zinc-200 rounded-md p-1 text-zinc-700">
            {trendingIcons.map((Icon, idx) => (
              <Icon key={idx} className="text-sm" />
            ))}
          </div>
        </div>        
        <div className="flex flex-col gap-1">
          {DefiData?.map((coin, idx) => (
            <Link to={`coins/${coin.id}`} key={idx}>
              <CoinRow
                rank={coin.rank}
                logo={coin.logo}
                name={coin.name}
                price={coin.price}
                sparkData={coin.sparkData}
                change24h={coin.change24h}
              />
            </Link>
          ))}
         

        </div>
      </div>
    </div>
  );
};

export default DefiCoinsFeatured;
