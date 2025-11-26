import React from 'react'
import SecondHero from '../components/SecondHero'
import { TypeAnimation } from 'react-type-animation'
import imageO from '../assets/images/blackb1.jpg'
import imageT from '../assets/images/blackb2.jpg'
import tee1 from '../assets/teacher1.jpg'
import tee2 from '../assets/tee2.jpg'
import tee3 from '../assets/t3.jpg'
import tee4 from '../assets/e5.jpg'
import Curr from '../components/Curr'
import CallToAction from '../components/CallToAction'

const Prefects = () => {
  const data = [
    { image: tee1, title: 'Biology Teacher', name: 'Precious' },
    { image: tee2, title: 'Chemistry Teacher', name: 'Michael' },
    { image: tee3, title: 'Physics Teacher', name: 'Joy' },
    { image: tee4, title: 'Mathematics Teacher', name: 'John' },
    { image: tee1, title: 'English Teacher', name: 'Sophia' },
    { image: tee2, title: 'ICT Teacher', name: 'David' },
    { image: tee3, title: 'Fine Arts Teacher', name: 'Grace' },
    { image: tee4, title: 'Agricultural Science Teacher', name: 'Tunde' },
  ]

  return (
    <section className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Left Text */}
        <div className="relative flex flex-col justify-center items-center md:items-start p-6 md:p-12">
          <div className="z-10 max-w-xl text-center md:text-left">
            <h1 className="font-bold text-black font-[inter] text-lg md:text-xl mb-3">
              DELSU STAFF SCHOOL
            </h1>
            <h2 className="font-black font-[inter] text-3xl md:text-6xl bg-gradient-to-r bg-clip-text text-transparent from-blue-950 to-yellow-900">
              Our Curriculum and Staff
            </h2>
            <p className="mt-5 text-gray-700 text-sm md:text-base leading-relaxed">
              Delsu Staff Schools were established to provide a solid educational foundation for
              the children of university staff and the wider community. Rooted in a tradition of
              excellence, the schools nurture intellectual growth, moral integrity, and lifelong
              learning.
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                className="mt-6 py-2 px-8 font-[inter] font-bold border-2 border-blue-950
                rounded-full text-blue-950 transition-all duration-500
                hover:bg-gradient-to-br hover:from-blue-700 hover:to-amber-900 hover:text-white"
              >
                Apply Now
              </button>
            </div>
          </div>
          <div className="hidden md:block absolute right-0 top-0 w-10 h-80 rounded-bl-full bg-blue-950"></div>
        </div>

        {/* Right Image Section */}
        <div
          className="relative bg-slate-950 bg-cover bg-center bg-no-repeat flex justify-center items-center p-5"
          style={{ backgroundImage: `url(${imageT})` }}
        >
          <div
            className="bg-contain bg-center bg-no-repeat h-[60vh] md:h-[80vh] w-full flex flex-col justify-center items-center"
            style={{ backgroundImage: `url(${imageO})` }}
          >
            <div className="text-white font-bold text-2xl text-center font-[MyChalkFont] underline underline-offset-8">
              List of Subjects
            </div>

            <TypeAnimation
              sequence={[
                `1. Mathematics  2. English  3. Basic Science  4. Social Studies  5. Basic Tech  
                 6. Computer Science  7. Fine Arts  8. Agric Science  9. Home Economics  10. CRS`,
                2000,
              ]}
              wrapper="span"
              speed={60}
              style={{
                fontSize: '1.2em',
                display: 'inline-block',
                color: 'white',
                textAlign: 'center',
                marginTop: '1.5rem',
                fontFamily: 'MyChalkFont',
                maxWidth: '80%',
                lineHeight: '1.8rem',
              }}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>

      {/* Curriculum Section */}
      <div className="mt-16 px-5 md:px-20">
        <div className="text-center mb-8">
          <h1 className="font-[inter] font-bold text-2xl md:text-4xl text-blue-950">
            Our Curriculum:
            <br />
            <span className="text-black">Broad, Balanced, Future-Ready</span>
          </h1>
        </div>
        <Curr />
      </div>

      <div className="mt-20 px-5 md:px-20 py-5">
        <div className="text-center mb-8">
          <h1 className="font-[inter] font-bold text-2xl md:text-4xl text-blue-950">
            Our Wonderful Teachers
          </h1>
          <p className="font-[inter] text-gray-700 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Get to know the passionate and experienced educators who create a nurturing, fun, and
            inspiring environment for every child at Gigglio!
          </p>
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 place-items-center">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col w-full items-center bg-white shadow-md hover:shadow-lg rounded-2xl p-3 transition"
            >
              <div className="w-66 h-66  rounded-2xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <h2 className="font-[inter] font-bold text-lg mt-3 text-blue-950">
                {item.name}
              </h2>
              <p className="font-[inter] text-sm text-gray-700">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <CallToAction/>
    </section>
  )
}

export default Prefects
