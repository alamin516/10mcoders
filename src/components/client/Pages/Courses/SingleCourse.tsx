"use client";
import Skeleton from "@/components/common/Skeleton";
import { useGetSingleCourseQuery } from "@/lib/features/courses/coursesApi";
import Heading from "@/utils/Heading";
import Ratings from "@/utils/Ratings";
import { Close, Group } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseContent from "./CourseContent";
import CourseInfo from "./CourseInfo";
import CourseReviews from "./CourseReviews";
import InstructorSection from "./InstructorSection";
import { useCreatePaymentIntentMutation, useGetStripePublishKeyQuery } from "@/lib/features/orders/ordersApi";
import {loadStripe} from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Payment/CheckoutForm";
import { useLoadUserQuery } from "@/lib/features/api/apiSlice";

type Props = {
  courseId: string;
};

const SingleCourse: React.FC<Props> = ({ courseId }) => {
  const [open, setOpen] = useState(false);
  const { data: userData } = useLoadUserQuery("loadUser");
  const { data, isLoading, isError } = useGetSingleCourseQuery({
    id: courseId,
  });
  const {data: config} = useGetStripePublishKeyQuery({});
  const [createPaymentIntent, {data: paymentIntentData}] = useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(()=>{
    if(config){
      const publishkey = config.stripePublishableKey;
      setStripePromise(loadStripe(publishkey));
    }
    if(data){
      const amount = Math.round(data?.course.price * 100);
      createPaymentIntent(amount)
    }
  }, [config, data, createPaymentIntent])

  useEffect(()=>{
   if(paymentIntentData){
    setClientSecret(
      paymentIntentData?.clientSecret
    )
   }
  }, [paymentIntentData])


  const user = userData?.user;
  const course = data?.course;


  const isPurchased =
    user && user?.courses?.find((item: any) => item.courseId ===  courseId);

  const handleOrder = () => {
    setOpen(true);
  };

  return (
    <>
      <Heading
        title={`${course?.name ? course?.name : "Course"}`}
        description={`${course?.description}`}
        keywords={`${course?.tags}`}
      />

      <div className="relative">
        {/* Start  */}
        <div className="bg-gray-900 text-white h-[300px]">
          <div className="w-full 800px:w-[90%] 1100px:w-[1260px] mx-auto py-10 px-5 md:px-10 flex flex-col-reverse md:flex-row gap-20">
            {/* Course Information Section */}
            <div className="w-full 800px:w-8/12">
              {isLoading ? (
                <Skeleton className="h-10 w-full mb-4" />
              ) : (
                <h1 className="text-4xl font-bold text-white mb-4">
                  {course?.name}
                </h1>
              )}
              {isLoading ? (
                <Skeleton className="h-8 w-full mb-6" />
              ) : (
                <p className="text-lg text-gray-300 mb-6">
                  {course?.description}
                </p>
              )}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-yellow-400">
                  <span className="text-lg font-bold mr-2">
                    {course?.ratings}
                  </span>
                  <Ratings rating={course?.ratings} />
                </div>
                <div className="flex items-center text-white">
                  <Group className="mr-1" />
                  <span>{course?.sold} students enrolled</span>
                </div>
              </div>
            </div>

            {/* Course Purchase Section */}
            <div className="w-full 800px:w-4/12 bg-white text-gray-900 shadow-lg 800px:sticky top-[120px]">
              <CourseInfo
                course={course}
                isLoading={isLoading}
                handleOrder={handleOrder}
                open={open}
                setOpen={setOpen}
                isPurchased={isPurchased}
              />
            </div>
          </div>
        </div>

        {/* Course details */}
        <div className="w-full 800px:w-[90%] 1100px:w-[1260px]  mx-auto p-6">
          {/* Course Overview */}
          <div className="course-overview flex flex-col lg:flex-row gap-6 mb-12">
            <div className="course-thumbnail w-full 800px:w-8/12">
              {/* Course Content */}
              <div className="course-content">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Course Content
                </h2>
                <div className="border border-gray-400 mt-10">
                  <CourseContent course={course} isLoading={isLoading} />
                </div>
              </div>

              {/* Instructor Section */}
              <div className="instructor-section my-12">
                <InstructorSection course={course} />
              </div>

              {/* Student Feedback */}
              <div className="student-feedback mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Student Feedback
                </h2>
                {/* Render student reviews here */}
                <CourseReviews reviews={course?.reviews} />
              </div>
            </div>
            <div className="w-full 800px:w-4/12 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed top-0 left-0 w-full bg-black/70 flex items-center justify-center min-h-screen">
          <div className="form w-full 800px:w-[30%] bg-white h-auto rounded-md relative p-5">
            <div onClick={()=> setOpen(false)} className="absolute -top-10 -right-10 text-black w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
              <Close/>
            </div>
            <div className="w-full">
              {
                stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm setOpen={setOpen}  data={course}/>
                  </Elements>
                )
              }
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default SingleCourse;
