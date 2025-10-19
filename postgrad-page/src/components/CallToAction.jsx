import React from 'react';
import Button from './button';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 align justify-center items-center border-t-3 md:mx-15 mt-20 border-blue-950'>
     <div className='flex border-y border-red-600 mt-10 p-6  justify-between' >
       <h1 className='text-2xl font-semibold w-[65%] break-words font-[inter]'> Enquire now to secure your child’s place.</h1>
        <div className='flex items-center justify-center
          font-semibold font-inter border px-7 rounded border-red-500 hover:text-white hover:bg-red-600 transition-transform duration-700 '> <Link>Apply now </Link></div>
     </div>

   <div className='flex border-y border-blue-600 mt-10 p-6  justify-between' >
       <h1 className='text-2xl font-semibold w-[65%] break-words font-[inter]'> Enquire now to secure your child’s place.</h1>
        <div className='flex items-center justify-center
          font-semibold font-inter border px-7 rounded text-white bg-blue-900 transition-transform duration-700 hover:text-black hover:underline-offset-8  hover:underline hover:bg-white'> <Link>Portal Login </Link></div>
     </div>
    </section>
    
  );
};

export default CallToAction;
