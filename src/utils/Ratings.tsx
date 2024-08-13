import { StarHalfOutlined, StarOutlined, StarBorder } from '@mui/icons-material';
import React from 'react';

type Props = {
  rating: number;
};

const Ratings: React.FC<Props> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <StarOutlined key={i}  style={{ fontSize: '16px' }}  className="text-lg w-4 text-yellow-600 mr-2 cursor-pointer" />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <StarHalfOutlined key={i} style={{ fontSize: '16px' }} className="text-lg w-4 text-yellow-600 mr-2 cursor-pointer" />
      );
    } else {
      stars.push(
        <StarBorder key={i} style={{ fontSize: '16px' }} className="text-lg w-4 text-yellow-600 mr-2 cursor-pointer" />
      );
    }
  }

  return (
    <span className="flex items-center mt-1 ml-1 800px:mt-0 800px:ml-0">
      {rating}{" "} {stars}
    </span>
  );
};

export default Ratings;
