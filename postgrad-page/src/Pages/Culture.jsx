import React, { useEffect, useState } from 'react'
import SecondHero from '../components/SecondHero'
import Divider from '../components/Divider'
import PortalCTA from '../components/PortalCTA'
import excur from '../../src/assets/images/excursion.jpg'


const culture = () => {
  const [cultureData, setCultureData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const INITIAL_DISPLAY_LIMIT = 3

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        const res = await fetch('/api/settings/cult')
        const data = await res.json()
        setCultureData(data)
      } catch (error) {
        console.error('Error fetching culture data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCulture()
  }, [])

  const displayedCulture = showAll ? cultureData : cultureData.slice(0, INITIAL_DISPLAY_LIMIT)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <section className='grid grid-rows-1 px-auto'>
        
        <SecondHero title='Our Field Trips'/>

        <Divider/>
        {cultureData.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-gray-500">No cultural activities available</div>
          </div>
        ) : (
         <div className='grid grid-rows-1 px-auto gap-10 '>

            {displayedCulture.map((data)=>(
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

        {cultureData.length > INITIAL_DISPLAY_LIMIT && (
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

export default culture