import React, { useEffect, useRef, useState } from 'react'
import { FaChevronRight, FaChevronUp } from 'react-icons/fa'

const Accordion = () => {

    const [togg, setTogg]= useState('')

    const AccordRef = useRef({})
    
    // useEffect(()=>{ console.log(togg) },[togg])

    const handleTogg =(index)=>{
      setTogg((p)=> (index == p ? null : index) )
    }

    const data =[
        {
           title: 'What documents are needed for admission?',
           content: `Honoring the achievements, resilience,
            and unity of the DELSU Secondary School Class of 2024 — a remarkable chapter in our school’s story`
        },
        {
           title: 'What documents are needed for admission?',
           content: `Honoring the achievements, resilience,
            and unity of the DELSU Secondary School Class of 2024 — a remarkable chapter in our school’s story`
        },
         {
           title: 'What documents are needed for admission?',
           content: `Honoring the achievements, resilience,
            and unity of the DELSU Secondary School Class of 2024 — a remarkable chapter in our school’s story`
        },
 {
           title: 'What documents are needed for admission?',
           content: `Honoring the achievements, resilience,
            and unity of the DELSU Secondary School Class of 2024 — a remarkable chapter in our school’s story`
        },
           {
           title: 'What documents are needed for admission?',
           content: `Honoring the achievements, resilience,
            and unity of the DELSU Secondary School Class of 2024 — a remarkable chapter in our school’s story`
        },       
    ]
  return (
    <section className='grid grid-rows-1 md:p-18 gap-5'>
         
         {data.map((data,index)=>(
         
         <div 

         ref={(el)=> AccordRef.current[index] = el}

        
         
         className='flex flex-col items-center justify-center border-[1px] border-blue-300 rounded-lg py-3 px-8 w-fit transition-all duration-1000' key={index} onClick={()=>handleTogg(index)}> 
            <div className='flex justify-between  font-[inter] font-bold text-sm text-black items-center w-full transition-transform duration-1000'> 
              {data.title} 
               <FaChevronUp size={12} className={`text-blue-700 transition-all duration-1000 ${ togg == index ? ``: `rotate-180`}`} /> </div>
            
            
              <div className={`w-fit font-[inter] py-2 flex items-center justify-center text-sm transition-all duration-1000 ease-in-out`}
            
            
          style={{maxHeight: togg == index  ? `${AccordRef.current[index]?.scrollHeight}px`: '0px',
                opacity: togg == index ? 1 : 0}}
              > {data.content}</div>
         </div>
   
         ))}

    </section>
  )
}

export default Accordion