import Heading from '@/utils/Heading'
import React from 'react'

type Props = {}

const About = (props: Props) => {
  return (
    <>
        <Heading
          title="About"
          description="This is a learning platform for beginner"
          keywords="Programming, React, JavaScript"
        />
        <div className="min-h-[calc(100vh-80px)] w-full flex justify-center items-center">
        <h2 className="text-2xl dark:text-white">About</h2>
      </div>
    </>
  )
}

export default About