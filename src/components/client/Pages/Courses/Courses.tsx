"use client";
import { useGetCoursesQuery } from '@/lib/features/courses/coursesApi';
import React from 'react';
import CourseCard from '@/components/Cards/CourseCard';
import CourseCardSkeleton from './CourseCardSkeleton';

type Props = {};

const Courses: React.FC<Props> = () => {
  const { data, isLoading } = useGetCoursesQuery({});

  return (
    <div className="container mx-auto 800px:p-6 px-5">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Explore Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))
        : data?.courses?.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
    </div>
  );
};

export default Courses;
