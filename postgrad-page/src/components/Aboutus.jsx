import React from 'react';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';

const Aboutus = () => {

  const [data, setData] = useState(null);

useEffect(() => {
  
const fetchdata = async ()=>{
  try {
     
     const res = await fetch('/api/settings/about')
     const data = await res.json()
     if(res.ok){
 
      setData(data)
      return
     }

     if(!res.ok){
      console.log('cant get response')
     }

  } catch (error) {
    console.log(error.message)
  }
}

fetchdata()
     
}, [])



  return (

    <section className='flex flex-col p-5 md:px-20'>

      <div className='flex flex-col items-center  md:flex-row justify-between'>
        <h1 className='flex text-center font-[inter] font-medium text-2xl md:text-5xl/tight md:text-left md:w-[40%]'> Expanding Learning Opportunities in Education. </h1>
       <div className='flex flex-col'>
        <div> <p className='font-[inter] text-center font-lg line-clamp-5 py-2' dangerouslySetInnerHTML={{__html:data?.intro || 'Loading'}}></p> 
        <Link as='div' to={'/about'} className='font-[inter] font-bold text-sm w-fit py-2 px-1 flex place-items-center border-b-2 border-blue-300'> About us <FaArrowRightLong className='ml-4'/> </Link></div> 
       </div>

      </div>

    </section>
  );
};

export default Aboutus;
