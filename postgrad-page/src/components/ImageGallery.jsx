import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import two from '../assets/images/imagetwo.jpg'
import three from '../assets/images/imagethree.png'
import four from '../assets/images/imagefour.jpg'
import five from '../assets/images/imagefive.jpg'
import classroom from '../assets/images/classroom1.jpg'
import classroomTwo from '../assets/images/class1.png'

const ImageGallery = () => {
    const imagesO = [two,three,four,five]
    const imagest = [three,two,classroom,classroomTwo]
 
 var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,  
    slidesToScroll: 1,
    autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,   
  swipeToSlide: true,
  };
 
 
 return (
<section className='bg-blue-800 mx-auto flex items-center h-96  justify-start gap-10 p-6 my-10 overflow-hidden'>

<div className='-rotate-90 bg-amber-300  py-2 px-1 flex items-center'>
    
     <h1 className='font-[inter] font-bold text-2xl'>Check Out Gallery </h1></div> 

<div className='w-90%'>
 <Slider {...settings}>

 <img src={two} alt="image" className='w-' /> 
 <img src={two} alt="image" className='w-' /> 
 <img src={two} alt="image" className='w-' /> 

    </Slider> 
</div>


</section>

  )
}

export default ImageGallery