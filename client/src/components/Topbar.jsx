import React from 'react'
import { Link } from "react-router-dom"
import { FaGasPump } from 'react-icons/fa'
import { MdTrendingUp } from "react-icons/md";
import axios from "axios"
import { useState } from 'react';
import { useEffect } from 'react';
import Spinner from './spinner';

const GlobData = async () => {
  const res =await axios.get(`${import.meta.env.VITE_API_URL}/api/coins/global`);
  return res.data;
}
const getFearGreed=async()=>{
  const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/coins/feargreed`);
  return res.data.value;
}

const Topbar = () => {
  const [data, setData] = useState(null)
  const [fear, setFearValue] = useState(null)
  const [loading,setLoading]=useState(true)
  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await GlobData();
      const fearData = await getFearGreed();
      setData(data);
      setFearValue(fearData);
    } catch (err) {
      console.error("Data fetching error:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []); 
 if (loading) {
    return <Spinner />;
  }

  return (

    <div className='flex  flex-row justify-between items-center border-2 border-zinc-200 h-14 md:px-4'>
      <div className="leftside flex flex-row gap-4 text-zinc-600 text-xs ">
        <div className="flex flex-row items-center gap-2">
          <h5>Cryptos:</h5>
          <Link className='text-blue-500' >{data ? data.active_cryptocurrencies : "..."}</Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <h5>Exchanges:</h5>
          <Link className='text-blue-500'>{data?.markets || "...."}</Link>
        </div>
        <div className="flex flex-row items-center">
          <h5>Market Cap:</h5>
          <Link className='text-blue-500'>{data?.total_market_cap?.usd.toLocaleString() ||  "...."}</Link>
          <MdTrendingUp className="text-black text-xs" />

        </div>
        <div className="flex flex-row items-center">
          <h5>24h Vol:</h5>
          <Link className='text-blue-500'>{data?.total_volume?.usd.toLocaleString()||  "...."}</Link>
          <MdTrendingUp className="text-black text-sm" />
        </div>
        <div className="flex gap-1 flex-row items-center">
          <h5>BTC Dominance:</h5>
          <Link className='text-blue-500'> {data?.market_cap_percentage?.btc.toFixed(2) ||  "...."}</Link>
        </div>
        <div className="flex gap-1 flex-row items-center">
          <h5>ETH Dominance:</h5>
          <Link className='text-blue-500'> {data?.market_cap_percentage?.eth.toFixed(2) || "...."}</Link>
        </div>
        <div className="flex items-center flex-row">
          <h5>Fear & Greed:</h5>
          <Link className='text-blue-500'>{fear}</Link>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4 h-10 w-fit">
        <select
          className="appearance-none pl-2 bg-zinc-200  text-black text-sm  h-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="getlisted" hidden>Get listed</option>
          <option value="cryptocurrency">Cryptocurrency</option>
          <option value="exchange">Exchange</option>
          <option value="pageupdate">Page Update</option>
        </select>

        <Link className="bg-zinc-200  h-8 w-12 text-black text-sm px-4 py-2 rounded-md flex items-center justify-center">
          API
        </Link>
      </div>
    </div>
  )
}
export default Topbar