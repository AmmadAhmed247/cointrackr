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


import TrendingCoinsFeatured from '../components/TrendingCoinsFeatured.jsx';
import DefiCoinsFeatured from '../components/Defi.jsx';
import AiCoinsFeatured from '../components/Ai.jsx';



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
      
     <Smallfeatured className='mt-1 flex-row flex   h-full   xl:hidden rounded-2xl flex-1  mb-5' />
     <TabBar/>
     <TrendingTabs/>
     <CoinSection />
     <CoinData />
     
    </div>
  )
}

export default mainpage