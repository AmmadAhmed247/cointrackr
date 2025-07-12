import React, { useState, useMemo } from 'react';
import {
  FaShareAlt, FaInfoCircle, FaGlobe, FaAngleDown, FaCheckCircle,
  FaEye, FaSmile, FaPlus, FaRetweet, FaRegComment
} from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';
import axios from "axios";
import Comment from '../components/comment';
import CustomImage from '../components/Image';

const tabs = [
  'Chart', 'Market', 'News', 'Yield', 'Market cycles', 'Analytics', 'About',
];

const formatPercentage = (num) => {
  return typeof num === 'number' ? `${num.toFixed(2)}%` : '0.00%';
};

const formatBigNumber = (num) => {
  if (typeof num !== 'number') return '0';
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  return num.toLocaleString();
};

const formatRatioPercentage = (numerator, denominator) => {
  if (typeof numerator !== 'number' || typeof denominator !== 'number' || denominator === 0) {
    return '0.00%';
  }
  return `${((numerator / denominator) * 100).toFixed(2)}%`;
};

const getSinglePageData = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/coins/${slug}`);
  return res.data;
};

const getChartData = async (slug, days) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/coins/${slug}/market_chart`, {
    params: { days }
  });
  return res.data;
};

const SinglePage = () => {
  const { slug } = useParams();
  const [selectRange, setSelectRange] = useState("1");
  const [activeTab, setActiveTab] = useState("Chart");
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: async (newComment) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments/${slug}`,
        newComment,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', slug]);
      setCommentText("");
      setShowCommentBox(false); // auto-close on success
    },
    onError: (err) => {
      console.error("Post comment error:", err);
      alert("Login required to post a comment.");
    }
  });

  const sentimentMutation = useMutation({
    mutationFn: async (sentiment) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/sentiment/${slug}`,
        { sentiment },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(['sentiment', slug]),
    onError: (err) => {
      console.error("Vote error:", err);
      alert("Login required to vote on sentiment.");
    }
  });

  const handleVote = (sentiment) => {
    sentimentMutation.mutate(sentiment);
  };

  const { data: coin, isLoading: coinLoading, error: coinError } = useQuery({
    queryKey: ['coin', slug],
    queryFn: () => getSinglePageData(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  const { data: chartResponse, isLoading: chartLoading, error: chartError } = useQuery({
    queryKey: ['chart', slug, selectRange],
    queryFn: () => getChartData(slug, selectRange),
    enabled: !!slug,
    staleTime: 2 * 60 * 1000,
  });

  const { data: sentimentStats, isLoading: sentimentLoading } = useQuery({
    queryKey: ['sentiment', slug],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/sentiment/${slug}`);
      return res.data;
    },
    enabled: !!slug
  });

  const { data: comments } = useQuery({
    queryKey: ['comments', slug],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${slug}`);
      return res.data;
    },
    enabled: !!slug
  });

  const chartData = useMemo(() => {
    if (!chartResponse?.prices) return [];
    return chartResponse.prices.map(([timestamp, price]) => ({
      timestamp,
      value: price,
      date: new Date(timestamp).toLocaleDateString()
    }));
  }, [chartResponse]);

  if (coinLoading || chartLoading) {
    return <div className="flex justify-center items-center h-screen text-black">Loading...</div>;
  }

  if (coinError || chartError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {coinError?.message || chartError?.message}</div>;
  }

  if (!coin) {
    return <div className="flex justify-center items-center h-screen text-black">No data available</div>;
  }

  return (
    <div className='flex flex-row h-200 gap-2'>
      <div className="flex-1 p-3 relative ">
        <div className=" sticky z-40 top-0 bg-white">
          <div className="flex top-1 sticky z-40 flex-row justify-between items-center ">
            <div className="flex flex-row top-1 sticky z-40 items-center gap-3">
              <CustomImage src={coin.image} w={32} h={32} />
              <h5 className='text-zinc-800 flex gap-2 items-center' >{coin.name} <span className='text-sm text-zinc-500' >{coin.symbol.toUpperCase()}</span> <span className='text-xs rounded-2xl bg-zinc-300 px-1' >{coin.rank}</span></h5>
            </div>
            <div className="">
              <FaShareAlt className="text-gray-600 hover:text-zinc-500 cursor-pointer" />
            </div>
          </div>
          <div className="flex mt-4 top-1 sticky z-40 ">
            <h6 className="flex items-center gap-5  text-black text-4xl font-semibold "> ${coin.current_price.toLocaleString()}<span className='text-sm text-green-400 '>({typeof coin.price_change_percentage_24h === 'number' ? coin.price_change_percentage_24h.toFixed(2) : '0.00'}%)</span> </h6>
          </div>
        </div>
        <div className="flex-1 mt-4 border-1 rounded-xl border-zinc-100 justify-items-center">
          <h6 className='text-zinc-600 flex flex-row items-center gap-2 text-sm' >Market cap <FaInfoCircle className='text-zinc-700' /> </h6>
          <h6 className='text-zinc-800 flex gap-2 items-center' >{formatBigNumber(coin.market_cap)}<span className='text-sm text-green-500'>({formatPercentage(coin.market_cap_change_percentage_24h)})</span></h6>
        </div>
        <div className="flex h-20 gap-2 mt-2  ">
          <div className="flex-1/2   rounded-md border-zinc-100 border-1 pt-4">
            <h6 className='text-zinc-600  justify-center flex flex-row items-center gap-2 text-sm' >Volume <span className='text-xs text-zinc-500' >(24hr)</span> <FaInfoCircle className='text-zinc-700' /> </h6>
            <h6 className='text-zinc-700 flex gap-2 justify-center items-center' >{formatBigNumber(coin.total_volume)}<span className='text-sm text-green-500'>{formatPercentage(coin.total_volume_change_percentage_24h)}</span></h6>
          </div>
          <div className="flex-1/2 items-center justify-center  rounded-md border-zinc-100 border-1 pt-4">
            <h6 className='text-zinc-600  justify-center flex flex-row items-center gap-2 text-sm whitespace-nowrap' >Vol/Mkt Cap (24h) <FaInfoCircle className='text-zinc-700' /> </h6>
            <h6 className='text-zinc-700 flex gap-2 justify-center items-center' >{formatRatioPercentage(coin.total_volume_change_percentage_24h, coin.market_cap_change_percentage_24h)}<span className='text-sm text-green-500'></span></h6>
          </div>
        </div>
        <div className="flex h-20 gap-2 mt-2  ">
          <div className="flex-1/2   rounded-md border-zinc-100 border-1 pt-4">
            <h6 className='text-zinc-600  justify-center flex flex-row items-center gap-2 text-sm' >Max. supply  <FaInfoCircle className='text-zinc-700' /> </h6>
            <h6 className='text-zinc-700 flex gap-2 justify-center items-center' >{coin.max_supply || 'N/A'}</h6>
          </div>
          <div className="flex-1/2   rounded-md border-zinc-100 border-1 pt-4">
            <h6 className='text-zinc-600 flex flex-row justify-center items-center whitespace-nowrap gap-2 text-sm' >Circulating supply<FaInfoCircle className='text-zinc-700' /> </h6>
            <h6 className='text-zinc-700 flex gap-2 justify-center items-center' >{formatBigNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}</h6>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <h4 className='text-black text-sm'>Website</h4>
          <div className=" flex flex-row gap-4 ">
            <Link className='text-black rounded-xl flex flex-row items-center gap-2 bg-zinc-200 text-xs px-2' > <span><FaGlobe className="text-sm text-gray-600" /></span > Website </Link>
            <Link className='text-black rounded-xl flex flex-row items-center gap-2 bg-zinc-200 text-xs px-2' >Whitepaper <FaAngleDown className="text-sm" /></Link>
          </div>
        </div>

        <div className="flex justify-between mt-8  border-zinc-100 border-1 rounded-xl border-b-4 px-2 py-3">
          <div className="block">
            <h4 className='text-black text-sm '>All-time high </h4>
            <span className='text-black text-xs' >{coin.ath_date}</span>
          </div>
          <div className="block w-fit">
            <h4 className='text-sm text-black'>${coin.ath?.toLocaleString()}</h4>
            <span className={`text-sm ${formatPercentage(coin.ath_change_percentage) > 0 ? "text-green-500" : "text-red-500"}`}>
              {formatPercentage(coin.ath_change_percentage)}
            </span>
          </div>
        </div>
        <div className="flex border-zinc-100 border-1 rounded-xl px-2 py-3 justify-between border-t-4">
          <div className="block">
            <h4 className='text-black text-sm '>All-time low </h4>
            <span className='text-black text-xs' >{coin.atl_date}</span>
          </div>
          <div className="block w-fit">
            <h4 className='text-black text-sm '>${coin.atl?.toLocaleString()}</h4>
            {<span className='text-green-500 text-xs' >{formatPercentage(coin.atl_change_percentage)}</span>}
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
          <button className='text-white-600 active:scale-106 rounded-2xl  p-1 h-8 text-sm flex items-center whitespace-nowrap   bg-blue-600 font-semibold' >Buy {coin.symbol.toUpperCase()}</button>
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
                className={`text-black active:scale-106 hover:bg-zinc-200 w-10 h-8 px-2 text-sm rounded-2xl ${selectRange === value ? 'bg-blue-600 text-white' : 'bg-zinc-100'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-120  border-zinc-100 border-l-1 mt-10">
          <ResponsiveContainer width="100%" height="100%">
            {Array.isArray(chartData) && chartData.length > 0 ? (
              <LineChart data={chartData}>
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
                  stroke={chartData[0]?.value < chartData[chartData.length - 1]?.value ? '#4ade80' : '#f87171'}
                  strokeWidth={2}
                  dot={(props) => {
                    const isLast = props.index === chartData.length - 1;
                    if (isLast) {
                      return (
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
                      );
                    }
                    return null;
                  }}
                />
              </LineChart>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-center text-black">Chart data unavailable.</p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex-1 hidden xl:block">
        {/* Sentiment section */}
        <div className="border border-zinc-100 rounded-xl px-2 py-3">
          <h1 className='text-black flex gap-2 items-center'>Community sentiment <span className='text-zinc-600 text-xs'>4.2M votes</span></h1>
          <div className="flex justify-between mt-2">
            <div className="group flex items-center gap-2 cursor-pointer">
              <div className="h-2 w-24 bg-green-500 rounded-full group-hover:h-3" />
              <span className="text-green-600 text-sm font-medium group-hover:text-lg group-hover:font-bold">
                {sentimentLoading ? '...' : `${sentimentStats?.bullish || 0} Bullish`}
              </span>
            </div>
            <div className="group flex items-center gap-2 cursor-pointer">
              <div className="h-2 w-24 bg-red-500 rounded-full group-hover:h-3" />
              <span className="text-red-600 text-sm font-medium group-hover:text-lg group-hover:font-bold">
                {sentimentLoading ? '...' : `${sentimentStats?.bearish || 0} Bearish`}
              </span>
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <button
              className='text-green-500 active:scale-106 px-2 py-1 border border-green-500 rounded-xl flex-1'
              onClick={() => handleVote("bullish")}
              disabled={sentimentMutation.isLoading}
            >
              {sentimentMutation.isLoading ? 'Voting...' : 'Bullish'}
            </button>
            <button
              className='text-red-500 active:scale-106 px-2 py-1 border border-red-500 rounded-xl flex-1'
              onClick={() => handleVote("bearish")}
              disabled={sentimentMutation.isLoading}
            >
              {sentimentMutation.isLoading ? 'Voting...' : 'Bearish'}
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="mt-4 flex flex-col gap-2">
          {comments?.map((comment) => (
            <Comment
              key={comment._id}
              username={comment.user?.username}
              avatar="/bitcoin.png"
              createdAt={comment.createdAt}
              text={comment.description}
            />
          ))}
        </div>

        {/* Comment Button & Form (Fixed) */}
        <div className="relative">
          <button
            className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg"
            onClick={() => setShowCommentBox(prev => !prev)}
          >
            Comment
          </button>

          {showCommentBox && (
            <div className="fixed bottom-20 right-4 z-50 flex flex-col bg-white border border-zinc-200 rounded-xl w-96 shadow-lg p-4 h-fit">
              <h4 className="text-black font-medium text-sm mb-2">Post a comment</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!commentText.trim()) return;
                  commentMutation.mutate({ description: commentText });
                }}
                className="flex flex-col gap-2"
              >
                <textarea
                  placeholder="Write your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="border border-zinc-300 rounded-lg px-2 py-1 text-sm resize-none text-black"
                  rows={4}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white text-xs px-4 py-1 rounded-lg self-end"
                  disabled={commentMutation.isLoading}
                >
                  {commentMutation.isLoading ? "Posting..." : "Post"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SinglePage