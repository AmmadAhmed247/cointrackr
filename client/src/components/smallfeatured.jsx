import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  getGlobalMarketCap, 
  chartData, 
  fearGreed, 
  getCMC100Data, 
  getAltseasonData 
} from '../temp_api/api';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const formatNumber = (num) => {
  if (!num) return '0'
  const trillions = 1_000_000_000_000
  const billions = 1_000_000_000
  const millions = 1_000_000

  if (num >= trillions) return (num / trillions).toFixed(2) + 'T'
  if (num >= billions) return (num / billions).toFixed(2) + 'B'
  if (num >= millions) return (num / millions).toFixed(2) + 'M'

  return num.toLocaleString()
}

const SmallFeatured = ({ className }) => {
  const [marketCap, setMarketCap] = useState(null);
  const [marketCapHistory, setMarketCapHistory] = useState([]);
  const [fearGreedData, setFearGreedData] = useState(null);
  const [cmc100Data, setCmc100Data] = useState(null);
  const [altseasonData, setAltseasonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(true);
        const [cap, history, fearGreedInfo, cmc100Info, altseasonInfo] = await Promise.all([
          getGlobalMarketCap(),
          chartData(),
          fearGreed(),
          getCMC100Data(),
          getAltseasonData(),
        ]);
        
        setMarketCap(cap);
        setMarketCapHistory(history);
        setFearGreedData(fearGreedInfo);
        setCmc100Data(cmc100Info);
        setAltseasonData(altseasonInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchingData();
  }, []);

  // Helper function to get fear and greed color
  const getFearGreedColor = (value) => {
    if (value <= 20) return '#EA3943'; // Extreme Fear
    if (value <= 40) return '#EA8C00'; // Fear
    if (value <= 60) return '#F3D42F'; // Neutral
    if (value <= 80) return '#93D900'; // Greed
    return '#16C784'; // Extreme Greed
  };

  const getFearGreedLabel = (value) => {
    if (value <= 20) return 'Extreme Fear';
    if (value <= 40) return 'Fear';
    if (value <= 60) return 'Neutral';
    if (value <= 80) return 'Greed';
    return 'Extreme Greed';
  };

  // Helper function to calculate SVG position for fear and greed indicator
  const getFearGreedPosition = (value) => {
    const angle = (value / 100) * 180; // Convert to degrees (0-180)
    const radians = (angle * Math.PI) / 180;
    const radius = 29;
    const centerX = 36;
    const centerY = 34.5;
    
    const x = centerX + radius * Math.cos(Math.PI - radians);
    const y = centerY - radius * Math.sin(Math.PI - radians);
    
    return { x, y };
  };

  if (loading) {
    return (
      <div className={className}>
        <div className="bg-white rounded-4xl shadow-xl h-32 w-full flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const fearGreedValue = fearGreedData?.value || 54;
  const fearGreedPos = getFearGreedPosition(fearGreedValue);

  return (
    <div className={className}>
      {/* Market Cap Card */}
      <div className="bg-white rounded-4xl shadow-xl h-32 w-full flex flex-col">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-2">Market Cap &gt;</h5>
          <span className="text-black px-2 py-2 font-semibold">
            ${formatNumber(marketCap)}
          </span>
          <div className="h-10 w-full p-2">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={marketCapHistory}>
              <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} hide />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={
                    marketCapHistory.length > 0 && 
                    marketCapHistory[0]?.value < marketCapHistory[marketCapHistory.length - 1]?.value 
                      ? '#4ade80' 
                      : '#f87171'
                  }
                  strokeWidth={2}
                  dot={false}
                  strokeLinecap="round"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Link>
      </div>

      {/* CMC100 Card */}
      <div className="bg-white rounded-4xl shadow-xl h-32 w-full flex flex-col">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-2">CMC100 &gt;</h5>
          <span className="text-black px-2 py-2 font-semibold">
            ${cmc100Data?.value?.toFixed(2) || '206.22'}
          </span>
          <div className="h-10 w-full p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cmc100Data?.sparkline?.map((value, index) => ({ value, time: index })) || []}>
               <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} hide />
                
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={
                    cmc100Data?.sparkline && 
                    cmc100Data.sparkline[0] < cmc100Data.sparkline[cmc100Data.sparkline.length - 1]
                      ? '#4ade80' 
                      : '#f87171'
                  }
                  strokeWidth={2}
                  dot={false}
                  strokeLinecap="round"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Link>
      </div>

      {/* Fear & Greed Card */}
      <div className="bg-white rounded-4xl whitespace-nowrap shadow-xl h-32 w-full flex flex-col">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-4">Fear & Greed &gt;</h5>
          <div className="relative w-full h-16">
            <svg className='w-full h-16' width="72" height="40" viewBox="0 0 72 40">
              <path d="M 7 34.5 A 29 29 0 0 1 10.784647044348649 20.175685869057304" stroke="#EA3943" strokeWidth="3" strokeLinecap="round" fill="none"></path>
              <path d="M 13.023600342699474 16.805790246863236 A 29 29 0 0 1 24.762047992889016 7.76596860393348" stroke="#EA8C00" strokeWidth="3" strokeLinecap="round" fill="none"></path>
              <path d="M 28.592073019862077 6.4621217304706775 A 29 29 0 0 1 43.40792698013793 6.4621217304706775" stroke="#F3D42F" strokeWidth="3" strokeLinecap="round" fill="none"></path>
              <path d="M 47.23795200711099 7.765968603933484 A 29 29 0 0 1 58.97639965730053 16.805790246863243" stroke="#93D900" strokeWidth="3" strokeLinecap="round" fill="none"></path>
              <path d="M 61.215352955651355 20.175685869057304 A 29 29 0 0 1 65 34.5" stroke="#16C784" strokeWidth="3" strokeLinecap="round" fill="none"></path>
              <circle cx={fearGreedPos.x} cy={fearGreedPos.y} r="4" fill="none" stroke="white" strokeWidth="2"></circle>
              <circle cx={fearGreedPos.x} cy={fearGreedPos.y} r="3" fill="black"></circle>
            </svg>
            <div className="absolute inset-0 top-2 flex flex-col items-center justify-center text-black">
              <span className="text-medium font-semibold">{fearGreedValue}</span>
              <span className="text-xs font-semibold">{getFearGreedLabel(fearGreedValue)}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Altseason Card */}
      <div className="bg-white whitespace-nowrap rounded-4xl shadow-xl h-32 p-2 w-full flex flex-col">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-2">Altseason &gt;</h5>
          <div className="text-xl whitespace-nowrap text-black sm:mt-1">
            <span className="font-semibold">{altseasonData?.score ||224}</span>
            <span className="text-gray-500"> / 100</span>
          </div>
          <div className="flex flex-row justify-between text-black text-sm mt-1">
            <h6>Bitcoin</h6>
            <h6>Altcoin</h6>
          </div>
          <div className="relative w-full h-2 whitespace-nowrap mt-2 rounded overflow-hidden flex">
            <div className="bg-[#F68819]" style={{ width: '25%' }}></div>
            <div className="bg-[#FCDBB9]" style={{ width: '25%' }}></div>
            <div className="bg-[#C1CCFD]" style={{ width: '25%' }}></div>
            <div className="bg-[#3156FA]" style={{ width: '25%' }}></div>
            <div
              className="absolute top-1/2 transform -translate-y-1/2"
              style={{
                left: `${altseasonData?.score || 24}%`,
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

export default SmallFeatured