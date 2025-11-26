import React, { Suspense, useEffect,useState } from "react";
import image from "../assets/images/school4.jpg";
import { Button } from "flowbite-react";
// import AboutSecon from './AboutSecon'
import AboutMis from "./AboutMis";
import News from "./News";
import SecondEtra from "./SecondEtra";
import { lazy } from "react";
import girl from "../assets/girls2.png";
import books from "../assets/books.png";

const Secondary = () => {
  const AboutSecon = lazy(() => import("./AboutSecon.jsx"));

  const [HomeFile, setHomeFile] = useState({title:'', subtitle:'', intro:''})
  const [errMsg, setErrMsg] = useState('')
  

useEffect(() => {
   const fetchData = async ()=>{
    const res = await fetch(`/api/settings/homepage/`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
    }
    })

    
    if(!res.ok) {
        console.log(res)
        console.log('could not get homepage')
        return

    }
    
    const data = await res.json()


    console.log(data)
    try {
         
         setHomeFile({title:data.title, subtitle:data.subtitle, intro:data.intro})
        
    } catch (error) {
        setErrMsg(error.message)
    }
   



   }

   fetchData()

  
}, [])

  const dots = Array.from({ length: 15 });
  return (
    <main>
      <section className="w-full h-[70vh] md:h-[100vh] flex relative overflow-clip ">
        {/* { dots.map((_,index)=>( <span key={index} className='absolute z-20' style={{top:${Math.random()* 100}%, left:${Math.random()* 100}%}} >
      <span class="relative flex size-3"> <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
       <span class="relative inline-flex size-3 rounded-full bg-blue-600"></span> </span> </span> ) )} */}
        <div className=" md:w-1/2 h-full md:min-[90vh] relative">
          
          <div className="top-20 md:top-1/3 absolute z-10 px-8 ">
         
            <h1 className="font-bold text-black mix-blend-difference font-[inter] text-center md:text-left">
            {  HomeFile?.title || 'DLSU STAFF SCHOOL' }
            </h1>
            <h1 className="font-black font-[inter] md:w-[55%] mt-5 md:mt-1 text-center md:text-left text-3xl md:text-6xl/snug bg-gradient-to-r bg-clip-text text-transparent from-blue-950 to-yellow-950">
              { HomeFile?.subtitle || 'Loading'}
            </h1>
            <p className="w-full md:w-[80%] mt-5 md:mt-1 text-center md:text-left font-[inter] text-gray-600 text-sm/normal" 
            dangerouslySetInnerHTML={{__html:HomeFile?.intro || "Loading"}} /> 
            <div className="flex gap-3 mt-5">
           
              <div className="py-2 px-10 flex bg-gradient-to-r from-blue-950 to-amber-950 items-center justify-center border-2 rounded-full border-blue-950 text-white hover:bg-blue-950 font-[inter] font-bold hover:animate-pulse cursor-pointer ">
             
                Primary
              </div>
              <div className="py-2 px-10 flex font-[inter] font-bold border-2 border-blue-950 rounded-full text-blue-950 transition-all duration-700 hover:bg-gradient-to-br hover:from-blue-700 hover:to-amber-950 hover:text-white">
                Secondary
              </div>
            </div>
          </div>
          <div className="hidden md:block w-5 h-80 rounded-bl-full bg-blue-950 float-right ">
         
          </div>
        </div>
        <div className="hidden md:block absolute left-3/12 top-30 z-10 animate-bounce [animation-duration:10s] ">
       
          <img className="w-2xl" src={books} alt="" />
        </div>
        <div className="hidden md:block w-1/2 h-full bg-blue-950 hover-gradient">
          
          <div className="w-full h-full md:bg-gradient-to-b md:bg-blue-500/10 md:backdrop-blur-lg relative overflow-clip">
            
            <div className="bg-white w-5 Hmovee rounded-br-full"> </div>
            <div className="absolute bottom-0 -right-1">
              
              <img className="w-xl" src={girl} alt="" />
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
  );
};

export default Secondary;
