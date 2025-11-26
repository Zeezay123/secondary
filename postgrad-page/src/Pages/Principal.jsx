import React from 'react'
import SecondHero from '../components/SecondHero'
import CallToAction from '../components/CallToAction'
import image from '../assets/principal.jpg'

const Principal = () => {
  return (
    <section className="flex flex-col">

      <SecondHero
        title="Leadership"
        content="Led by Director of Education John Todd, our respected leadership team brings together a wealth of educational experience."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16  mx-auto px-5 md:px-20 mt-16 w-full max-w-7xl">


        <div className="w-full h-[20rem] md:h-[40rem]  rounded-3xl overflow-hidden mt-10">
          <img
            src={image}
            alt="Principal"
            className="w-full h-full rounded-3xl object-cover"
          />
        </div>


        <div className="flex flex-col justify-center border-t-blue-800 border-t-2 py-5">
          <h2 className="font-[inter] font-normal text-xl text-blue-900 mt-2">
            Principal / DELSU Secondary School
          </h2>
          <h1 className="font-[inter] font-semibold text-3xl pb-2 md:text-4xl pt-5 md:pt-15 md:pb-8 text-blue-950">
            Dr. Nathan Something
          </h1>

          <p className="text-justify font-normal text-sm md:text-base leading-relaxed text-gray-800">
             Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
      Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
      Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
      Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
      Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
          </p>
        </div>

      </div>

      <CallToAction />

    </section>
  )
}

export default Principal



