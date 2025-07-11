import React from 'react'

const Spinner = () => (
  <div className="flex items-center justify-center h-14 gap-2">
    <span className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
  </div>
);

export default Spinner