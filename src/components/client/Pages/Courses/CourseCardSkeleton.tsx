import React from 'react'

type Props = {}

const CourseCardSkeleton: React.FC<Props> = () => {
    return (
      <div className="course-card rounded-lg overflow-hidden shadow-lg animate-pulse">
        <div className="relative w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>
        </div>
      </div>
    );
  };
  

export default CourseCardSkeleton