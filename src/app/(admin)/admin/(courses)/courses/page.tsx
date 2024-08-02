import AllCourses from '@/components/admin/courses/AllCourses'
import Heading from '@/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <Heading title="Courses - admin" description="" keywords="" />
      <AllCourses/>
    </>
  )
}

export default page