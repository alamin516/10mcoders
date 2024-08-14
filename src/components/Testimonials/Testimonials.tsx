"use client"
import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Testimonial from './Testimonial';

import 'swiper/css';
import 'swiper/css/pagination';

type Props = {}

const Testimonials = (props: Props) => {
  return (
    <div className="w-full 1000px:w-[60%] mx-auto p-6 py-20">
        <div className="text-3xl font-bold mb-8 dark:text-white text-center">How learners like you are achieving their goals</div>
    <Swiper
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      grabCursor={true}
      autoplay={{
          delay: 4000,
          disableOnInteraction: false
      }}
      modules={[Pagination, Autoplay]}
    >
      {Array.from({ length: 5 }).map((item, i) => {
        return (
          <SwiperSlide key={i}>
            <Testimonial />
          </SwiperSlide>
        );
      })}
    </Swiper>
  </div>
  )
}

export default Testimonials