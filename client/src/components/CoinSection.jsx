import React from 'react'
import { FaSearch,FaInfoCircle  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const CoinSection = () => {
  return (
   <div className='flex flex-row items-center text-sm text-black px-4 h-12 border-b border-zinc-200 '>
  <div className="flex items-center  xl:pl-32 md:pl-2 xl:min-w-[280px] gap-10">
    <span>#</span>
    <button>Name</button>
  </div>

  <div className="flex items-center xl:min-w-[320px] xl:pl-58  md:pl-86 sm:pl-46 pl-46 gap-15 justify-between sm:gap-15  md:gap-12  xl:gap-20 px-6">
    <button>Price</button>
    <button>1h%</button>
    <button>24h%</button>
    <button>7d%</button>
  </div>

  <div className="flex items-center xl:min-w-[360px] xl:pl-50 md:pl-30 md:gap-18 pl-20 xl:gap-16 px-6">
    <button className='flex items-center whitespace-nowrap gap-1'>Market Cap <FaInfoCircle className='text-zinc-700' /></button>
    <button className='flex items-center gap-1'>Volume(24h) <FaInfoCircle className='text-zinc-700' /></button>
    <button className='flex items-center gap-1'>Supply <FaInfoCircle className='text-zinc-700' /></button>

  <div className="md:pl-20 whitespace-nowrap hidden xl:block xl:pl-35 pr-10 xl:min-w-[150px] justify-center ml-auto">
    <h4>Last 7 Days</h4>
  </div>
  </div>
</div>


  )
}

export default CoinSection