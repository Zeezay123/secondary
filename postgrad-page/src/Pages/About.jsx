import React, { useEffect, useState } from "react";
import trialDB from "../../../triadb";
import imagetwo from '../assets/images/nbunetvc.png'
import { Card } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import SecondHero from '../components/SecondHero.jsx'
import PortalCTA from '../components/PortalCTA'

const AboutUs = () => {
  const [data, setData] = useState(null);

useEffect(() => {
  
const fetchdata = async ()=>{
  try {
     
     const res = await fetch('/api/settings/about')
     const data = await res.json()
     if(res.ok){
      setData(data)
      return
     }

     if(!res.ok){
      console.log('cant get response')
     }

  } catch (error) {
    console.log(error.message)
  }
}

fetchdata()
     
}, [])


const title = data?.title || ''




return(
  <section className="">

<SecondHero/>
  
<div className="space-y-16 px-4 md:px-20 py-10">

  {/* Introduction Section */}
  {(data?.title || data?.subtitle || data?.intro) && (
    <section className="border-t border-blue-950 pt-6">
      <h1 className="font-[inter] font-bold text-2xl sm:text-3xl md:text-4xl text-blue-950">
        {data?.title || 'About Us'}
      </h1>
      {data?.subtitle && <h2 className="font-normal text-xl mt-4 text-blue-900">{data.subtitle}</h2>}
      {data?.intro && <div className="text-blue-900 mt-6 text-base sm:text-lg md:text-2xl leading-relaxed text-justify" dangerouslySetInnerHTML={{__html: data.intro}}></div>}
    </section>
  )}

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

  {/* Philosophy */}
  {data?.philosophy && (
    <section className="border-t-4 border-blue-950 pt-6">
      <h1 className="font-[inter] font-bold text-2xl sm:text-3xl md:text-4xl text-blue-950">
        Philosophy
      </h1>
      <div className="text-blue-900 mt-6 text-base sm:text-lg md:text-2xl leading-relaxed text-justify max-w-4xl mx-auto" dangerouslySetInnerHTML={{__html: data.philosophy}}></div>
    </section>
  )}

  {/* VC Message */}
  {data?.vcMessage && (
    <section className="border-t border-blue-950 pt-6">
      <h1 className="font-[inter] font-bold text-2xl sm:text-3xl md:text-4xl text-blue-950 text-center">
        Message from the Vice-Chancellor
      </h1>
      <div className="max-w-4xl mx-auto text-blue-900 mt-6 text-base sm:text-lg md:text-2xl leading-relaxed text-justify" dangerouslySetInnerHTML={{__html: data.vcMessage}}></div>
      {data?.vcimage && <p className="mt-6 font-semibold text-center text-blue-950">{data.vcimage}</p>}
    </section>
  )}

  {/* Director Message */}
  {data?.directorMessage && (
    <section className="border-t border-blue-950 pt-6">
      <h1 className="font-[inter] font-bold text-2xl sm:text-3xl md:text-4xl text-blue-950 text-center">
        Message from the Director
      </h1>
      <div className="max-w-4xl mx-auto text-blue-900 mt-6 text-base sm:text-lg md:text-2xl leading-relaxed text-justify" dangerouslySetInnerHTML={{__html: data.directorMessage}}></div>
      {data?.directorimage && <p className="mt-6 font-semibold text-center text-blue-950">{data.directorimage}</p>}
    </section>
  )}

</div>

  <PortalCTA />
  <CallToAction/> 

  </section>
)


}
export default AboutUs;
