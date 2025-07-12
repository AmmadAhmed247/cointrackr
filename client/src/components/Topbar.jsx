import React from 'react';
import { Link } from "react-router-dom";
import { FaGasPump } from 'react-icons/fa';
import { MdTrendingUp } from "react-icons/md";
import axios from "axios";
import Spinner from './spinner';
import { useQuery } from '@tanstack/react-query';

const getGlobalData = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/coins/global`);
  return res.data;
};

const getFearGreed = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/coins/feargreed`);
  return res.data?.value || res.data?.data?.[0]?.value || "N/A";
};


const Topbar = () => {
  const { data: globalData, isLoading, isError } = useQuery({
    queryKey: ["globalData"],
    queryFn: getGlobalData,
    staleTime: 1000 * 60 * 3,
    retry: 1,
  });

  const { data: fear, isLoading: fearLoading, isError: fearError } = useQuery({
    queryKey: ["fearGreed"],
    queryFn: getFearGreed,
    staleTime: 1000 * 60 * 3,
    retry: 1,
  });

  if (isLoading || fearLoading) return <Spinner />;
  if (isError || fearError) return <div className="text-red-500 text-center">Failed to load data.</div>;

  return (
    <div className='flex flex-row justify-between items-center border-2 border-zinc-200 h-14 md:px-4'>
      <div className="leftside flex flex-row gap-4 text-zinc-600 text-xs">
        <div className="flex flex-row items-center gap-2">
          <h5>Cryptos:</h5>
          <Link className='text-blue-500'>{globalData?.active_cryptocurrencies || "..."}</Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <h5>Exchanges:</h5>
          <Link className='text-blue-500'>{globalData?.markets || "..."}</Link>
        </div>
        <div className="flex flex-row items-center">
          <h5>Market Cap:</h5>
          <Link className='text-blue-500'>
            {globalData?.total_market_cap?.usd?.toLocaleString() || "..."}
          </Link>
          <MdTrendingUp className="text-black text-xs" />
        </div>
        <div className="flex flex-row items-center">
          <h5>24h Vol:</h5>
          <Link className='text-blue-500'>
            {globalData?.total_volume?.usd?.toLocaleString() || "..."}
          </Link>
          <MdTrendingUp className="text-black text-sm" />
        </div>
        <div className="flex gap-1 flex-row items-center">
          <h5>BTC Dominance:</h5>
          <Link className='text-blue-500'>
            {globalData?.market_cap_percentage?.btc?.toFixed(2) || "..."}
          </Link>
        </div>
        <div className="flex gap-1 flex-row items-center">
          <h5>ETH Dominance:</h5>
          <Link className='text-blue-500'>
            {globalData?.market_cap_percentage?.eth?.toFixed(2) || "..."}
          </Link>
        </div>
        <div className="flex items-center flex-row">
          <h5>Fear & Greed:</h5>
<Link className='text-blue-500'>{typeof fear === 'string' || typeof fear === 'number' ? fear : "N/A"}</Link>
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 h-10 w-fit">
        <select className="appearance-none pl-2 bg-zinc-200 text-black text-sm h-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="getlisted" hidden>Get listed</option>
          <option value="cryptocurrency">Cryptocurrency</option>
          <option value="exchange">Exchange</option>
          <option value="pageupdate">Page Update</option>
        </select>

        <Link className="bg-zinc-200 h-8 w-12 text-black text-sm px-4 py-2 rounded-md flex items-center justify-center">
          API
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
