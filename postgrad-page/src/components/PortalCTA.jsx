import React from 'react'
import image from '../assets/part.jpg'

const PortalCTA = () => {
  return (
    <div className='mt-20 md:w-7xl max-h-64 flex flex-col justify-center items-center rounded-3xl bg-center mx-auto p-20 md:gap-5 gap-2'
      style={{backgroundImage:`url(${image})`}}
    >
      <h1 className='font-[inter] font-bold md:text-5xl text-white'> Already a Part of DELSU Staff School? </h1>

      <p className='font-[inter] md:max-w-xl text-wrap text-center text-white'> Login to your portal to get the latest update about you child/student, results, timetable, classes and many more features</p>

      <div className='flex gap-5 items-center justify-center'>
        <div className='w-fit p-2 md:px-7 flex items-center justify-center font-[inter] font-medium bg-white text-black hover:bg-slate-100 rounded'> Teachers</div>
        <div className='w-fit p-2 md:px-7 flex items-center justify-center font-[inter] font-medium border-white border-2 text-white rounded'>Students</div>
      </div>
    </div>
  )
}

export default PortalCTA
