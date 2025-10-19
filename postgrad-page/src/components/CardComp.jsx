import { Card } from 'flowbite-react'
import React from 'react'
import CardCaro from './CardCaro'

const CardComp = () => {


cardData = [

    {
        title:'Learning Outcomes',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. We provide an environment that 
        enables our students to thrive and optimize their abilities`
        
    },
    
    {
        title:'Learning Outcomes',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. We provide an environment that 
        enables our students to thrive and optimize their abilities`
        
    },
    
    {
        title:'Learning Outcomes',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. We provide an environment that 
        enables our students to thrive and optimize their abilities`
        
    },
    
    {
        title:'Learning Outcomes',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. We provide an environment that 
        enables our students to thrive and optimize their abilities`
        
    },
]


  return (
    
<CardCaro>
    {cardData.map((card,index)=>(
          
               <div key={index} >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{
                    card.title}</h5>

                    <p className="font-normal text-gray-700 dark:text-gray-400">{card.content}</p>
               </div>
            
        ))}


</CardCaro>
    
    
  )
}

export default CardComp


