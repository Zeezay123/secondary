import React from 'react'
import imageOne from '../assets/images/abrak gate 1.png'

const SecondHero = ({ title, content }) => {
  return (
    <section className="bg-blue-950 py-20 px-6 md:px-20">
      <header className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-start justify-center w-full">
        {/* Left Title Section */}
        <div className="border-t-2 w-full border-white pt-4">
          <h1 className="font-[inter] text-white font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-center md:text-left">
            {title || 'Our Value Framework'}
          </h1>
        </div>

        {/* Right Content Section */}
        <div className="border-t-2 border-white pt-4 md:pt-6 flex justify-center md:justify-start">
          <h2 className="font-[inter] text-white text-base sm:text-lg md:text-2xl leading-relaxed max-w-[90%] text-center md:text-left">
            {content ||
              'These are the guiding statements that help us make decisions about everything that we do.'}
          </h2>
        </div>
      </header>

      <div className="bg-white w-full h-[2px] mt-10 md:mt-16"></div>
    </section>
  )
}

export default SecondHero
