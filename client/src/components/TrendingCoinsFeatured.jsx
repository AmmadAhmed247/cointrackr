import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CoinRow from './Coinraw';
import { FaFire, FaClock, FaEye, FaChartLine, FaRocket, FaBell } from 'react-icons/fa';
import axios from 'axios';


const gettrendingCoins=async()=>{
  const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/coins/trendingcoins`)
  return res.data;
}
const TrendingCoinsFeatured = () => {  
    const trendingIcons = [FaFire, FaClock, FaEye];
      const [topTwo,setTopTwo]=useState([]);
      const [gainers,setGainers]=useState([]);
      useEffect(()=>{
        const fetchingData=async()=>{
          const {topTwo, gainers}=await gettrendingCoins();
          setTopTwo(topTwo);
          setGainers(gainers);
          
        }
        fetchingData();
      },[])
      const Toptwo=topTwo.map((coin,index)=>({
        id:coin.id,
        rank:index+1,
        logo:coin.image,
        name:coin.symbol.toUpperCase(),
        price:coin.current_price.toLocaleString(),
        sparkData:coin.sparkline_in_7d.price,    
      }))
      const TopGainersAlt=gainers.map((coin,index)=>({
        id:coin.id,
        rank:index+3,
        logo:coin.image,
        name:coin.symbol.toUpperCase(),
        price:coin.current_price.toLocaleString(),
        sparkData:coin.sparkline_in_7d.price,    
      }))    
  return (
    <div className="flex-1 min-w-[300px] rounded-md text-black p-1">
      <div className="bg-white w-full rounded-xl shadow-lg text-xs font-semibold p-3">
        <div className="flex items-center justify-between mb-3">
          <h5>Trending Coins <Link className="text-blue-500">&gt;</Link></h5>
          <div className="flex items-center gap-5 bg-zinc-200 rounded-md p-1 text-zinc-700">
            {trendingIcons.map((Icon, idx) => (
              <Icon key={idx} className="text-sm" />
            ))}
          </div>
        </div>        
        <div className="flex flex-col gap-1">
          {Toptwo.map((coin, idx) => (
            <Link to={`coins/${coin.id}`} key={idx}>
              <CoinRow
                rank={coin.rank}
                logo={coin.logo}
                name={coin.name}
                price={coin.price}
                sparkData={coin.sparkData}
              />
            </Link>
          ))}
          {TopGainersAlt.map((coin, idx) => (
            <Link to={`coins/${coin.id}`}  key={idx}>
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

export default TrendingCoinsFeatured;
