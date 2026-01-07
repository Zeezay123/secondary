import React, { useEffect, useState } from 'react'
import SecondHero from '../components/SecondHero'
import CallToAction from '../components/CallToAction'
import PortalCTA from '../components/PortalCTA'
import image from '../assets/principal.jpg'

const Principal = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const res = await fetch('/api/directory/principal')
        const data = await res.json()
        if (res.ok) {
          setData(data)
        } else {
          console.log('Cannot get principal data')
        }
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchPrincipal()
  }, [])

  return (
    <section className="flex flex-col">

      <SecondHero
        title="Leadership"
        content="Led by Director of Education John Todd, our respected leadership team brings together a wealth of educational experience."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16  mx-auto px-5 md:px-20 mt-16 w-full max-w-7xl">


        <div className="w-full h-[20rem] md:h-[40rem]  rounded-3xl overflow-hidden mt-10">
          <img
            src={data?.image ? `/uploads/${data.image}` : image}
            alt="Principal"
            className="w-full h-full rounded-3xl object-cover"
          />
        </div>


        <div className="flex flex-col justify-center border-t-blue-800 border-t-2 py-5">
          <h2 className="font-[inter] font-normal text-xl text-blue-900 mt-2">
            Principal / DELSU Secondary School
          </h2>
          <h1 className="font-[inter] font-semibold text-3xl pb-2 md:text-4xl pt-5 md:pt-15 md:pb-8 text-blue-950">
            {data?.name || 'Loading...'}
          </h1>

          <div className="text-justify font-normal text-sm md:text-base leading-relaxed text-gray-800" dangerouslySetInnerHTML={{__html: data?.message || 'Loading principal message...'}}>
          </div>
        </div>
           

      </div>

      <PortalCTA />
      <CallToAction />

    </section>
  )
}

export default Principal




