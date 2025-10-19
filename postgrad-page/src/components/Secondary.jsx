import React, { Suspense } from 'react'
import image from '../assets/images/school4.jpg'
import { Button } from 'flowbite-react'
// import AboutSecon from './AboutSecon'
import AboutMis from './AboutMis'
import News from './News'
import SecondEtra from './SecondEtra'
import { lazy } from 'react'
import girl from '../assets/girls2.png'
import books from '../assets/books.png'



const Secondary = () => {
  const AboutSecon = lazy(()=> import('./AboutSecon.jsx') );


   
  const dots = Array.from({length:15})

  return (
<main>


    {/* <section className='w-full flex  relative items-center justify-center h-screen overflow-hidden'>
      <div className='flex bg-black opacity-60 inset-0 absolute max-w-full max-h-full z-30 '></div>

        <div className='w-full flex flex-col items-center gap-8 justify-center absolute z-40'>
     <h1 className='font-[inter] w-100 md:w-150 text-white text-wrap text-3xl font-bold text-center md:text-5xl' >
        Delta State University Secondary School</h1>
<p className='font-[inter] text-center font-normal md:w-[50%] text-wrap md:text-xl/loose text-white  '>
    At Charterhouse Lagos, we deliver a forward-thinking education built on the British curriculum and evidence-based teaching. We empower
     skilled teachers with proven training methods to create a dynamic, respectful, and academically-focused environment 
      where children excel.
</p>

  <Button  className='w-42  md:text-lg md:h-18  mt-5 rounded-full'> Apply Now</Button>
       
        </div>
  <div className='w-full h-screen '>
    <img src={image} alt="" className='w-full h-screen' />
  </div>
   
        
    </section> */}



   <section className='w-full h-[90vh] flex  relative overflow-clip'>
       {/* { dots.map((_,index)=>(
      <span 
      key={index} 
      className='absolute z-20'
      style={{top:`${Math.random()* 100}%`,
              left:`${Math.random()* 100}%`}}
      >
        <span class="relative flex size-3">
  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
  <span class="relative inline-flex size-3 rounded-full bg-blue-600"></span>
</span> 
      </span>
    ) )} */}
     <div className=' w-1/2 h-full relative'>

     <div className='top-30 md:top-55 absolute z-10 px-8 '>
      <h1 className='font-bold text-black mix-blend-difference font-[inter] text-center md:text-left' >DELSU STAFF SCHOOL</h1>
      <h1 className='font-black font-[inter] md:w-[55%] mt-5 md:mt-1 text-center md:text-left text-3xl md:text-6xl/snug bg-gradient-to-r 
      bg-clip-text text-transparent from-blue-950 to-yellow-950'>BETTER FUTURE FOR YOUR KIDS</h1>
       <p className='w-full md:w-[80%]  mt-5 md:mt-1 text-center md:text-left font-[inter] text-gray-600 text-sm/normal'> 
   Delsu Staff Schools were established to provide a solid educational foundation for the children of university staff 
and the wider community. Rooted in a tradition of excellence, the schools are committed to nurturing intellectual growth,
 moral integrity, and lifelong learning. 
       </p>
    <div  className='flex gap-3 mt-5'>
      
     <div className='py-2 px-10  flex bg-gradient-to-r from-blue-950 to-amber-950
     items-center justify-center border-2 rounded-full border-blue-950 text-white
      hover:bg-blue-950 font-[inter] font-bold hover:animate-pulse cursor-pointer '> 
      Primary </div> 
        <div className='py-2 px-10  flex font-[inter] font-bold
         border-2 border-blue-950 rounded-full text-blue-950  transition-all duration-700
          hover:bg-gradient-to-br hover:from-blue-700 hover:to-amber-950 hover:text-white'>Secondary</div>
         </div> 
     </div>
     
     <div className='hidden md:block w-5 h-80 rounded-bl-full  bg-blue-950 float-right '>


     </div>


     </div>
<div className='hidden md:block absolute left-3/12 top-30  z-10 animate-bounce [animation-duration:10s] '> <img className='w-2xl' src={books} alt="" /></div>
     
     <div className='hidden md:block w-1/2 h-full bg-blue-950  hover-gradient'>
    

     <div className='w-full h-full md:bg-gradient-to-b  md:bg-blue-500/10 md:backdrop-blur-lg relative overflow-clip'>
      <div className='bg-white w-5 Hmovee rounded-br-full'> </div>
    
   
<div className='absolute bottom-0 -right-1'>
  <img  className='w-xl' src={girl} alt="" />
</div>
     </div>
     </div>

   </section>


{/*     
   <Suspense fallback={<loader/>}>
    <AboutSecon/>   
    </Suspense> 
    <AboutMis/>
    <SecondEtra/>
    <News/> */}
    </main>
  )
}

export default Secondary