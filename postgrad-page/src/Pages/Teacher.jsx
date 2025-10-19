import React from 'react'
import SecondHero from '../components/SecondHero'
import { TabItem, Tabs } from 'flowbite-react'
import Junior from './Junior'
import Senior from './Senior'
import imageO from '../assets/images/blackb1.jpg'
import { TypeAnimation } from 'react-type-animation'
import imageT from '../assets/images/blackb2.jpg'

const Teacher = () => {
const data =[
    {
        image:'',
        
    }
]
    
  return (
    <section className='flex flex-col'>
   <div className='grid grid-cols-2 w-full'>  
    
     <div>  
         <div className=' relative'>

     <div className=' md:top-30 absolute z-10 px-8 '>
      <h1 className='font-bold text-black mix-blend-difference font-[inter] text-center md:text-left' >DELSU STAFF SCHOOL</h1>
      <h1 className='font-black font-[inter] md:w-[55%] mt-5 md:mt-1 text-center md:text-left text-3xl md:text-6xl/snug bg-gradient-to-r 
      bg-clip-text text-transparent from-blue-950 to-yellow-950'>JUNIOR SECONDARY SCHOOL</h1>
       <p className='w-full md:w-[80%]  mt-5 md:mt-1 text-center md:text-left font-[inter] text-gray-600 text-sm/normal'> 
   Delsu Staff Schools were established to provide a solid educational foundation for the children of university staff 
and the wider community. Rooted in a tradition of excellence, the schools are committed to nurturing intellectual growth,
 moral integrity, and lifelong learning. 
       </p>
    <div  className='flex gap-3 mt-5'>
      
    
        <div className='py-2 px-10  flex font-[inter] font-bold
         border-2 border-blue-950 rounded-full text-blue-950  transition-all duration-700
          hover:bg-gradient-to-br hover:from-blue-700 hover:to-amber-950 hover:text-white'>Apply Now</div>
         </div> 
     </div>
     
     <div className='hidden md:block w-5 h-80 rounded-bl-full  bg-blue-950 float-right '>


     </div>


     </div>
     </div>
     {/* <SecondHedivro/> */}

     <div className={`bg-slate-950 p-2 bg-cover bg-center bg-no-repeat justify-center items-center`} style={{
        backgroundImage:`url(${imageT})`
     }}>

      <div className={`bg-contain bg-no-repeat bg-center h-[80vh]  flex flex-col justify-center  py-15 items-center`} 
      style={{backgroundImage:`url(${imageO})`}}>
       <div className='text-white font-bold text-2xl text-center font-[MyChalkFont] underline underline-offset-8 w-[330px]'>List of Subjects</div>

    <TypeAnimation
      sequence={[
          `1.Mathematics 2.English Language 3.Basic Science  4.Social Studies  5.Basic Technology  6.Computer Science 7.Fine Arts
          8.Agricultural Science 9.Home Economics  10.C.R.S` ,
          1000, 
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '1.5em', display: 'inline-block', color:'white', 
            wordBreak:'keep-all', textWrap:'wrap', width:'230px', overflowWrap:'break-word',textAlign:'center', fontFamily:'MyChalkFont'
        }}
        repeat={Infinity}
        />

      
        
        </div>




    </div>
         
    

</div>

<div className='flex flex-col justify-center items-center w-full mt-10'>

    <div className='flex items-center justify-center'><h1 className='font-[inter] font-bold text-3xl'>Our Wonderful Teachers</h1></div> 

    <div className='grid grid-rows-1'>
 
 <div className='grid grid-cols-4'> 

    <div>
     
    </div>
 </div>

    </div>




</div>


    </section>
  )
}

export default Teacher