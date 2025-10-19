
import React from 'react'
import schoolOne from '../../src/assets/images/imageone.jpg'
import two from '../../src/assets/images/imagetwo.jpg'
import three from '../../src/assets/images/imagethree.png'
import four from '../../src/assets/images/imagefour.jpg'
import five from '../../src/assets/images/imagefive.jpg'
import classroom from '../../src/assets/images/classroom1.jpg'
import classroomTwo from '../../src/assets/images/class1.png'
import ImageSlider from '../components/ImageSlider'
import Button from '../components/button'




const SliderComp = () => {
 return (

      <section className="md:h-full w-full  relative overflow-hidden">
       <div className='flex  flex-col items-center justify-center w-full h-full mt-5  absolute inset-0 z-40 '>
        <h2 className='font-[inter] font-medium md:text-3xl md:mb-5 text-white'>DELSU Staff School</h2>
         <h1 className='text-white text-2xl cursor-pointer md:text-7xl text-center font-[inter] font-bold'>Education that Leads <br/> Problem Solving</h1>
        <div className='mt-5 md:mt-5 flex gap-5'> 
        <Button text='Primary School' className='rounded p-1 w-24 text-[10px] md:text-lg md:h-15 md:w-52' />
         <Button text='Secondary School' className='rounded w-24 text-[10px] md:text-lag md:h-15 md:w-52' /></div>
       </div>

       <div className='flex bg-amber-900 opacity-30 inset-0 absolute max-w-full h-full z-30 '></div>
        <ImageSlider>
           <img src={classroom} alt="" className='w-full' />
       <img src={classroomTwo} className='w-full' alt=""/> 
           </ImageSlider> 
    </section>
   
  
  
  );
}

export default SliderComp