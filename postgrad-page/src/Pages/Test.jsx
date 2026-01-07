
import React, {useState, useEffect} from 'react'
import SliderComp from '../components/SliderComp'
import PrimInfo from './PrimInfo.jsx';
import CardCaro from '../components/CardCaro.jsx';
import OfferComp from '../components/OfferComp.jsx';
import ImageGallery from '../components/ImageGallery.jsx';
import PortalComp from '../components/PortalComp.jsx';
import News from '../components/News.jsx';
import Secondary from '../components/Secondary.jsx';
import Teachers from '../components/Teachers.jsx';
import Accordion from '../components/Accordion.jsx';
import Faq from '../components/Faq.jsx';
import Announcement from '../components/Announcement.jsx';




const Test = () => {








 return (
  <main className='max-w-full max-h-full mx-auto'>
<Secondary/>
<PrimInfo/>
   <OfferComp/>
   <PortalComp/>

     <Faq/>
     {/* <Accordion/> */}
    <Announcement/>
   <News/>
  </main>
  
  );
}

export default Test