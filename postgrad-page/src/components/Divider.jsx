import React from 'react'
import image from '../assets/spattn.jpg'
const Divider = () => {
  return (
      <div className='w-full h-14 my-4 bg-center bg-blue-950 bg-contain border-2 bg-blend-color-dodge border-slate-300' 
       style={{backgroundImage:`url(${image})`}}
    > </div>
       
  )
}

export default Divider