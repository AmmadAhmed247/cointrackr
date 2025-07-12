import axios from "axios"

const COINGECKO_URL = 'https://api.coingecko.com/api/v3';
const FEAR_GREED_URL = 'https://api.alternative.me/fng/';



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
    { time: Date.now() - 6 * 24 * 60 * 60 * 1000, value: 2110000000000 },
    { time: Date.now() - 5 * 24 * 60 * 60 * 1000, value: 2250000000000 },
    { time: Date.now() - 4 * 24 * 60 * 60 * 1000, value: 2120000000000 },
    { time: Date.now() - 3 * 24 * 60 * 60 * 1000, value: 2880000000000 },
    { time: Date.now() - 2 * 24 * 60 * 60 * 1000, value: 2060000000000 },
    { time: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 9900000000000 },
    { time: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 1900000000000 },
    { time: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 900000000000 },
    { time: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 3900000000000 },
    { time: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 4900000000000 },
    { time: Date.now() - 1 * 24 * 60 * 60 * 1000, value: 5900000000000 },
    { time: Date.now(), value: 2520000000000 }
  ];
};


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
      sparkline: [12, 215, 118, 222, 119, 25, 283,20,152,1,3,5,17,8,1,2,3,4,335,711,28,0,23]
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

