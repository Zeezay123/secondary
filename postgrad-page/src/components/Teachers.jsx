import React from 'react'
import image from '../assets/girls2.png'

const Teachers = () => {

const data= [
    {
        image:image,
        name: 'Teacher numberOne',
        post: 'Principal'
    },
        {
        image:image,
        name: 'Teacher numberTwo',
        post: 'Principal'
    },
        {
        image:image,
        name: 'Teacher numberThree',
        post: 'Principal'
    },  
      {
        image:image,
        name: 'Teacher numberFour',
        post: 'Principal'
    },
]

  return (
    <section className='grid grid-rows-1 p-3 md:p-18 items-center justify-center'> 
       <div className='flex flex-col items-center justify-center p-3 gap-5'>
        
  <h1 className='bg-blue-200 font-[inter] font-semibold px-4 py-1 rounded-full text-xs text-black ' >  Our Staffs </h1>
        <h2 className='font-[inter] text-3xl font-semibold'> DELSU Staff School Profile</h2>


        </div>
       
       <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mt-5 md:mt-15'>

        {data.map((data,index)=>(
         
        <div key={index} className='flex flex-col gap-3'> <div className='relative bg-blue-950 h-[32rem] object-cover rounded-2xl' key={index}>
             <div className='absolute inset-0 bg-black/10 rounded-2xl'></div>
             <img src={data.image} alt="" className='w-full h-full object-cover rounded-2xl' />
              </div>
      
      <div className='p-1'>
        <h1 className='font-semibold font-[inter] text-black text-sm '>{data.name}</h1>
        <h5 className='font-[inter] text-xs'>{data.post}</h5>
      </div>

       </div>  ))}

       </div>

    </section>
  )
}

export default Teachers