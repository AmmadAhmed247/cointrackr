import React from 'react'
import { Link } from "react-router-dom"
import { FaGasPump } from 'react-icons/fa'
import { MdTrendingUp } from "react-icons/md";
const Topbar = () => {
  return (

        <div className='flex  flex-row justify-between items-center border-2 border-zinc-200 h-14 md:px-4'>
      <div className="leftside flex flex-row gap-4 text-zinc-600 text-xs ">
        <div className="flex flex-row">
          <h5>Cryptos:</h5>
          <Link className='text-blue-500' > 18.09M</Link>
        </div>
        <div className="flex flex-row ">
          <h5>Exchanges:</h5>
          <Link className='text-blue-500'> 830</Link>
        </div>
        <div className="flex flex-row">
          <h5>Market Cap:</h5>
          <Link className='text-blue-500'>  $3.38T </Link>
          <MdTrendingUp className="text-black text-xs" />

        </div>
        <div className="flex flex-row">
          <h5>24h Vol:</h5>
          <Link className='text-blue-500'> $126.78B</Link>
          <MdTrendingUp className="text-black text-sm" />
        </div>
        <div className="flex flex-row">
          <h5>Dominance:</h5>
          <Link className='text-blue-500'>BTC: 64.5% ETH: 9.2%</Link>
        </div>
        <div className="flex flex-row">
          <FaGasPump className="text-lg text-black" />
          <Link className='text-blue-500'>ETH Gas: 1.09 Gwei</Link>
        </div>
        <div className="flex flex-row">
          <h5>Fear & Greed:</h5>
          <Link className='text-blue-500'>54/100</Link>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4 h-10 w-fit">
        <select
          className="appearance-none bg-zinc-200  text-black text-sm  h-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
          <option value="getlisted" hidden>Get listed</option>
          <option value="cryptocurrency">Cryptocurrency</option>
          <option value="exchange">Exchange</option>
          <option value="pageupdate">Page Update</option>
        </select>

        <Link className="bg-zinc-200  h-8 w-12 text-black text-sm px-4 py-2 rounded-md flex items-center justify-center">
          API
        </Link>
      </div>
    </div>

  )
}

export default Topbar