import React, { useEffect, useState } from "react";
import trialDB from "../../../triadb";
import imagetwo from '../assets/images/nbunetvc.png'
import { Card } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import SecondHero from '../components/SecondHero.jsx'

const AboutUs = () => {
  const [data, setData] = useState(null);

// useEffect(() => {
  
// const fetchdata = async ()=>{
//   try {
     
//      const res = await fetch('/api/settings/about')
//      const data = await res.json()
//      if(res.ok){
//       setData(data)
//       return
//      }

//      if(!res.ok){
//       console.log('cant get response')
//      }

//   } catch (error) {
//     console.log(error.message)
//   }
// }

// fetchdata()
     
// }, [])


const title = data?.title || ''




return(
  <section className="">

<SecondHero/>
  
<div className="space-y-16 px-4 md:px-20 py-10">

  {/* Values */}
  <section className="border-t border-blue-950 pt-6">
    <h1 className="font-[inter] font-bold text-2xl sm:text-3xl md:text-4xl text-blue-950">
      Values
    </h1>
    <p className="font-normal text-base sm:text-lg md:text-2xl mt-6 text-blue-900 text-center md:text-left">
      Excellence, Respect, Integrity, Courtesy, Service, Wellbeing
    </p>
  </section>

  {/* Vision and Mission */}
  <section className="border-t-4 border-blue-950 pt-6">
    <h1 className="font-[inter] font-bold text-2xl sm:text-3xl md:text-4xl text-blue-950">
      Vision and Mission
    </h1>

    <div className="flex flex-col items-center text-blue-900 mt-6 space-y-10">
      <p className="max-w-4xl text-justify text-base sm:text-lg md:text-2xl leading-relaxed">
        <strong>Vision:</strong> Charterhouse Lagos aspires to be Nigeria’s foremost educational institution, known for
        academic excellence and all-around student development. We are committed to offering an unmatched educational
        experience, nurturing well-rounded individuals poised for global leadership. Our goal is to shape proactive
        contributors, ready to make a significant impact in a better, more connected world.
      </p>
      <p className="max-w-4xl text-justify text-base sm:text-lg md:text-2xl leading-relaxed">
        <strong>Mission:</strong> Charterhouse Lagos delivers a transformative, holistic education that fosters academic
        excellence, character development, and global citizenship. We empower students with skills, values, and
        opportunities, preparing them to thrive in a diverse and dynamic world while upholding ethical standards and
        making a positive societal impact.
      </p>
    </div>
  </section>

  {/* Learning Principles */}
  <section className="border-t-4 border-blue-950 pt-6">
    <h1 className="font-[inter] font-bold text-2xl sm:text-3xl md:text-4xl text-blue-950">
      Learning Principles
    </h1>

    <ul className="max-w-4xl mx-auto text-blue-900 list-disc list-inside mt-6 space-y-4 text-base sm:text-lg md:text-2xl leading-relaxed">
      <li>Learning needs to be purposeful and directed.</li>
      <li>Learning needs to be adapted to each individual to support their needs.</li>
      <li>Learning is contextual.</li>
    </ul>

    <div className="font-[inter] font-bold text-lg md:text-xl text-blue-950 mt-10 md:ml-10">
      Two Key Outcomes:
    </div>

    <ol className="max-w-4xl mx-auto list-decimal list-inside mt-6 space-y-4 text-blue-900 text-base sm:text-lg md:text-2xl leading-relaxed">
      <li>The long-term retention of valuable knowledge, concepts, and skills.</li>
      <li>The ability to transfer what has been retained into different contexts and situations.</li>
    </ol>
  </section>

  {/* Learning Drivers */}
  
  <section className="border-t border-blue-950 pt-6">
    <h1 className="font-[inter] font-bold text-2xl md:text-4xl text-blue-950">
      Learning Drivers
    </h1>
    <p className="font-normal text-base sm:text-lg md:text-2xl mt-6 text-blue-900 text-center md:text-left">
      Sustainability, Technology, Morality, Future Employability and Wellbeing.
    </p>
  </section>

</div>


  {/* <div className="bg-gray-50 text-gray-800 mt-20">

      <section className="py-16 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={`/uploads/${data?.vcimage}`}
          alt="Vice Chancellor"
          className="rounded-2xl shadow-md w-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold mb-4">Message from the Vice-Chancellor</h2>
          <p className="text-gray-700 leading-relaxed italic" dangerouslySetInnerHTML={{__html: data?.vcMessage || 'loading'}}></p>
          <p className="mt-4 font-semibold">— Vice-Chancellor, DELSU</p>
        </div>
      </section>
      <section className="py-16 bg-white max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Message from the Director</h2>
          <p className="text-gray-700 leading-relaxed italic" dangerouslySetInnerHTML={{__html: data?.directorMessage || 'loading'}}></p>
          <p className="mt-4 font-semibold">— Director, Postgraduate School</p>
        </div>
        <img
          src={`/uploads/${data?.directorimage}`}
          alt="Director"
          className="rounded-2xl shadow-md w-full object-cover"
        />
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-bold mb-3">Mission</h3>
              <p dangerouslySetInnerHTML={{__html: data?.mission || 'loading'}}></p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-bold mb-3">Vision</h3>
              <p dangerouslySetInnerHTML={{__html: data?.mission || 'loading'}} ></p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-bold mb-3">Philosophy</h3>
              <p dangerouslySetInnerHTML={{__html: data?.philosophy || 'loading'}}></p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose DELSU?</h2>
        <ul className="grid md:grid-cols-2 gap-6 text-gray-700 list-disc pl-6">
          <li>Wide range of postgraduate programmes across faculties.</li>
          <li>Experienced lecturers and supervisors with research expertise.</li>
          <li>Conducive learning environment with modern facilities.</li>
          <li>Opportunities for national and international collaborations.</li>
          <li>A community that nurtures leaders, innovators, and problem-solvers.</li>
        </ul>
      </section>
    </div> */}
  <CallToAction/> 

  </section>
)


}
export default AboutUs;
