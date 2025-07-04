import React from 'react'
import { FaSearch,FaInfoCircle  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CustomImage from './Image';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
const CoinData = () => {
    const sparkData = [1.2,1,5,6,2,3,7,8,9,1,2,3,5, 1, 2, 3, 1, 2, 3]
  const formattedData = sparkData.map((value, index) => ({
    value, time: index,
  }
  ))
  return (
    <div className=' h-10 flex flex-row text-black text-sm p-2 border-zinc-200 border-1 py-9' >
        <div className="flex flex-row flex-1 pl-30 gap-10 items-center">
            <span>1</span>
        <Link to="/:slug" className='flex flex-row gap-2 font-semibold' ><CustomImage src="bitcoin.png" className="" w={22} h={22}  /> Bitcoin  <span className='text-zinc-500 text-sm font-light ' >BTC</span> </Link>
       
        </div>
        <div className="flex flex-1 gap-10 items-center">
            <Link>$109,001</Link>
            <Link>0.1%</Link>
            <Link>1.23%</Link>
            <Link>0.82%</Link>
        </div>
        <div className="flex flex-1/5 gap-25 flex-row">
            <Link className='relative left-13 bottom-2 pr-2 items-center gap-2' >2,123,211,234,212 </Link>
            <Link className='flex flex-row items-center gap-2' >42,454,123,566 </Link>
             <Link className='flex flex-row items-center gap-2' >19.88M BTC </Link>
        </div>
        <div className=" items-center hidden xl:flex ">
             <div className="w-[150px] h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={sparkData[0] < sparkData[sparkData.length - 1] ? '#4ade80' : '#f87171'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
        </div>
    </div>
  )
}

export default CoinData