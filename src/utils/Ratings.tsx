import { StarHalfOutlined, StarOutlined } from '@mui/icons-material';
import React from 'react'

type Props = {
  rating: number
}

const Ratings: React.FC<Props> = ({rating}) => {
  const stars = [];

  for(let i = 1; i <= 5; i++){
    if(i <= rating){
      stars.push(
        <StarOutlined key={i} className='text-xl !text-yellow-600 mr-2 cursor-pointer'/>
      )
    }else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
      stars.push(
        <StarHalfOutlined key={i} className='text-xl !text-yellow-600 mr-2 cursor-pointer'/>
      )
    }else{
      stars.push(
        <StarHalfOutlined key={i} className='text-xl !text-yellow-600 mr-2 cursor-pointer'/>
      )
    }
  }

  return (
    <div className='flex mt-1 ml-2 800px:mt-0 800px:ml-0'>{stars}</div>
  )
}

export default Ratings