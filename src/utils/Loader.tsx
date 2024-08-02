import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className="w-full !min-h-screen flex items-center justify-center ">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
  )
}

export default Loader