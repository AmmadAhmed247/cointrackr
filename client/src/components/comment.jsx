import React from 'react'
import CustomImage from './Image'
import { FaShareAlt, FaInfoCircle, FaGlobe, FaAngleDown, FaCheckCircle, FaEye, FaSmile, FaPlus, FaRetweet, FaRegComment } from 'react-icons/fa';

const Comment = () => {
  return (
     <div className="flex flex-col border-2  border-zinc-100 rounded-xl ">
          <div className="flex items-center rounded-md; justify-between  h-20">
            <div className="flex justify-between items-center  px-2  rounded-md   ">
              <h4 className='text-black text-sm flex flex-rwo gap-2 items-center'> <CustomImage src="bitcoin.png" h={28} w={28} />  Ammad <span><FaCheckCircle className="text-blue-500 w-4 h-4 ml-1" />  </span> <span className='text-zinc-500 text-sm' >: june 20 </span> </h4>
            </div>
            <div className=" flex  ">
              <button className=' active:scale-106 rounded-xl h-fit  flex flex-row items-center gap-2 bg-blue-600 text-white  font-semibold  text-xs px-2' > <span className='font-light flex items-center'>+</span  >   Follow </button>
            </div>
          </div>
          <p className='text-zinc-600 px-2 py-2 text-sm'>Lorem ipsum dolor sit amet consectetfaf a fa fa fa fa a fa faslorem
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum sint dolore quod sed necessitatibus accusamus suscipit enim aliquid sit eos facilis ex error, ratione ea deleniti, consectetur odit exercitationem reiciendis. ur adipisicing elit. Sit minima unde animi cumque magnam tempore tenetur dolores</p>
          <div className="flex  gap-6 pl-2 px-2 items-center mt-2 text-sm  text-gray-700">
            <FaEye className='active:scale-106' />           
            <FaRegComment className='active:scale-106' />    
            <FaRetweet className='active:scale-106' />                   
            <div className="relative inline-block">
              <FaSmile  className="text-yellow-500 active:scale-106 text-lg" />
              <FaPlus  className="absolute bottom-0 active:scale-106 right-0 text-[10px] text-green-600 bg-white rounded-full" />
            </div>
          </div>

        </div>
  )
}

export default Comment