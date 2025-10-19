import React from 'react'
import imageOne from '../assets/images/abrak gate 1.png'

const SecondHero = ({title, content }) => {
return (
    <header className=" grid grid-cols-2 p-20 gap-5 justify-center h-[50vh] bg-blue-950 relative w-full">
     <div className=' border-t-2 border-t-white p-4 mt-5'>
      <h1 className='font-[inter] text-white font-bold text-4xl '> {title ? title :'Our Value Framework'}</h1>
     </div>
     <div className=' border-t-2 border-t-white flex justify-center p-2 mt-5 ' >
      <h2 className='font-medium font-[inter] text-white w-[80%] text-3xl/normal' >
        {content ? content :'These are the guiding statements that help us make decisions about everything that we do'}</h2>
     </div>
    </header>
)
};

export default SecondHero;
