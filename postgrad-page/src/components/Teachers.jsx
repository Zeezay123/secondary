import React, { useEffect, useState } from 'react'
import image from '../assets/girls2.png'
import PortalCTA from './PortalCTA'
import SecondHero from './SecondHero'

const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/teachers?limit=100')
        const result = await res.json()
        if (res.ok) {
          setTeachers(result.data)
        } else {
          console.log('Cannot get teachers data')
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  return (
  <div> 
<SecondHero title='Meet Our Dedicated Educators' content='The brains behind our success and your child’s growth'/>
    <section className='grid grid-rows-1 p-3 md:p-18 items-center justify-center'> 

 
       
       {loading ? (
         <div className='text-center mt-10'>
           <p className='font-[inter] text-lg text-gray-600'>Loading teachers...</p>
         </div>
       ) : teachers.length === 0 ? (
         <div className='text-center mt-10'>
           <p className='font-[inter] text-lg text-gray-600'>No teachers found</p>
         </div>
       ) : (
         <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mt-5 md:mt-15'>
          {teachers.map((teacher) => (
            <div key={teacher.id} className='flex flex-col gap-3'>
              <div className='relative bg-blue-950 h-[32rem] object-cover rounded-2xl'>
                <div className='absolute inset-0 bg-black/10 rounded-2xl'></div>
                <img 
                  src={teacher.image ? `/uploads/${teacher.image}` : image} 
                  alt={teacher.name} 
                  className='w-full h-full object-cover rounded-2xl' 
                />
              </div>
        
              <div className='p-1'>
                <h1 className='font-semibold font-[inter] text-black text-sm '>{teacher.name}</h1>
                <h5 className='font-[inter] text-xs'>{teacher.role}</h5>
              </div>
            </div>
          ))}
         </div>
       )}


    </section>
    <PortalCTA/>
    </div>
  )
}

export default Teachers