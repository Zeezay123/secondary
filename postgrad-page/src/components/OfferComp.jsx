import React from 'react'
import {ArrowRightIcon, Card,createTheme} from 'flowbite-react'
import club from '../../src/assets/images/club.jpg'
import cultural from '../../src/assets/images/cultural.jpg'
import excur from '../../src/assets/images/excursion.jpg'
import art from '../../src/assets/images/arts.jpg'
import quiz from '../../src/assets/images/quiz.jpg'
import inter from '../../src/assets/images/interhouse.jpg'


import classroom from '../../src/assets/images/classroom1.jpg'
import classroomTwo from '../../src/assets/images/class1.png'
import { useState } from 'react'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const OfferComp = () => {

const [isHoverd, SetIsHovered] = useState(false)




    const cardData = [

    {
        title:'Club',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety.`,
        image: club,
        link:'/clubs'
        
    },
     {
        title:'Quiz',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. `,
        image: cultural,
        link:'/quiz'
        
    },
    
    
    {
        title:'Interhouse',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety.`,
        image: excur,
        link:'/interhouse'
        
    },
    
    {
        title:'Excursion',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. `,
        image: art,
        link:'/travel'

        
    },
    
    {
        title:'Arts and Craft',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety.`,
        image: quiz,
        link:'/arts' 
        
    },

      {
        title:'Cultural Dance',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. `,
        image: inter,
        link:'/culture' 
        
    },
]
  return (

    <section className='grid grid-rows-1 md:max-w-[90rem] gap-5 p-3 mx-auto'> 
  
  <div className='flex flex-col items-center justify-center gap-5'>
    
    <h1 className='font-semibold font-[inter] text-xs bg-blue-300 p-2 rounded-full w-fit'> Our Programmes </h1> 
    <h2 className='font-[inter] text-center font-semibold w-fit text-3xl'> Where Creativity is the first Choice</h2>
    <h2 className='font-normal mb-8 w-fit md:w-[500px] text-center font-[inter]'> We channel your support into powerful, community-led programs that protect and uplift the most vulnerable children.</h2>
  </div>

    <div className= 'flex flex-wrap justify-center gap-3 w-full' >

   {cardData.map((card,index)=>(

    <Link className={`overflow-hidden group relative rounded-2xl 
     ${index == 0 || index == 4 ? 'w-full md:w-[700px] h-[32rem]'  : 'w-full md:w-[20.5rem] h-[32rem]'}`} key={index} 
     
    to={card.link}
    
     >

     <div
     className='inset-0 bg-cover bg-no-repeat  bg-center transition-transform duration-700 group-hover:scale-110  absolute'
     style={{backgroundImage: `url(${card.image})` }}
     ></div> 
      {/* <img src={card.image}  alt="" className="w-full h-full  object-cover rounded-2xl hover:scale-110 transition-transform duration-300" /> */}
       <div className='bg-blue-950/30 absolute w-full h-full rounded-2xl'>

       </div> 

     <div className='flex justify-between absolute z-10 flex-col  inset-0 '>
      <div className='text-white font-[inter] font-bold text-2xl p-5 '> {card.title}</div> 
     
     <div className='flex flex-col p-5 gap-3 opacity-0 transition-opacity duration-700 group-hover:opacity-100  group-hover:cursor-pointer '>
       <div className='text-white font-[inter] text-sm font-normal  wrap-break-word line-clamp-2 '>
        {card.content}
      </div>

      <Link to={card.link} className='flex items-center text-sm  text-white font-[inter] font-semibold gap-5'> 
         See Activity <FaArrowRightFromBracket/> </Link>
      </div> 
      </div> 
    </Link>


   ))}





    </div> 
    </section>
  )
}

export default OfferComp