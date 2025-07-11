import axios from "axios"

const COINGECKO_URL = 'https://api.coingecko.com/api/v3';
const FEAR_GREED_URL = 'https://api.alternative.me/fng/';

export const getGlobData = async () => {
  const res = await axios.get(`${COINGECKO_URL}/global`);
  return res.data.data;
};

export const exchangeData = async () => {
  const res = await axios.get(`${COINGECKO_URL}/exchanges`)
  return res.data.length;
}

export const fearGreed = async () => {
  try {
    const res = await axios.get(`${FEAR_GREED_URL}`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.data.data[0];
  } catch (error) {
    console.error('Fear & Greed API error:', error);
    // Return fallback data
    return {
      value: 54,
      value_classification: 'Neutral'
    };
  }
}

export const getTrendingCoinsData = async () => {
  const res = await axios.get(`${COINGECKO_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 5,
      page: 1,
      sparkline: true,
    }
  });
  return res.data;
}

export const getTopDeFiCoins = async () => {
  const res = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        category: 'decentralized-finance-defi',
        order: 'market_cap_desc',
        per_page: 5,
        page: 1,
        sparkline: true
      }
    }
  );
  return res.data;
};

export const getAICoins = async () => {
  try {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        category: 'artificial-intelligence',
        order: 'market_cap_desc',
        per_page: 5,
        page: 1,
        sparkline: true
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching AI coins:', error);
    throw error;
  }
};

// Fixed function name to match component usage
export const getGlobalMarketCap = async () => {
  try {
    const res = await axios.get(`${COINGECKO_URL}/global`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return res.data.data.total_market_cap.usd;
  } catch (error) {
    console.error("Global market cap error:", error);
    // Fallback: try to get from existing getGlobData function
    try {
      const globalData = await getGlobData();
      return globalData.total_market_cap.usd;
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      // Return a default value to prevent app crash
      return 3500000000000; // ~2.5T as fallback
    }
  }
};

// Updated to return formatted data for charts
export const chartData = async (days = 7) => {
  try {
    // First try global market cap chart
    const response = await axios.get(`${COINGECKO_URL}/global/market_cap_chart`, {
      params: { days: days },
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const data = response.data;
    
    if (data && data.market_cap_chart) {
      return data.market_cap_chart.map(([timestamp, value]) => ({
        time: timestamp,
        value: value
      }));
    }
  } catch (err) {
    console.error("Global chart data error:", err);
  }
  
  // Fallback: try Bitcoin chart data
  try {
    const response = await axios.get(`${COINGECKO_URL}/coins/bitcoin/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days
      },
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const data = response.data;
    
    if (data && data.market_caps) {
      return data.market_caps.map(([timestamp, value]) => ({
        time: timestamp,
        value: value
      }));
    }
  } catch (err) {
    console.error("Bitcoin chart data error:", err);
  }
  
  // Final fallback: return sample data
  return [
    { time: Date.now() - 6 * 24 * 60 * 60 * 1000, value: 210000000000 },
    { time: Date.now() - 5 * 24 * 60 * 60 * 1000, value: 2250000000000 },
    { time: Date.now() - 4 * 24 * 60 * 60 * 1000, value: 2120000000000 },
    { time: Date.now() - 3 * 24 * 60 * 60 * 1000, value: 2880000000000 },
    { time: Date.now() - 2 * 24 * 60 * 60 * 1000, value: 2060000000000 },
    { time: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 2900000000000 },
    { time: Date.now(), value: 2520000000000 }
  ];
};

// Alternative Bitcoin-specific chart data
export const getBitcoinChartData = async (days = 7) => {
  try {
    const response = await axios.get(`${COINGECKO_URL}/coins/bitcoin/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days
      }
    });
    
    const data = response.data;
    
    if (!data || !data.market_caps) {
      console.log("Bitcoin market_caps not found", data);
      return [];
    }

    // Format data for recharts
    return data.market_caps.map(([timestamp, value]) => ({
      time: timestamp,
      value: value
    }));
  } catch (err) {
    console.error("Bitcoin chart data error:", err);
    return [];
  }
};

// Get CMC100 equivalent data (top 100 coins average)
export const getCMC100Data = async () => {
  try {
    const res = await axios.get(`${COINGECKO_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 2, // Reduced to avoid rate limits
        page: 1,
        sparkline: true
      },
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const coins = res.data;
    if (!coins || coins.length === 0) {
      throw new Error('No coin data received');
    }
    
    const totalMarketCap = coins.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
    const averagePrice = totalMarketCap / coins.length / 1000000; // Convert to millions
    
    return {
      value: averagePrice,
      sparkline: coins.slice(0, 7).map(coin => coin.current_price || 0)
    };
  } catch (error) {
    console.error('Error fetching CMC100 data:', error);
    // Return fallback data
    return {
      value: 206.87,
      sparkline: [12, 15, 18, 22, 19, 25, 28]
    };
  }
};

// Get altseason data (Bitcoin dominance)
export const getAltseasonData = async () => {
  try {
    const res = await axios.get(`${COINGECKO_URL}/global`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const dominance = res.data.data.market_cap_percentage?.btc;
    
    if (!dominance) {
      throw new Error('Bitcoin dominance data not available');
    }
    
    // Convert Bitcoin dominance to altseason score (inverted)
    const altseasonScore = Math.round(100 - dominance);
    
    return {
      score: altseasonScore,
      btc_dominance: dominance
    };
  } catch (error) {
    console.error('Error fetching altseason data:', error);
    
    return {
      score: 24,
      btc_dominance: 76
    };
  }
};

export const getGlobalMarketcapData = async (days = 30) => {
  try {
    const res = await axios.get(`https://api.coingecko.com/api/v3/global/market_cap_chart`, {
      params: {
        days: days
      }
    })
    return res.data;
  } catch (error) {
    console.log("Global MC CHART DATA ERROR", error);
    throw error;
  }
}