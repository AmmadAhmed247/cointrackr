import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Image from './Image'
import Search from './search'
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex h-16 md:h-20 items-center justify-between px-2 md:px-12 bg-blue-600 ' >
      <div className="flex flex-row items-center gap-5 ">
        <Link to="/" className='flex items-center' >
          <Image src="coinTrackr.png" w={52} h={52} alt="logo image" className="" />
          <span className='font-bold text-2xl ' >CoinTrackr</span>
        </Link>
        <div className="hidden xl:flex gap-3 text-sm items-center justify-center  ">
          <Link to="/test" >Cryptocurrencies</Link>
          <Link to="/test">DexScan</Link>
          <Link to="/test">Exchange</Link>
          <Link to="/test">Community</Link>
          <Link to="/test">Products</Link>
        </div>
      </div>
      <div className=" hidden xl:flex items-center gap-6 ">
        <Link>portfolio</Link>
        <Link>watchlist</Link>
        <Search />
        <button className='w-20 h-10 bg-zinc-800 rounded-2xl' >Login</button>
      </div>

      <div className="xl:hidden">
        <div className="flex flex-row gap-2">
          <Search />
          <div className="cursor-pointer text-xl flex flex-row" onClick={() => setOpen((prev) => !prev)}  >{open ? "X" : "☰"} </div>
        </div>

        <div className={`w-full h-screen flex flex-col items-center justify-center gap-12 absolute top-16 md:top-20 bg-white z-50 ${open ? "right-0" : "-right-[100%]"} transition-all ease-in-out`}>
          <Link to="/" className=" hover:text-xl hover:text-blue-800   text-black">Home</Link>
          <Link to="/exchanges" className="hover:text-xl hover:text-blue-800 text-black">Exchanges</Link>
          <Link to="/trending" className="hover:text-xl hover:text-blue-800  text-black">Trending</Link>
          <Link to="/volume" className="hover:text-xl hover:text-blue-800  text-black">Volume</Link>
          <div className="flex flex-col w-full gap-2">
            <Link className='bg-blue-600 rounded-md w-full items-center flex justify-center h-12' to="/signup" >
              Create an account
            </Link>
            <Link className='bg-blue-600 rounded-md w-full items-center flex justify-center h-12' to="/login" >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar