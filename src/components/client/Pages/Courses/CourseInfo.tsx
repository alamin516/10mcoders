import CoursePlayer from "@/components/admin/courses/CoursePlayer";
import Skeleton from "@/components/common/Skeleton";
import { styles } from "@/styles/style";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  course: any;
  isLoading: boolean;
  handleOrder?: any;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  isPurchased?: any
};

const CourseInfo: React.FC<Props> = ({ course, isLoading, handleOrder, open, setOpen, isPurchased }) => {
  const discountPercentagePrice = (
    ((course?.estimatedPrice - course?.price) / course?.estimatedPrice) *
    100
  ).toFixed(0);

  const isEqualPriceOrNot = course?.estimatedPrice !== course?.price;

  return (
    <>
      <CoursePlayer videoUrl={course?.demoUrl} title={course?.title} />
      <div className="p-5 z-10">
        <div className="flex items-center space-x-4">
          <div className="text-xl my-3">
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <>
                <div className="flex items-center dark:text-white">
                  <h1 className="text-[25px] dark:text-white">
                    {course.price == 0 ? "Free" : `$${course.price}`}
                  </h1>
                  {isEqualPriceOrNot ? (
                    <>
                      <h5 className="pl-3 text-xl line-through opacity-80">
                        ${course?.estimatedPrice}
                      </h5>
                      <h4 className="pl-5 text-[24px]">
                        {discountPercentagePrice}% off
                      </h4>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-6">
          {isPurchased ? <Link href={`/course-access/${course?._id}`}>
            <button className={`w-full text-center bg-green-500 py-2 text-white cursor-pointer`}>
            View Course
          </button>
          </Link>: <button onClick={()=> handleOrder()} className={`w-full text-center bg-green-500 py-2 text-white cursor-pointer`}>
            Enroll Now
          </button>}
        </div>
      </div>

    </>
  );
};

export default CourseInfo;
