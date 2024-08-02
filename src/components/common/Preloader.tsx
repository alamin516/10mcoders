'use client'
import React, { useState } from 'react'

const Preloader = () => {
    const [display, setDisplay] = useState(false);
    setInterval(()=> {
        setDisplay(true)
    }, 1000)


  return (
    <div className={`${display ? '' : 'preloader dark:bg-gray-900'}`}>
        <div className="spinner_wrap">
            <div className="spinner"> 
            </div>
        </div>
    </div>
  )
}

export default Preloader