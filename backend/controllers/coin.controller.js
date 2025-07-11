import axios from "axios"


const COINGECKO_URL = 'https://api.coingecko.com/api/v3';

const FEAR_GREED_URL = 'https://api.alternative.me/fng/';


//global data 
export const GlobalData = async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_URL}/global`)
    res.json(response.data.data)
    console.log(response.data);
  } catch (error) {
    console.error('Error in Global data While fetching...', error.message);
    res.status(500).json({ error: "failed to fetch Global data" });


  }

}
// fear and greed function
export const getFearGreed = async (req, res) => {
  try {
    const response = await axios.get(`${FEAR_GREED_URL}`)
    const value = response.data.data[0].value;/// getting only value 
    res.json({ value })// fear // greed  and Value....
  } catch (error) {
    console.error("Fear & Greed Error", error.message);
    res.status(500).json({ error: "failed to fetch Value" })
  }
}

// Btc and Eth and all trednign coins section

export const getTrendingCoins = async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        sparkline: true,
        page: 1,
        per_page: 100,
        order: 'market_cap_desc',
      }
    });

    const toptwo = response.data.slice(0, 2);
    const gainers = response.data
      .slice(2)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 3);

    res.json({ topTwo: toptwo, gainers });
  } catch (error) {
    console.error("Error While fetching data in Trending coins", error.message);
    res.status(500).json({ error: "Failed to fetch trending coins" });
  }
};


// get Defi tokens

export const getDefiCoins = async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        sparkline: true,
        page: 1,
        per_page: 5,
        category: 'decentralized-finance-defi',
        order: 'market_cap_desc',
      }
    });


    res.json(response.data);
  } catch (error) {
    console.error("Error While fetching data in Defi coins", error.message);
    res.status(500).json({ error: "Failed to fetch Defi coins" });
  }
};
//ai coins data
export const getAiCoins = async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        sparkline: true,
        page: 1,
        category: 'artificial-intelligence',
        per_page: 5,
        order: 'market_cap_desc',
      }
    });


    res.json(response.data);
  } catch (error) {
    console.error("Error While fetching data in artificial-intelligence coins", error.message);
    res.status(500).json({ error: "Failed to fetch artificial-intelligence coins" });
  }
};


// single page slug , handler dynamic data


export const getSinglePageData = async (req, res) => {
  const { slug } = req.params;
  try {
    const response = await axios.get(`${COINGECKO_URL}/coins/${slug}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: true,
      }
    })
    const coin = response.data;

    res.status(200).json({
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image.large,
      rank: coin.market_cap_rank,
      current_price: coin.market_data.current_price.usd,
      market_cap: coin.market_data.market_cap.usd,
      market_cap_change_percentage_24h: coin.market_data.market_cap_change_percentage_24h,
      price_change_percentage_24h: coin.market_data.price_change_percentage_24h,
      total_volume: coin.market_data.total_volume.usd,
      total_volume_change_percentage_24h: coin.market_data.total_volume_change_24h, 
      circulating_supply: coin.market_data.circulating_supply,
      max_supply: coin.market_data.max_supply,
      ath: coin.market_data.ath.usd,
      ath_date: coin.market_data.ath_date.usd,
      ath_change_percentage: coin.market_data.ath_change_percentage.usd,
      atl: coin.market_data.atl.usd,
      atl_date: coin.market_data.atl_date.usd,
      atl_change_percentage: coin.market_data.atl_change_percentage.usd,
      sparkline: coin.market_data.sparkline_7d, 
    });
  } catch (error) {
    console.error("Error while fethcing single page error..", error.message);
    res.status(500).json({ error: "failed to fetch single page coins data..." })

  }
}
/// charts data 

export const getChartData = async (req, res) => {
  const { slug } = req.params;
  const { days } = req.query;
  
  try {
    const response = await axios.get(`${COINGECKO_URL}/coins/${slug}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days || '1',
      }
    });
    console.log(response.data);
    
    res.json(response.data);
    
  } catch (error) {
    console.error("Error fetching market data:", error.message);
    res.status(500).json({ message: 'Error fetching data' }); // Use 500 for server errors
  }
}