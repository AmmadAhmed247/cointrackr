import React, { useState } from 'react'
import Topbar from '../components/topbar';
import Featured from "../components/featured.jsx"
import { FaFire, FaClock, FaEye, FaChartLine, FaRocket, FaBell } from 'react-icons/fa';
import Smallfeatured from '../components/smallfeatured.jsx';
const mainpage = () => {
  const trendingIcons = [FaFire, FaClock, FaEye];
  const dexIcons = [FaChartLine, FaRocket, FaBell];
  const dummyData = [
    { rank: 1, logo: "bitcoin.png", name: "BTC", price: "109,988", sparkData: [1, 1.2, 1.1, 1.3, 1.4, 1.6, 1.9] },
    { rank: 2, logo: "ethereum.png", name: "ETH", price: "2590", sparkData: [1, 1, 1.1, 1.3, 2, 1.6, 1.9] },
    { rank: 3, logo: "xrp.png", name: "XRP", price: "2", sparkData: [1, 1.2, 1.1, 2, 1.4, 1.6, 1.9] },
    { rank: 4, logo: "solana.png", name: "SOL", price: "200", sparkData: [1, 1.2, 1.1, 2, 1.4, 1.6, 1.9] },
    { rank: 5, logo: "dogecoin.png", name: "DOGE", price: "2", sparkData: [1, 1.2, 1.1, 2, 1.4, 1.6, 1.9] },
  ];
  const dummyData2 = [
    { rank: 1, logo: "popcat-sol.png", name: "Popcat", price: "0.8", sparkData: [1, 1.2, 1.1, 1.3, 1.4, 1.6, 1.9] },
    { rank: 2, logo: "mina.png", name: "MINA", price: "0.000120", sparkData: [1, 1, 1.1, 1.3, 2, 1.6, 1.9] },
    { rank: 3, logo: "gnosis-gno.png", name: "GNO", price: "2", sparkData: [1, 1.2, 1.1, 2, 1.4, 1.6, 1.9] },
    { rank: 4, logo: "flare.png", name: "FLR", price: "2", sparkData: [1, 1.2, 1.1, 2, 1.4, 1.6, 1.9] },
    { rank: 5, logo: "wormhole.png", name: "W", price: "2", sparkData: [1, 1.2, 1.1, 2, 1.4, 1.6, 1.9] },
  ];
  return (
    <div className="">
      <div className="hidden xl:block">
      <Topbar  />
      </div>
      <div className="hidden flex-wrap flex-row gap-4 p-4   xl:flex ">
        <Featured heading="Trending Coins" icons={trendingIcons} data={dummyData} />
        <Featured heading="DEX Scanner" icons={dexIcons} data={dummyData2} />
        <Smallfeatured className='grid grid-cols-2 rounded-2xl gap-1  p-1' />
        <Featured heading="New Coins" icons={dexIcons} data={dummyData2} />
      </div>
      <div className="xl:hidden w-full bg-red-600 h-30 gap-2 flex  p-2 flex-row">
        <div className="bg-black rounded-md flex-1 "></div>
        <div className="bg-black rounded-md flex-1 "></div>
        <div className="bg-black rounded-md flex-1 "></div>
        <div className="bg-black rounded-md flex-1 "></div>
      </div>
      
    </div>



  )
}

export default mainpage