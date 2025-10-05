import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Vid({setIntroComplete}) {
    useEffect(() => {
        setTimeout(() => {
            setIntroComplete(false)
        }, 3000)
    }, [])


  return (
    <div className='w-full h-full flex flex-col items-center justify-center relative bg-black'>
         
            <h1 className='text-4xl font-bold font-orbitron text-center uppercase scale-in-out fixed top-1/2 text-orange-500'>
            Discover worlds beyond <br />Your imagination.
            </h1>
    </div>
  )
}

export default Vid
