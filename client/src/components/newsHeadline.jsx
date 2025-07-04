import React from 'react'
import { Link } from 'react-router-dom'
import CustomImage from './Image';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
const NewsHeadline = ({ className }) => {
    const sparkData = [3.2, 1, 2, 3, 1, 2, 3]
    const sparkData2 = [1, 2, -1, -12, 1, 1, 13]
    const formattedData = sparkData.map((value, index) => ({
        value, time: index,
    }
    ))
    const formattedData2 = sparkData2.map((value, index) => ({
        value, time: index,
    }
    ))
    return (
        <div className={className} >
            <div className="bg-white rounded-4xl shadow-2xl h-32 w-full flex flex-col ">
                <Link className="flex flex-col">
                    <h5 className="text-black text-sm items-center gap-2 flex font-semibold p-2">CMC News<span className="inline-flex items-center space-x-1  text-black text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4  text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M22.25 12c0 5.66-4.59 10.25-10.25 10.25S1.75 17.66 1.75 12 6.34 1.75 12 1.75 22.25 6.34 22.25 12zm-11.19 4.16 6.02-6.02a.75.75 0 1 0-1.06-1.06l-5.49 5.49-2.02-2.02a.75.75 0 0 0-1.06 1.06l2.55 2.55c.3.3.77.3 1.06 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h6 className='text-zinc-500  text-xm pl-2 ' >. Jul 3</h6>
                    </span>
                    </h5>
                    <h4 className='text-black text-sm pl-2' >hello, int beta version btc going to 1m in 2027, eth goin to 10k soon #btctoMoon</h4>
                    <div className="flex flex-row gap-4  pl-4 pt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 10c0 3.866-3.582 7-8 7a8.387 8.387 0 01-3.519-.747L3 20l1.749-4.487A6.996 6.996 0 013 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 1l4 4-4 4M3 11v-1a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v1a4 4 0 01-4 4H3" />
                        </svg>

                    </div>
                </Link>
            </div>
            <div className="bg-whiterounded-4xl shadow-2xl h-32 w-full flex flex-col ">
                <Link className="flex flex-col">
                    <CustomImage src="add.jpg" className="rounded-3xl h-32 w-full" />
                </Link>
            
            </div>



        </div>
    )
}

export default NewsHeadline