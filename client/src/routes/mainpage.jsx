import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar.jsx';
import Featured from "../components/featured.jsx"
import { FaFire, FaClock, FaEye, FaChartLine, FaRocket, FaBell } from 'react-icons/fa';
import Smallfeatured from '../components/smallfeatured.jsx';
import NewsHeadline from '../components/newsHeadline.jsx';
import TabBar from '../components/category.jsx';
import TrendingTabs from '../components/trending.jsx';
import CoinSection from '../components/CoinSection.jsx';
import CoinData from "../components/CoinData.jsx"
import {getTopDeFiCoins ,getAICoins} from '../temp_api/api.js';
import DexFeatured from '../components/dexComp.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TrendingCoinsFeatured from '../components/TrendingCoinsFeatured.jsx';
import DefiCoinsFeatured from '../components/Defi.jsx';
import AiCoinsFeatured from '../components/Ai.jsx';

const gettrendingCoins=async()=>{
  const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/coins/trendingcoins`)
  return res.data;
}



const mainpage = () => {

  return (
    <div className="">
      <div className="hidden xl:block">
      <Topbar  />
      </div>
      <div className="hidden flex-wrap flex-row gap-4 p-4   xl:flex ">
        <TrendingCoinsFeatured/>
        <DefiCoinsFeatured/>
        <AiCoinsFeatured/>
        <Smallfeatured className='grid grid-cols-2 rounded-2xl flex-1 gap-1  p-1' />
        <NewsHeadline className='grid grid-cols-1 rounded-2xl flex-1 gap-1  p-1' />        
      </div>
      
     <Smallfeatured className='mt-2  flex-row flex xl:hidden rounded-2xl flex-1 gap-1  mb-5' />
     <TabBar/>
     <TrendingTabs/>
     <CoinSection />
     <CoinData />
     
    </div>
  )
}

export default mainpage