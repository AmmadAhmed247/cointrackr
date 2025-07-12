import React from 'react';
import { Link } from 'react-router-dom';
import {
  getGlobalMarketCap,
  chartData,
  fearGreed,
  getCMC100Data,
  getAltseasonData,
} from '../temp_api/api';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { useQuery } from '@tanstack/react-query';

const formatNumber = (num) => {
  if (!num) return '0';
  const trillions = 1_000_000_000_000;
  const billions = 1_000_000_000;
  const millions = 1_000_000;

  if (num >= trillions) return (num / trillions).toFixed(2) + 'T';
  if (num >= billions) return (num / billions).toFixed(2) + 'B';
  if (num >= millions) return (num / millions).toFixed(2) + 'M';

  return num.toLocaleString();
};

const getFearGreedLabel = (value) => {
  if (value <= 20) return 'Extreme Fear';
  if (value <= 40) return 'Fear';
  if (value <= 60) return 'Neutral';
  if (value <= 80) return 'Greed';
  return 'Extreme Greed';
};

const getFearGreedPosition = (value) => {
  const angle = (value / 100) * 180;
  const radians = (angle * Math.PI) / 180;
  const radius = 29;
  const centerX = 36;
  const centerY = 34.5;

  const x = centerX + radius * Math.cos(Math.PI - radians);
  const y = centerY - radius * Math.sin(Math.PI - radians);

  return { x, y };
};

const SmallFeatured = ({ className }) => {
  const {
    data: marketCap,
    isLoading: marketCapLoading,
  } = useQuery({ queryKey: ['marketCap'], queryFn: getGlobalMarketCap ,  retry: 1,  staleTime: 1000 * 60 * 3});

  const {
    data: marketCapHistory,
    isLoading: marketCapHistoryLoading,
  } = useQuery({ queryKey: ['marketCapHistory'], queryFn: chartData  ,  retry: 1, staleTime: 1000 * 60 * 3});

  const {
    data: fearGreedData,
    isLoading: fearGreedLoading,
  } = useQuery({ queryKey: ['fearGreed'], queryFn: fearGreed  ,  retry: 1, staleTime: 1000 * 60 * 3});

  const {
    data: cmc100Data,
    isLoading: cmc100Loading,
  } = useQuery({ queryKey: ['cmc100'], queryFn: getCMC100Data ,  retry: 1, staleTime: 1000 * 60 * 3 });

  const {
    data: altseasonData,
    isLoading: altseasonLoading,
  } = useQuery({ queryKey: ['altseason'], queryFn: getAltseasonData ,  retry: 1,  staleTime: 1000 * 60 * 3});

  const isLoading =
    marketCapLoading ||
    marketCapHistoryLoading ||
    fearGreedLoading ||
    cmc100Loading ||
    altseasonLoading;

  const fearGreedValue = fearGreedData?.value || 54;
  const fearGreedPos = getFearGreedPosition(fearGreedValue);

  if (isLoading) {
    return (
      <div className={className}>
        <div className="bg-white rounded-4xl shadow-xl h-32 w-full flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* === MARKET CAP CARD === */}
      <div className="bg-white rounded-4xl shadow-xl h-32 w-full flex flex-col">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-2">Market Cap &gt;</h5>
          <span className="text-black px-2 py-2 font-semibold">${formatNumber(marketCap)}</span>
          <div className="h-10 w-full p-2">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={marketCapHistory}>
                <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} hide />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={
                    marketCapHistory?.[0]?.value < marketCapHistory?.[marketCapHistory.length - 1]?.value
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

      {/* === CMC100 CARD === */}
      <div className="bg-white rounded-4xl shadow-xl h-32 w-full flex flex-col">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-2">CMC100 &gt;</h5>
          <span className="text-black px-2 py-2 font-semibold">
            ${cmc100Data?.value?.toFixed(2) || '0.00'}
          </span>
          <div className="h-10 w-full p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cmc100Data?.sparkline?.map((value, index) => ({ value, time: index })) || []}
              >
                <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} hide />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={
                    cmc100Data?.sparkline?.[0] < cmc100Data?.sparkline?.[cmc100Data.sparkline.length - 1]
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

      {/* === FEAR & GREED === */}
      <div className="bg-white rounded-4xl whitespace-nowrap shadow-xl h-32 w-full flex flex-col">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-4">Fear & Greed &gt;</h5>
          <div className="relative w-full h-16">
            <svg className="w-full h-16" width="72" height="40" viewBox="0 0 72 40">
              {/* Arc Paths */}
              {[
                ['#EA3943', 7, 34.5, 10.78, 20.17],
                ['#EA8C00', 13.02, 16.8, 24.76, 7.76],
                ['#F3D42F', 28.59, 6.46, 43.4, 6.46],
                ['#93D900', 47.23, 7.76, 58.97, 16.8],
                ['#16C784', 61.21, 20.17, 65, 34.5],
              ].map(([color, x1, y1, x2, y2], i) => (
                <path
                  key={i}
                  d={`M ${x1} ${y1} A 29 29 0 0 1 ${x2} ${y2}`}
                  stroke={color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              ))}
              {/* Needle */}
              <circle cx={fearGreedPos.x} cy={fearGreedPos.y} r="4" fill="none" stroke="white" strokeWidth="2" />
              <circle cx={fearGreedPos.x} cy={fearGreedPos.y} r="3" fill="black" />
            </svg>
            <div className="absolute inset-0 top-2 flex flex-col items-center justify-center text-black">
              <span className="text-medium font-semibold">{fearGreedValue}</span>
              <span className="text-xs font-semibold">{getFearGreedLabel(fearGreedValue)}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* === ALTSEASON CARD === */}
      <div className="bg-white whitespace-nowrap rounded-4xl shadow-xl h-32 p-2 w-full flex flex-col">
        <Link className="flex flex-col">
          <h5 className="text-black text-sm font-semibold p-2">Altseason &gt;</h5>
          <div className="text-xl text-black">
            <span className="font-semibold">{altseasonData?.score || 0}</span>
            <span className="text-gray-500"> / 100</span>
          </div>
          <div className="flex flex-row justify-between text-black text-sm mt-1">
            <h6>Bitcoin</h6>
            <h6>Altcoin</h6>
          </div>
          <div className="relative w-full h-2 mt-2 rounded overflow-hidden flex">
            {['#F68819', '#FCDBB9', '#C1CCFD', '#3156FA'].map((color, i) => (
              <div key={i} className="h-2" style={{ backgroundColor: color, width: '25%' }}></div>
            ))}
            <div
              className="absolute top-1/2 transform -translate-y-1/2"
              style={{ left: `${altseasonData?.score || 0}%` }}
            >
              <div className="w-3 h-3 bg-black border-2 border-white rounded-full shadow-md"></div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallFeatured;
