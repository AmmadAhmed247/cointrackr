import { useEffect, useState } from 'react'
import { FaSearch, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CustomImage from './Image';
import { LineChart, Line, ResponsiveContainer,YAxis } from 'recharts';
const CoinData = () => {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h,24h,7d')
      .then(response => response.json())
      .then(data => setCoins(data))
      .catch(error => console.error("error", error));
  }, []);

  return (
    <>
      {coins.map((coin, index) => (


        <div key={coin.id} className='flex flex-row items-center text-sm text-zinc-600 px-4 py-9 h-12 border-b  border-zinc-100 '>
          <div className="flex items-center xl:pl-32 md:pl-2 xl:min-w-[280px] sm:min-w-[180px] gap-10">
            <span>{index + 1}</span>
            <Link
              to={`coins/${coin.id}`}
              className='flex items-center gap-2 font-semibold w-[160px] overflow-hidden truncate whitespace-nowrap'
            >
              <CustomImage src={coin.image} w={22} h={22} />
              <span className='truncate'>
                {coin.name}
              </span>
              <span className='text-zinc-500 font-light'>
                {coin.symbol.toUpperCase()}
              </span>
            </Link>

          </div>

          <div className="flex items-center xl:min-w-[320px] xl:pl-55 md:pl-46 sm:pl-10 pl-10 justify-between sm:gap-7 gap-7 md:gap-6 xl:gap-15 px-6">
            <Link className="text-right w-[100px]">{coin.current_price.toLocaleString()}</Link>
            <Link className="text-right w-[60px]">{coin.price_change_percentage_1h_in_currency?.toFixed(2)}%</Link>
            <Link className="text-right w-[60px]">{coin.price_change_percentage_24h_in_currency?.toFixed(2)}%</Link>
            <Link className="text-right w-[60px]">{coin.price_change_percentage_7d_in_currency?.toFixed(2)}%</Link>
          </div>

          <div className="flex items-center whitespace-nowrap xl:min-w-[360px] xl:pl-50 md:pl-16 pl-20 md:gap-2 xl:gap-12 gap-12 px-6">
            <Link className="text-right w-[150px]">{coin.market_cap.toLocaleString()}</Link>
            <Link className="text-right w-[150px]">{coin.total_volume.toLocaleString()}</Link>
            <Link className="text-right w-[160px]">{coin.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</Link>

            <div className="md:pl-20 xl:pl-35 pr-10 xl:min-w-[150px] justify-center ml-auto">
              <div className="w-[140px] h-[50px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={coin.sparkline_in_7d.price.map((value, index) => ({ time: index, value }))}>
                    <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} hide />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={coin.sparkline_in_7d.price[0] < coin.sparkline_in_7d.price.at(-1) ? '#4ade80' : '#f87171'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>



        </div>
      ))}
    </>

  )
}

export default CoinData