import Ratings from "@/utils/Ratings";
import React from "react";
import { format } from "timeago.js";

type Props = {
  reviews: any;
};

const CourseReviews: React.FC<Props> = ({ reviews }) => {

  if (reviews?.length === 0) {
    return (
      <div className="text-gray-600 dark:text-gray-300 text-center py-4">
        No reviews yet.
      </div>
    );
  }
  

  return (
    <div>
      {(reviews && [...reviews].reverse())?.map((item: any, index: number) => (
        <div className="w-full pb-5" key={index}>
          <div className="flex">
            {/* 1 */}
            <div className="w-[50px] h-[50px]">
              <div className="w-[50px] h-[50px] bg-slate-600 rounded-full flex items-center justify-center cursor-pointer">
                <h1 className="uppercase text-lg text-white">
                  AA
                </h1>
              </div>
            </div>
            {/* 2 */}
            <div className="hidden 800px:block pl-2">
              <div className="flex items-center">
                <h5 className="text-lg text-black dark:text-white">
                  {item.user.name}
                </h5>
                <Ratings rating={item.rating} />
              </div>
              <p className="text-black dark:text-white">{item.comment}</p>
              <small className="text-black dark:text-white">
                {format(item.createdAt)}
              </small>
            </div>
            <div className="pl-2 flex 800px:hidden items-center">
            <h5 className="text-lg text-black dark:text-white">
                  {item.user.name}
                </h5>
                <Ratings rating={item.rating} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseReviews;
