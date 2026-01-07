import React from 'react'
import image from '../assets/school2.jpg'
import { FaRightFromBracket } from 'react-icons/fa6'
import { Link } from 'react-router-dom'



const PortalComp = () => {
 

  const data = [
    {
      image:image,
      title:'DELSU Secondary School Class of 2024 Yearbook',
      content:`From first days to final goodbyes, 
      the Class of 2024 stands as
       a symbol of growth, laughter, and the dreams that will shape tomorrow`,
    },
     {
      image:image,
      title:'DELSU Secondary School Class of 2024 Yearbook',
      content:`From first days to final goodbyes, 
      the Class of 2024 stands as
       a symbol of growth, laughter, and the dreams that will shape tomorrow`,
    },
     {
      image:image,
      title:'DELSU Secondary School Class of 2024 Yearbook',
      content:`From first days to final goodbyes, 
      the Class of 2024 stands as
       a symbol of growth, laughter, and the dreams that will shape tomorrow`,
    },
     {
      image:image,
      title:'DELSU Secondary School Class of 2024 Yearbook',
      content:`From first days to final goodbyes, 
      the Class of 2024 stands as
       a symbol of growth, laughter, and the dreams that will shape tomorrow`,
    },
     {
      image:image,
      title:'DELSU Secondary School Class of 2024 Yearbook',
      content:`From first days to final goodbyes, 
      the Class of 2024 stands as
       a symbol of growth, laughter, and the dreams that will shape tomorrow`,
    },
     {
      image:image,
      title:'DELSU Secondary School Class of 2024 Yearbook',
      content:`From first days to final goodbyes, 
      the Class of 2024 stands as
       a symbol of growth, laughter, and the dreams that will shape tomorrow`,
    },
     {
      image:image,
      title:'DELSU Secondary School Class of 2024 Yearbook',
      content:`From first days to final goodbyes, 
      the Class of 2024 stands as
       a symbol of growth, laughter, and the dreams that will shape tomorrow`,
    },
     {
      image:image,
      title:'DELSU Secondary School Class of 2024 Yearbook',
      content:`From first days to final goodbyes, 
      the Class of 2024 stands as
       a symbol of growth, laughter, and the dreams that will shape tomorrow`,
    }
  ]





  return (
    <section className='grid grid-row items-center p-3  mt-10 md:px-18 gap-5 md:mt-20 '>

      <div className='flex flex-col gap-5 text-black items-center justify-center'>
        <h1 className='font-[inter] font-semibold bg-blue-950 text-xs text-blue-200 w-fit py-2 px-4 rounded-full flex items-center justify-center' > Our Time Capsule</h1>
        <h2 className='font-[inter] text-left font-semibold md:text-4xl '> Memories and Moments That Shaped Our Journey </h2>
        <p className='font-[inter] text-left font-normal text-sm md:w-[40%] line-clamp-2 text-gray-600'> Take a nostalgic journey through the moments that defined our year — the faces that inspired us, 
          the friendships that strengthened us, and the achievements that remind us how far we’ve come together </p>
      </div>

  <div className='flex overflow-x-scroll overflow-auto gap-5 pb-10 md:mt-10'>

{data.map((data,index)=>(
 <div className='grid grid-rows-1 border-r-[1px] border-slate-200 gap-2 mt-5 px-5 text-black' key={index}> 
 <div className='relative'>
 <div className='w-96 h-72 rounded-2xl overflow-hidden object-cover'> <img src={data.image}  alt="" className='w-full h-full rounded-2xl object-cover' /></div>
  <div className='bg-black/30 absolute z-10 inset-0 rounded-2xl'> </div>
 </div>
 
 <h1 className='mt-3 font-[inter] font-semibold text-lg'> {data.title}</h1>
 <p className='font-[inter] text-sm line-clamp-2 wrap-break-word'> {data.content}</p>
 <div className='flex items-center gap-2 font-bold font-[inter] text-black text-xs'> 
 <Link to={`https://online.fliphtml5.com/cjnla/hjkg/#p=4`}>  Read More </Link><FaRightFromBracket size={10}/> </div>
 </div>
))}

  </div>

   

    </section>
  )
}

export default PortalComp