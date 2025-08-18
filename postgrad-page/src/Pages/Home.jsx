import React from 'react'
import Hero from '../components/Hero'
import Aboutus from '../components/Aboutus' 
import Vcaddress from '../components/Vcaddress'
import Faculty from '../components/Faculty' 
import News from '../components/News'
import HowToApply from '../components/HowToApply'
import CallToAction from '../components/CallToAction'


const Home = () => {
  return (
  <div className='flex flex-col p-1'>
      <Hero />
      <Aboutus />
      <Vcaddress />
      <Faculty />
      <HowToApply/>
      <News />
      <CallToAction/>
    </div>
  )
}

export default Home