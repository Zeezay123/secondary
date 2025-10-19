import { Card } from 'flowbite-react'
import React from 'react'

const AboutMis = () => {

  const data = [
     {   
        name:'Mission',
        content:`To prepare students for 
        higher education and future life 
        by providing them with character
         and intellectual attributes that 
         make them God fearing, problem solvers
          and patriotic citizens.`,
     },

       {
        name:'Vision', 
        content:`To inspire and educate students to enable them 
        achieve their maximum potential. To produce an all round mature, 
        confident and independent students imbued with character, 
        intellect and Godliness.`,
       },
{       name:'Philosophy',
        content:`The total education that develops a whole man mentally,
         physically, and morally; embracing the time honored values 
         that promote social responsibility and personal integrity in all aspects.  `
}
  ]

  return (
    <section className='flex flex-col md:mt-20 md:flex-row item-center justify-center px-5 md:px-8 gap-12'>

      {data.map((data)=>(
        <Card className='max-w-96'>
            <h5 className='text-2xl font-bold font-[inter] tracking-tight text-gray-900 dark:text-white'>{data.name}</h5>
            <p className='font-normal text-gray-700 dark:text-gray-400 font-[inter]'>{data.content}</p>
        </Card>
      ))}
    
    </section>
  )
}

export default AboutMis