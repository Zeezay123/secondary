import React from 'react'
import two from '../assets/images/imagetwo.jpg'
import three from '../assets/images/imagethree.png'
import four from '../assets/images/imagefour.jpg'
import five from '../assets/images/imagefive.jpg'
import classroom from '../assets/images/classroom1.jpg'
import classroomTwo from '../assets/images/class1.png'


const SecondEtra = () => {

    const data = [
        {
            name:'Sky divining',
            image:two
        },
         {
            name:'Sky divining',
            image:two
        },
         {
            name:'Sky divining',
            image:two
        },
         {
            name:'Sky divining',
            image:two
        },
         {
            name:'Sky divining',
            image:two
        },
         {
            name:'Sky divining',
            image:two
        },
    ]

  return (
    <main className='flex flex-col mt-10 md:mt-30'>
   <div className='flex flex-col items-center justify-center w-full gap-2 md:gap-4'> 
    <h5 className='text-gray-500'> extra-curricular activities </h5>
    <h1 className='font-[inter] font-bold text-2xl md:text-4xl'>Other fun things we do</h1>

    <p className=' md:w-[70%] py-5 px-4 text-center md:my-10'> We are passionate about getting your child involved in after school activities that challenge him or her to explore creative, 
        social and even potential career interests. Our large sports grounds and swimming pool 
        facilities offer a truly unique environment for extracurricular development. 
        Our extracurricular activities includes, but not limited to:
        </p>


    </div>
    <section className='grid justify-items-center items grid-cols-1 gap-1 md:grid-cols-3 md:px-50 '>
        {data.map((data,index)=>(
            <div key={index} className='flex flex-col items-center justify-center gap-2 mb-5'>
                <div className='w-84 h-54 object-cover rounded-2xl'>
                     <img src={data.image} alt="" className=' rounded-3xl w-full h-full' loading='lazy' /></div>
                <h2 className='font-[inter] font-bold text-black text-lg md:text-2xl'>{data.name}</h2>
            </div>
        ))}
    </section>
        </main>
  )
}

export default SecondEtra