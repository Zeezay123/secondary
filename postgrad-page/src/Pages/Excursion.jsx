import React, { useEffect, useState } from 'react'
import SecondHero from '../components/SecondHero'
import Divider from '../components/Divider'
import PortalCTA from '../components/PortalCTA'
import excur from '../../src/assets/images/excursion.jpg'


const Excursion = () => {
  const [excursions, setExcursions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  const INITIAL_DISPLAY_LIMIT = 3

  useEffect(() => {
    const fetchExcursions = async () => {
      try {
        const res = await fetch('/api/settings/excur')
        const data = await res.json()
        if (res.ok) {
          setExcursions(data)
        } else {
          console.log('Cannot get excursions data')
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchExcursions()
  }, [])

  const displayedExcursions = showAll ? excursions : excursions.slice(0, INITIAL_DISPLAY_LIMIT)

  return (
    <section className='grid grid-rows-1 px-auto'>
        
        <SecondHero title='Our Field Trips'/>

        <Divider/>
        
        {loading ? (
          <div className='text-center py-20'>
            <p className='font-[inter] text-lg text-gray-600'>Loading excursions...</p>
          </div>
        ) : excursions.length === 0 ? (
          <div className='text-center py-20'>
            <p className='font-[inter] text-lg text-gray-600'>No excursions found</p>
          </div>
        ) : (
          <div className='grid grid-rows-1 px-auto gap-10 '>
            {displayedExcursions.map((data) => (
              <div key={data.id} className='grid grid-cols-2 px-30 my-5 relative ' > 
                <div className='w-[500px] h-96 object-cover'>
                  <img 
                    className='w-full h-full rounded object-cover' 
                    src={data.imageone ? `/uploads/${data.imageone}` : excur} 
                    alt={data.title} 
                  />
                </div>
                 
                <div className='flex flex-col justify-between border-t border-blue-700 border-b-6 py-5'> 
                  <div><h1 className='text-lg '>{data.subtitle || ''}</h1></div>

                  <div className='flex flex-col gap-5'>
                    <h2 className='text-4xl font-bold'>{data.title}</h2>
                    <div className='text-justify text-sm' dangerouslySetInnerHTML={{__html: data.intro || 'No description available'}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {excursions.length > INITIAL_DISPLAY_LIMIT && (
          <div className='flex justify-center mt-8 mb-12'>
            <button
              onClick={() => setShowAll(!showAll)}
              className='bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold'
            >
              {showAll ? 'View Less' : 'View More'}
            </button>
          </div>
        )}

        <PortalCTA />

        </section>
  )
}

export default Excursion