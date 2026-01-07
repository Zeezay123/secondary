import React, { useEffect, useState } from 'react'
import SecondHero from '../components/SecondHero'
import Divider from '../components/Divider'
import PortalCTA from '../components/PortalCTA'
import excur from '../../src/assets/images/excursion.jpg'


const Alumni = () => {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch('/api/alumni?limit=100')
        const result = await res.json()
        if (res.ok) {
          setAlumni(result.data)
        } else {
          console.log('Cannot get alumni data')
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAlumni()
  }, [])

  return (
    <section className='grid grid-rows-1 px-auto'>
        
        <SecondHero title='Our Distinguished Alumni'/>

        <Divider/>
        
        {loading ? (
          <div className='text-center mt-10 py-20'>
            <p className='font-[inter] text-lg text-gray-600'>Loading alumni...</p>
          </div>
        ) : alumni.length === 0 ? (
          <div className='text-center mt-10 py-20'>
            <p className='font-[inter] text-lg text-gray-600'>No alumni found</p>
          </div>
        ) : (
          <div className='grid grid-rows-1 px-auto gap-10 '>
            {alumni.map((alumnus) => (
              <div key={alumnus.id} className='grid grid-cols-2 px-30 my-5 relative ' > 
                <div className='w-[500px] h-96 object-cover'>
                  <img 
                    className='w-full h-full rounded object-cover' 
                    src={alumnus.image ? `/uploads/${alumnus.image}` : excur} 
                    alt={alumnus.name} 
                  />
                </div>
                 
                <div className='flex flex-col justify-between border-t border-blue-700 border-b-6 py-5'> 
                  <div><h1 className='text-lg '>{alumnus.role}</h1></div>

                  <div className='flex flex-col gap-5'>
                    <h2 className='text-4xl font-bold'>{alumnus.name}</h2>
                    <p className='text-justify text-sm' dangerouslySetInnerHTML={{__html: alumnus.description || 'No description available'}}></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <PortalCTA />

        </section>
  )
}

export default Alumni