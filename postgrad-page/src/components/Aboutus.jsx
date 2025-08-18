import React from 'react';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'

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
    <div className="flex flex-col items-center justify-center gap-8 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-12">
      <div className="text-center max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-sans leading-tight">
          Expanding Learning Opportunities in Education.
        </h1>
      </div>

      <div className="text-center max-w-4xl">
        <p className="text-base sm:text-lg font-normal font-sans leading-relaxed line-clamp-6">
       {data?.intro || 'Loading'}
        </p>
      </div>

      <Link
        to={'/about'}
        className="border-b-2 border-blue-800 text-blue-800 font-medium hover:text-blue-600 transition-all duration-300"
      >
        Learn more about codel
      </Link>
    </div>
  );
};

export default Aboutus;
