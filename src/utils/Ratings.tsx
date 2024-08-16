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
        <StarOutlined key={i}  style={{ fontSize: '20px', color: "#ca8a04" }}  className=" cursor-pointer" />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <StarHalfOutlined key={i} style={{ fontSize: '20px', color: "#ca8a04" }}  className="!text-yellow-600  cursor-pointer" />
      );
    } else {
      stars.push(
        <StarBorder key={i} style={{ fontSize: '20px', color: "#ca8a04" }}  className="!text-yellow-600  cursor-pointer" />
      );
    }
  }

  return (
    <span className="flex items-center ml-2 800px:mt-0 800px:ml-0">
      {stars}
    </span>
  );
};

export default Ratings;
