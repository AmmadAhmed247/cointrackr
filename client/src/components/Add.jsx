import React from 'react'
import CustomImage from './Image'
import { Link } from 'react-router-dom'

const Add = () => {
  return (
    <div>
        <div className="rounded-4xl shadow-2xl xl:h-full w-full flex flex-col ">
                        <Link className="flex flex-col items-center">
                            <CustomImage src="add.jpg" className="rounded-3xl flex items-center h-fit w-[320px]" />
                        </Link>
                    
                    </div>
    </div>
  )
}

export default Add