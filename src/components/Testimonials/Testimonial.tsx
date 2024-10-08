import { FormatQuoteOutlined } from '@mui/icons-material'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Testimonial = (props: Props) => {
  return (
    <div className="flex  items-center lg:gap-10 gap-3 lg:px-20 px-2 py-12 bg-gray-100 rounded-lg shadow-md max-w-6xl mx-auto my-8">
    <div className="flex-shrink-0 relative">
      <Image
        width={100}
        height={200}
        src="/assets/images/hsp-1.webp"
        alt="Wladimir Alexi"
        className="object-cover w-[120px] h-[120px] rounded-full"
      />

      <FormatQuoteOutlined className="absolute text-7xl -top-10 -left-10 rotate-180"/>
    </div>
    <div className="relative z-10">
      <div>
      <p className="text-gray-800 text-xs lg:text-base font-medium mb-4">
        Mockplus DS is very well thought out and allows us to create designs
        as quickly as possible with ease. We have several apps, that we&apos;ve
        created mockups for, and we tried different tools, but currently we
        moved entirely to Mockplus DS. I think it&apos;s way too underrated
        (especially in Europe) and provides a great value!
      </p>
      <div className="text-gray-600 font-semibold">Wladimir Alexi</div>
      <div className="text-gray-500">CEO & Founder of Maground</div>
      </div>
      <FormatQuoteOutlined className="absolute text-7xl -bottom-10 right-0 text-gray-300 z-[-1]"/>
    </div>
  </div>
  )
}

export default Testimonial