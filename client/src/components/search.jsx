import React from 'react'

const Search = () => {
    return (
        <div className='flex items-center gap-2 bg-white/10 px-3 py-2 h-7 w-fit rounded-md'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input type="text" placeholder='Search' className='bg-transparent border-none outline-none ' />
        </div>
    )
}

export default Search