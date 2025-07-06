import React, { useActionState, useEffect, useState } from 'react'
import { FaShareAlt, FaInfoCircle, FaGlobe, FaAngleDown, FaCheckCircle, FaEye, FaSmile, FaPlus, FaRetweet, FaRegComment } from 'react-icons/fa';
import { BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs';
import Comment from '../components/comment';
import CustomImage from '../components/Image'
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer,YAxis,XAxis,CartesianGrid   } from 'recharts';
import axios from "axios"

const tabs = [
  'Chart', 'Market', 'News', 'Yield',
  'Market cycles', 'Analytics', 'About',
];
const singlepage = () => {
  const sparkData = [3.2, 1, 2, 3, 1, 2, 3, 3.2, 1, 2, 3, 1, 22, 2, 3, 3.2, 1, 2, 3, 1, 2, 3, 22, 10, 10, 4, 6, 7, 8, 9, 11, 22, 33, 10, 22]
  const formetdata = sparkData.map((value, index) => ({
    value, time: index,
  }
  ))
  const [selectRange,setselectRange]=useState("365");
 const [data,setData]=useState([])
 useEffect(() => {
  const getChartData = async () => {
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
        {
          params: {
            vs_currency: 'usd',
            days: selectRange,
          },
          
        }
      );

      const priceData = res.data.prices.map((price, index) => ({
        time: index,
        value: price[1],
      }));

      setData(priceData);
    } catch (error) {
      console.error('❌ Error fetching chart data:', error?.response?.status, error?.message);
      if (error.response?.status === 401) {
        alert("🚫 Unauthorized access — API may be rate limited or need API key!");
      }
    }
  };

  getChartData();
}, [selectRange]);


  const [activeTab, SetTab] = useState("Chart");
  return (
    <div className='flex flex-row h-200 gap-2'>
      <div className="flex-1 p-3 relative ">
        <div className=" sticky z-40 top-0 bg-white">
          <div className="flex top-1 sticky z-40 flex-row justify-between items-center ">
            <div className="flex flex-row top-1 sticky z-40 items-center gap-3">
              <CustomImage src="bitcoin.png" w={32} h={32} />
              <h5 className='text-zinc-800 flex gap-2 items-center' >Bitcoin <span className='text-sm text-zinc-500' >BTC</span> <span className='text-xs rounded-2xl bg-zinc-300 px-1' >#1</span></h5>
            </div>
            <div className="">
              <FaShareAlt className="text-gray-600 hover:text-zinc-500 cursor-pointer" />
            </div>
          </div>
          <div className="flex mt-4 top-1 sticky z-40 ">
            <h6 className="flex items-center gap-5  text-black text-4xl font-semibold ">$108,201.02 <span className='text-sm ' > 0.35% (7d)</span> </h6>
          </div>
        </div>
        <div className="flex-1 mt-4 border-1 rounded-xl border-zinc-100 justify-items-center">
          <h6 className='text-zinc-600 flex flex-row items-center gap-2 text-sm' >Market cap <FaInfoCircle className='text-zinc-700' /> </h6>
          <h6 className='text-zinc-800 flex gap-2 items-center' >$2.15T<span className='text-sm text-green-500'>0.38%</span></h6>
        </div>
        <div className="flex h-20 gap-2 mt-2  ">
          <div className="flex-1/2   rounded-md border-zinc-100 border-1 pt-4">
            <h6 className='text-zinc-600  justify-center flex flex-row items-center gap-2 text-sm' >Volume <span className='text-xs text-zinc-500' >(24hr)</span> <FaInfoCircle className='text-zinc-700' /> </h6>
            <h6 className='text-zinc-700 flex gap-2 justify-center items-center' >$31.21B<span className='text-sm text-green-500'>28.33%</span></h6>
          </div>
          <div className="flex-1/2 items-center justify-center  rounded-md border-zinc-100 border-1 pt-4">
            <h6 className='text-zinc-600  justify-center flex flex-row items-center gap-2 text-sm whitespace-nowrap' >Vol/Mkt Cap (24h) <FaInfoCircle className='text-zinc-700' /> </h6>
            <h6 className='text-zinc-700 flex gap-2 justify-center items-center' >1.42%<span className='text-sm text-green-500'>0.38%</span></h6>
          </div>
        </div>
        <div className="flex h-20 gap-2 mt-2  ">
          <div className="flex-1/2   rounded-md border-zinc-100 border-1 pt-4">
            <h6 className='text-zinc-600  justify-center flex flex-row items-center gap-2 text-sm' >Max. supply  <FaInfoCircle className='text-zinc-700' /> </h6>
            <h6 className='text-zinc-700 flex gap-2 justify-center items-center' >21M BTC</h6>
          </div>
          <div className="flex-1/2   rounded-md border-zinc-100 border-1 pt-4">
            <h6 className='text-zinc-600 flex flex-row justify-center items-center whitespace-nowrap gap-2 text-sm' >Circulating supply<FaInfoCircle className='text-zinc-700' /> </h6>
            <h6 className='text-zinc-700 flex gap-2 justify-center items-center' >19.88M BTC</h6>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <h4 className='text-black text-sm'>Website</h4>
          <div className=" flex flex-row gap-4 ">
            <Link className='text-black rounded-xl flex flex-row items-center gap-2 bg-zinc-200 text-xs px-2' > <span><FaGlobe className="text-sm text-gray-600" /></span > Website </Link>
            <Link className='text-black rounded-xl flex flex-row items-center gap-2 bg-zinc-200 text-xs px-2' >Whitepaper <FaAngleDown className="text-sm" /></Link>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <h4 className='text-black text-sm'>Socials</h4>
          <div className=" flex flex-row gap-4 ">
            <Link className='text-black rounded-xl   flex flex-row items-center gap-2 bg-zinc-200 text-sm px-2' >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-black "
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
  3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
  0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
  -.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.083-.729.083-.729 
  1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.304 3.495.997 
  .108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 
  0-1.31.47-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 
  1.005-.322 3.3 1.23a11.51 11.51 0 0 1 3-.405c1.02.005 2.045.138 
  3 .405 2.28-1.552 3.285-1.23 3.285-1.23 .645 1.653.24 2.873.12 
  3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 
  5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 
  0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297 
  c0-6.627-5.373-12-12-12"/>
              </svg></Link>
            <Link className='text-black rounded-xl flex flex-row items-center gap-2 bg-zinc-200 text-sm px-2' >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="text-orange-500"
              >
                <path d="M440.5 194.8c-13.4 0-25.6 5.4-34.5 14.1-33.6-23.5-79.8-38.8-130.3-40.1l26.6-84 73.1 17.3c0 19.1 15.6 34.7 34.7 34.7 19.2 0 34.8-15.6 34.8-34.7s-15.6-34.7-34.8-34.7c-13.7 0-25.5 8-31.3 19.6l-81.7-19.2c-6.6-1.6-13.4 2.2-15.3 8.7l-31.3 98.6c-51.2 1.9-97.5 17.3-131.3 40.9-8.9-9.1-21.2-14.7-34.8-14.7C32 194.8 0 226.7 0 266.7c0 26.1 15.3 49.2 37.7 61.1-1.4 6.6-2.2 13.4-2.2 20.3 0 70.2 91.4 127.2 204.3 127.2s204.3-57 204.3-127.2c0-6.9-.8-13.7-2.2-20.3 22.7-11.8 38-34.9 38-61.1-.1-40.1-32.1-71.9-71.4-71.9zM114.2 314.1c0-19.1 15.6-34.7 34.7-34.7 19.2 0 34.8 15.6 34.8 34.7s-15.6 34.7-34.8 34.7c-19.1 0-34.7-15.6-34.7-34.7zm202.7 60.9c-17.5 17.5-54.6 18.5-61.4 18.5s-43.9-.9-61.4-18.5c-3.9-3.9-3.9-10.2 0-14.1s10.2-3.9 14.1 0c9.4 9.4 32.4 13.1 47.3 13.1s37.9-3.8 47.3-13.1c3.9-3.9 10.2-3.9 14.1 0s3.9 10.2 0 14.1zm15.3-26.1c-19.2 0-34.8-15.6-34.8-34.7s15.6-34.7 34.8-34.7c19.1 0 34.7 15.6 34.7 34.7s-15.6 34.7-34.7 34.7z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <h4 className='text-black text-sm'>Explorers</h4>
          <div className=" flex flex-row gap-4 ">
            <Link className='text-black rounded-xl flex flex-row items-center gap-3  bg-zinc-200 text-xs px-2' >blockchain.info </Link>
            <span className='flex justify-center items-center' ><FaAngleDown className="text-sm rounded-xl  gap-3 bg-zinc-400" /></span>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <h4 className='text-black text-sm '>Wallets</h4>
          <div className=" flex flex-row gap-4 ">
            <Link className='text-black rounded-xl   flex flex-row items-center gap-2 bg-zinc-200 text-sm px-2' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" width="12" height="12" fill="currentColor">
                <path d="M1249.9 0 1562.5 312.7 1380.6 494.6 1068 182.1 1249.9 0zm431.9 431.8 212.7 212.8-182.1 182-212.7-212.7 182.1-182.1zM918 494.6 735.9 312.7 1048.6 0l182 182.1L918 494.6zm1126.6 324.9 182.1 182-1248.8 1249-1249-1249 182.1-182L999 1936.3l1045.6-1116.8zM1811.8 1073l-212.7 212.7-349.2-349.3-349.3 349.3-212.7-212.7 562-561.9 562 561.9zM694.5 718.2 481.7 931 299.7 748.9l212.8-212.8 182 182.1zM0 1249.9l312.7 312.6 182.1-182.1L182.1 1067.8 0 1249.9zm2180.3-182.1 312.6 312.7-312.6 312.6-182.1-182 182.1-182.1zM918.2 2005.3l149.4 149.4 182.3 182.3 182.2-182.2 149.4-149.5-331.6-331.6-331.7 331.6z" />
              </svg>
            </Link>
            <Link className='text-black rounded-xl flex flex-row items-center gap-2 bg-zinc-200 text-sm px-2' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" width="12" height="12" fill="currentColor">
                <path d="M18 0a8.67 8.67 0 0 0-8.67 8.67v5.47H4v21.59a12.09 12.09 0 0 0 3.3 8.29l.13.13a11.53 11.53 0 0 0 3.25 2.25l.55.25a11.88 11.88 0 0 0 4.5.89h8.13a11.83 11.83 0 0 0 4.48-.89 11.56 11.56 0 0 0 3.82-2.38l.14-.14a12.09 12.09 0 0 0 3.3-8.29V14.14h-5.33V8.67A8.67 8.67 0 0 0 18 0zm-5.33 8.67a5.33 5.33 0 1 1 10.66 0v5.47h-10.66V8.67z" />
              </svg>

            </Link>
            <Link className='text-black rounded-xl flex flex-row items-center gap-2 bg-zinc-200 text-sm px-2' >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" width="12" height="12" fill="currentColor">
                <path d="M0 0v667h667V0H0zm417.9 417.9H250v-167.8h167.9v167.8zM916.7 0v417.9h583.3V0H916.7zm417.9 250H1083.3v-167.8h251.3V250zM1916.7 0v667H2500V0h-583.3zm417.9 417.9h-250v-167.8h250v167.8zM0 916.7v583.3h667V916.7H0zm417.9 417.9H250v-167.8h167.9v167.8zM1832.1 916.7V2500H667V916.7H1832.1z" />
              </svg>


            </Link>
            <FaAngleDown className="text-sm text-zinc-800 bg-zinc-200  items-center flex rounded-full  " />

          </div>
        </div>
        <div className="flex justify-between mt-8">
          <h4 className='text-black text-sm flex flex-row items-center gap-2'>UCID <FaInfoCircle className='text-zinc-700 text-xs' /></h4>
          <div className=" flex flex-row gap-4 ">
            <Link className='text-black rounded-xl flex flex-row items-center gap-3  bg-zinc-200 text-xs px-2' >1 <span className='flex justify-center items-center' ><FaAngleDown className="text-sm rounded-xl  gap-3 bg-zinc-400" /></span></Link>

          </div>
        </div>
        <div className="flex flex-col">
          <h6 className='text-black mt-7 text-sm flex-1' >BTC to USD converter</h6>
          <form action="" className='flex flex-col gap-2 mt-5'>
            <input type="text" placeholder='Enter Amount' className='text-black px-2 text-sm p-2 border-1 border-zinc-100 rounded-2xl ' />
            <h5 className='text-black px-2 flex text-sm p-2 border-1 border-zinc-100 rounded-2xl items-center '  >USD </h5>
          </form>
        </div>
        <div className="flex justify-between mt-8  border-zinc-100 border-1 rounded-xl border-b-4 px-2 py-3">
          <div className="block">
            <h4 className='text-black text-sm '>All-time high </h4>
            <span className='text-black text-xs' >May 22, 2025 (1 month ago)</span>
          </div>
          <div className="block text-left w-25">
            <h4 className='text-black text-sm '>$111,970.17 </h4>
            <span className='text-black text-xs' >-3.39%</span>
          </div>


        </div>
        <div className="flex border-zinc-100 border-1 rounded-xl px-2 py-3 justify-between border-t-4">
          <div className="block">
            <h4 className='text-black text-sm '>All-time low </h4>
            <span className='text-black text-xs' >Jul 15, 2010 (15 years ago)</span>
          </div>

          <div className="block w-fit">
            <h4 className='text-black text-sm '>$0.04865 </h4>
            <span className='text-black text-xs' >+222368796.21%</span>
          </div>


        </div>
      </div>
      <div className="flex-3 relative">
        <div className="flex z-40 bg-white top-0 sticky justify-between items-center border-1 border-zinc-100 rounded-md ">
          <div className="flex  flex-row gap-8 px-2 py-3 items-center justify-center  ">
            {tabs.map((tab, index) => (
              <button key={index} onClick={() => SetTab(tab)} className={`pb-2 border-b-2 active:scale-106 text-zinc-500  whitespace-nowrap  ${activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent"}`} >{tab}</button>
            ))}
          </div>
          <button className='text-white-600 active:scale-106 rounded-2xl  p-1 h-8 text-sm flex items-center whitespace-nowrap   bg-blue-600 font-semibold' >Buy Btc</button>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4 bg-zinc-100 rounded-2xl px-2 mt-2 whitespace-nowrap h-10">
            <button className='text-black text-sm '>Price</button>
            <span className='text-black items-center flex  font-bold'>|</span>
            <button className='text-black text-sm '>Market cap</button>
          </div>
         <div className="flex flex-row gap-2 hover:bg-zinc-50 px-5 rounded-2xl bg-zinc-1010 mt-2 items-center whitespace-nowrap h-10">
  {[
    { label: '1D', value: '1' },
    { label: '7D', value: '7' },
    { label: '1M', value: '30' },
    { label: '1Y', value: '365' },
    { label: 'All', value: 'max' },
  ].map(({ label, value }) => (
    <button
      key={value}
      onClick={() => setselectRange(value)}
      className={`text-black active:scale-106 hover:bg-zinc-200 w-10 h-8 px-2 text-sm rounded-2xl ${
        selectRange === value ? 'bg-blue-600 text-white' : 'bg-zinc-100'
      }`}
    >
      {label}
    </button>
  ))}
</div>

        </div>
        <div className="h-120  border-zinc-100 border-l-1 mt-10">
  <ResponsiveContainer width="100%" height="100%">
  <LineChart data={data}>
    <CartesianGrid stroke="#e5e7eb" strokeDasharray="2" vertical={false} />
    <YAxis
      className='text-black'
      domain={['auto', 'auto']}
      tick={{ fill: 'black', fontSize: 12 }}
      axisLine={{ stroke: '#ccc' }}
      tickLine={false}
      orientation="right"
    />
    <Line
      type="monotone"
      dataKey="value"
      stroke={data[0]?.value < data[data.length - 1]?.value ? '#4ade80' : '#f87171'}
      strokeWidth={2}
      dot={(props) => {
        const isLast = props.index === data.length - 1;
        if (isLast) {
          return (
            <>
              <foreignObject x={props.cx + 8} y={props.cy - 24} width={80} height={30}>
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    backgroundColor: '#22c55e',
                    color: 'white',
                    fontSize: '12px',
                    borderRadius: '6px',
                    padding: '2px 6px',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ${props.payload.value.toFixed(2)}
                </div>
              </foreignObject>
            </>
          );
        }
        return null;
      }}
    />
  </LineChart>
</ResponsiveContainer>



        </div>
      </div>
      <div className="flex-1 items-center hidden xl:block ">
        <div className="flex justify-between items-center  px-2 border-1 border-zinc-100 rounded-md py-3   ">
          <h4 className='text-black text-sm flex flex-rwo gap-2 items-center'> <CustomImage src="bitcoin.png" h={28} w={28} />  Bitcoin <span><FaCheckCircle className="text-blue-500 w-4 h-4 ml-1" />  </span> <span className='text-zinc-700 text-sm' > 2.8M follower</span> </h4>
          <div className=" flex flex-row gap-4 ">
            <button className=' rounded-xl active:scale-106 flex flex-row items-center gap-2 bg-blue-600 text-white  font-semibold py-2 text-xs px-2' > <span className='font-light'>+</span >   Follow </button>
          </div>

        </div>
        <div className="border-1 block border-zinc-100 pt-3 flex-row px-2 rounded-xl pb-1">
          <h1 className='text-black flex gap-2  items-center' >Community sentiment <span className='text-zinc-600 text-xs' >4.2M votes</span></h1>
          <div className="flex flex-row justify-between mt-2">

            <div className="flex items-center gap-2">

              <div className="group flex items-center gap-2 cursor-pointer">

                <div className="h-2 w-24 rounded-full bg-green-500 transition-all duration-300 group-hover:h-3" />


                <span className="text-green-600 text-sm font-medium transition-all duration-300 group-hover:text-lg group-hover:font-bold">
                  +2.3%
                </span>
              </div>
            </div>
            <div className="group flex items-center gap-2 cursor-pointer">
              <div className="h-2 w-24 rounded-full bg-red-500 transition-all duration-300 group-hover:h-3" />
              <span className="text-red-600 text-sm font-medium transition-all duration-300 group-hover:text-lg group-hover:font-bold">
                -1.7%
              </span>
            </div>
          </div>


          <div className="flex flex-row justify-between gap-4 mt-2">


            <button className='text-green-500 active:scale-106 px-2 py-1 border-1 flex-1 border-green-500 rounded-xl' >bullish</button>
            <button className='text-red-500 active:scale-106 px-2 py-1 border-1 flex-1 border-red-500 rounded-xl' >bearish</button>
          </div>
        </div>
        <div className="flex-1 items-center group relative">
          <div className="sticky top-0 z-40 flex justify-between items-center gap-2 p-2 border-zinc-100 border-2 rounded-md bg-white">
            <button className='text-black ml-20 w-fit px-10 py-1 rounded-md bg-zinc-100'>Top</button>
            <button className='text-black mr-20 w-fit px-10 py-1 rounded-md bg-zinc-100'>Latest</button>

          </div>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />

        </div>

        <div className="relative group">
          <button className="fixed bottom-1 right-4 z-50 bg-blue-600 text-white px-8 border-2 border-zinc-100 shadow-2xl py-4 rounded-full text-sm ">
            Comment
          </button>
          <div className="fixed bottom-10 right-4 z-50 hidden group-hover:flex flex-col bg-white border border-zinc-200 rounded-xl w-96 shadow-lg p-4 h-fit transition-all duration-100">
            <h4 className="text-black font-medium text-sm mb-2">Post a comment</h4>
            <form className="flex flex-col gap-2">
              <textarea
                placeholder="Write your comment..."
                className="border border-zinc-300 rounded-lg px-2 py-1 text-sm resize-none text-black"
                rows={4}
              />
              <button className="bg-blue-600 text-white text-xs px-4 py-1 rounded-lg self-end">Post</button>
            </form>
          </div>
        </div>

      </div>
    </div>



  )
}

export default singlepage