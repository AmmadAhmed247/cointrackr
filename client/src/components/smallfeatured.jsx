import React from 'react'
import { Link } from 'react-router-dom'

import { LineChart, Line, ResponsiveContainer } from 'recharts';
const smallfeatured = ({ className }) => {
  const sparkData = [3.2, 1, 2, 3, 1, 2, 3]
  const sparkData2 = [1, 2, -1, -12, 1, 1, 13]
  const formattedData = sparkData.map((value, index) => ({
    value, time: index,
  }
  ))
  const formattedData2 = sparkData2.map((value, index) => ({
    value, time: index,
  }
  ))
  return (
    <div className={className} >
      <div className="bg-white rounded-4xl shadow-xl h-32 w-full flex flex-col ">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-2">Market Cap &gt;</h5>
          <span className="text-black px-2 py-2 font-semibold">$3.38T</span>
          <div className="h-10 w-full p-2">
            <ResponsiveContainer width="100%" height="100%" >
              <LineChart data={formattedData} >
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={sparkData[0] < sparkData[sparkData.length - 1] ? '#4ade80' : '#f87171'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer >
          </div>
        </Link>
      </div>
      <div className="bg-white rounded-4xl shadow-xl h-32 w-full flex flex-col ">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-2">CMC100 &gt;</h5>
          <span className="text-black px-2 py-2 font-semibold">$206.87</span>
          <div className="h-10 w-full p-2">
            <ResponsiveContainer width="100%" height="100%" >
              <LineChart data={formattedData2} >
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={sparkData[0] < sparkData[sparkData.length - 1] ? '#4ade80' : '#f87171'}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer >
          </div>
        </Link>
      </div>
      <div className="bg-white rounded-4xl shadow-xl h-32 w-full flex flex-col ">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-4">Fear & Greed &gt;</h5>
          <div className="relative w-full h-16">
            <svg className='w-full h-16' width="72" height="40" viewBox="0 0 72 40">
              <path d="M 7 34.5 A 29 29 0 0 1 10.784647044348649 20.175685869057304" stroke="#EA3943" stroke-width="3" stroke-linecap="round" fill="none"></path><path d="M 13.023600342699474 16.805790246863236 A 29 29 0 0 1 24.762047992889016 7.76596860393348" stroke="#EA8C00" stroke-width="3" stroke-linecap="round" fill="none"></path><path d="M 28.592073019862077 6.4621217304706775 A 29 29 0 0 1 43.40792698013793 6.4621217304706775" stroke="#F3D42F" stroke-width="3" stroke-linecap="round" fill="none"></path><path d="M 47.23795200711099 7.765968603933484 A 29 29 0 0 1 58.97639965730053 16.805790246863243" stroke="#93D900" stroke-width="3" stroke-linecap="round" fill="none"></path><path d="M 61.215352955651355 20.175685869057304 A 29 29 0 0 1 65 34.5" stroke="#16C784" stroke-width="3" stroke-linecap="round" fill="none"></path><path d="M 7 34.5 A 29 29 0 0 1 10.784647044348649 20.175685869057304" stroke="none" stroke-width="3" stroke-linecap="round" fill="none"></path><path d="M 13.023600342699474 16.805790246863236 A 29 29 0 0 1 24.762047992889016 7.76596860393348" stroke="none" stroke-width="3" stroke-linecap="round" fill="none"></path><path d="M 28.592073019862077 6.4621217304706775 A 29 29 0 0 1 39.63466377336482 5.728673661880141" stroke="none" stroke-width="3" stroke-linecap="round" fill="none"></path><circle cx="39.63466377336482" cy="5.728673661880141" r="4" fill="none" stroke="white" stroke-width="2"></circle><circle cx="39.63466377336482" cy="5.728673661880141" r="3" fill="black"></circle></svg>
            <div className="absolute inset-0 top-2 flex flex-col items-center justify-center text-black">
              <span className="text-medium font-semibold">54</span>
              <span className="text-xs font-semibold">Neutral</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="bg-white rounded-4xl shadow-xl h-32 p-2 w-full flex flex-col">
  <Link className="flex flex-col">
    <h5 className="text-black text-sm font-semibold p-2">Altseason &gt;</h5>
    <div className="text-xl  text-black mt-1 ">
      <span className="font-semibold">24</span>
      <span className="text-gray-500"> / 100</span>
    </div>
    <div className="flex flex-row justify-between text-black text-sm mt-1">
      <h6>Bitcoin</h6>
      <h6>Altcoin</h6>
    </div>
    <div className="relative w-full h-2 mt-2 rounded overflow-hidden flex">
      <div className="bg-[#F68819]" style={{ width: '25%' }}></div>
      <div className="bg-[#FCDBB9]" style={{ width: '25%' }}></div>
      <div className="bg-[#C1CCFD]" style={{ width: '25%' }}></div>
      <div className="bg-[#3156FA]" style={{ width: '25%' }}></div>
      <div
        className="absolute top-1/2 transform -translate-y-1/2"
        style={{
          left: `24%`, 
        }}
      >
        <div className="w-3 h-3 bg-black border-2 border-white rounded-full shadow-md"></div>
      </div>
    </div>
    
  </Link>
</div>

    </div>
  )
}

export default smallfeatured