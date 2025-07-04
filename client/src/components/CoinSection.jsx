import React from 'react'
import { FaSearch,FaInfoCircle  } from 'react-icons/fa';
const CoinSection = () => {
  return (
    <div className=' h-10 flex flex-row text-black text-sm p-2 border-zinc-200 border-1 py-5' >
        <div className="flex flex-row flex-1 pl-30 gap-10 items-center">
            <span>#</span>
        <button>Name</button>
        </div>
        <div className="flex flex-1 gap-10 items-center">
            <button>Price</button>
            <button>1h%</button>
            <button>24h%</button>
            <button>7d%</button>
        </div>
        <div className="flex flex-1/5 gap-10 flex-row">
            <button className='flex flex-row items-center gap-2' >Market Cap<FaInfoCircle className='text-zinc-700'/> </button>
            <button className='flex flex-row items-center gap-2' >Volume(24h)<FaInfoCircle className='text-zinc-700'/> </button>
             <button className='flex flex-row items-center gap-2' >Circulating Supply<FaInfoCircle className='text-zinc-700'/> </button>
        </div>
        <div className=" items-center hidden xl:flex ">
            <h4>last 7 days</h4>
        </div>
    </div>
  )
}

export default CoinSection