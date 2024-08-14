import { Groups } from '@mui/icons-material';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  course: any;
  isProfile?: boolean
}

const CourseCard: React.FC<Props> = ({ course, isProfile }) => {
  return (
    <Link href={!isProfile ? `/course/${course._id}` : `/course-access/${course._id}`}>
      <div className="course-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform glass-morphism">
        <div className="relative w-full h-48">
          <Image
            src={course.thumbnail.url}
            alt={course.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">{course.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">{course.description}</p>
          <div className="mt-2 flex flex-wrap items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Category: {course.categories}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Level: {course.level}</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xl font-bold text-green-600 dark:text-green-400">{course.price === 0 ? "Free" : `$${course.price}`}</p>
            {course.estimatedPrice && (
              <p className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">${course.estimatedPrice}</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400"><Groups/>: {course.sold}</p>
            <p className="text-sm text-yellow-500 dark:text-yellow-400 flex items-center">
              <span className="mr-1">{course.ratings}</span>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l5.09 2.67-1-5.81 4.2-3.64-5.84-.5L10 2l-2.45 6.72-5.84.5 4.2 3.64-1 5.81z" />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
