import React from 'react'
import { Image } from '@imagekit/react';
const CustomImage = ({src,w,h,alt,className}) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_IK_URL_END_POINT}
      src={src}
      width={w}
      height={h}
      alt={alt}
      className={className}
    />
  )
}

export default CustomImage