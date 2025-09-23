import React, { useEffect,useState } from 'react'
import Button from './button'
import { FaArrowRight } from "react-icons/fa6"; 
import imageone from '../assets/images/imageone.jpg'
import imagetwo from '../assets/images/imagetwo.jpg'
import imagesix from '../assets/images/imagesix.png'
import imagefour from '../assets/images/imagefour.jpg'
import imagefive from '../assets/images/imagefive.jpg'
import imagethree from '../assets/images/imagethree.png'
import { Link } from 'react-router-dom';

const Hero = () => {
const [data, setData] = useState(null);

useEffect(() => {
  
const fetchdata = async ()=>{
  try {
     
     const res = await fetch('/api/settings/homepage')
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
    <section className='flex flex-col'>
   
    
<div className='Flex flex-col   p-5  md:p-20'> 

<div className='flex flex-col md:flex-row justify-between'> <div className='flex flex-col w-full text-center md:text-left bg-white md:w-full
 text-4xl/snug md:text-[7rem]/tight font-[inter] font-bold md:font-bold '> <span>  {data?.title || 'loading'}</span>
<span className='text-blue-500'>  {data?.subtitle || 'loading'}</span> </div>  <span className='hidden md:flex'> <img src='' alt="" /></span></div>

<Link as='div' to={'/programmes'}  className='flex flex-col md:flex-row  gap-5 md:justify-between mt-5 md:mt-15'> 
  
  <div className='flex flex-col md:flex-row border-[1px] border-slate-200 bg-slate-100 shadow h-18 w-90% md:w-65 justify-center items-center rounded-full relative'>  
    <div className='left-4 flex absolute rounded-full object-cover border-2 w-9 h-9 border-blue-500'>  <img className='rounded-full w-full h-full' src={imageone} alt="" /></div>
    <div className='flex left-10 absolute rounded-full object-cover border-2 w-9 h-9 border-blue-500'>  <img className='rounded-full w-full h-full' src={imagetwo} alt="" /></div>
    <div className='flex left-16 absolute rounded-full object-cover border-2 w-9 h-9 border-blue-500'>  <img className='rounded-full w-full h-full' src={imagethree} alt="" /></div>
    <div className='left-22 absolute rounded-full object-cover border-2 w-9 h-9 border-blue-500'>  <img className='rounded-full w-full h-full' src={imagefive} alt="" /></div>
    <div className='left-28 absolute rounded-full object-cover border-2 w-9 h-9 border-blue-500'>  <img className='rounded-full w-full h-full' src={imagesix} alt="" /></div>
    
    <div className='flex flex-col items-center  absolute right-10 md:right-5'><span className='font-bold font-[inter]'>100+  </span> <span className='text-lg'>Courses </span></div>
 </div>


   <p className='w-full text-justify md:w-md md:text-left font-[inter] md:text-lg text-gray-300 text-wrap line-clamp-5' dangerouslySetInnerHTML={{__html:data?.intro}}>
    </p></Link>
<div className='flex mt-10 md:mt-16 w-full h-full md:h-[550px] object-cover'> <img className='flex rounded-sm w-full h-full' src={imageone} alt="" /></div>
</div>




    </section>
  )
}

export default Hero
