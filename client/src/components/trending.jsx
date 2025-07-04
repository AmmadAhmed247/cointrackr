import React from 'react'
import { Link } from 'react-router-dom'
import { FaFire, FaClock, FaEye, FaChartLine, FaRocket, FaBell, FaChartBar } from 'react-icons/fa';
const Trending = () => {
  return (
    <div className='flex flex-row justify-between '>
      <div className="text-black px-2 py-3 flex flex-row items-center gap-5 text-sm ">
        <Link to="/test" className='flex   flex-row gap-2 rounded-md text-sm px-3 py-1 items-center  bg-zinc-100' >
          <span className=' hover:bg-zinc-200 rounded-md p-1' >Coins</span>
          <span>|</span>
          <span className=' hover:bg-zinc-200 rounded-md p-1'>DexScan</span>
        </Link>
        <Link to="/" className="flex items-center gap-1  hover:bg-blue-100 p-2 rounded-md text-zinc-600">
          <FaChartBar className="w-4 h-4" />
          <span>Top</span>
        </Link>
        <Link to="/trending" className="flex items-center  hover:bg-blue-100 p-2 gap-2 rounded-md text-zinc-600">
          <FaRocket className="w-4 h-4" />
          <span>Trending</span>
        </Link>
         <Link to="/new" className="flex items-center gap-1  hover:bg-blue-100 p-2 rounded-md text-zinc-600">          
          <span  >🌱 New</span>
        </Link>
         <Link to="/gainer" className="flex items-center gap-1  hover:bg-blue-100 p-2 rounded-md text-zinc-600">  
          <FaChartLine className="w-4 h-4" />     
          <span>Gainer</span>
        </Link>
        <Link to="/mostvisited" className="flex items-center gap-1  hover:bg-blue-100 p-2 rounded-md text-zinc-600">  
          <FaEye className="w-4 h-4" />     
          <span>Most visited</span>
        </Link>
      </div>
      <div className="text-black px-2 py-3 flex flex-row items-center gap-5 text-sm ">
        <Link to="/test" className='flex   flex-row gap-2 rounded-md text-sm px-3 py-1 items-center  bg-zinc-100' >
          <span className=' hover:bg-zinc-200 rounded-md p-1' >Market cap</span>          
        </Link>
        <Link to="/" className="flex items-center gap-1   hover:bg-zinc-200 p-2 rounded-md text-zinc-600">
          <FaChartBar className="w-4 h-4" />
          <span>Volume <span className='test-xs' >(24hr)</span></span>
        </Link>
        <Link to="/trending" className="flex items-center   hover:bg-zinc-200 p-2 gap-2 rounded-md text-zinc-600">
          <FaRocket className="w-4 h-4" />
          <span>Filters</span>
        </Link>
         <Link to="/new" className="flex items-center gap-1   hover:bg-zinc-200 p-2 rounded-md text-zinc-600">          
          <span  >Columms</span>
        </Link>
         <select className='rounded-md bg-zinc-200 p-1 ' name="" id="">
          <option value="show100">Show 100</option>
          <option value="show200">Show 200</option>
          <option value="show500">Show 500</option>
          <option value="showall">Show All</option>
         </select>
       
      </div>
    </div>
  )
}

export default Trending