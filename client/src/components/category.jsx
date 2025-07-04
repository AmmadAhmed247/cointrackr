import React, { useState } from 'react';

const tabs = [
  'All Crypto', 'NFTs', 'Categories', 'Token Unlock',
  '♻️ Rehypo', '🔥 Binance Alpha', '🔥 Tokenized Assets',
  '🔥 Memes', '🔥 SOL', '🔥 BNB', '🔥 AI', '🔥 RWA',
  '🔥 Gaming', '🔥 DePIN'
];

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('All Crypto');
  return (
    <div className="h-12 flex flex-row gap-6 text-zinc-600 items-center px-4 text-sm border-b border-b-zinc-300 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 transition-all whitespace-nowrap border-b-2 ${
            activeTab === tab? 'border-blue-500 text-blue-600 font-semibold': 'border-transparent'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
