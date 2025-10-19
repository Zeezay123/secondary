import React, { useEffect,useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "flowbite-react";


export default function CardCaro() {
  const [winSize, setWinSize] = useState(0)
    


    useEffect(()=>{
      const handleScreenSize =()=>{
    window.innerWidth < 620 ? setWinSize(1) : setWinSize(3)
      }

      handleScreenSize()
       window.addEventListener('resize', handleScreenSize)

       return ()=> window.removeEventListener('resize',handleScreenSize)
  
    },[])

   

const cardData = [

    {
        title:'Learning Outcomes',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. We provide an environment that 
        enables our students to thrive and optimize their abilities`
        
    },
    
    {
        title:'Learning Outcomes',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. We provide an environment that 
        enables our students to thrive and optimize their abilities`
        
    },
    
    {
        title:'Learning Outcomes',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. We provide an environment that 
        enables our students to thrive and optimize their abilities`
        
    },
    
    {
        title:'Learning Outcomes',
        content:`We create in our students a culture of achievement focusing on core skills, learning culture, 
        attainment scores, and environmental safety. We provide an environment that 
        enables our students to thrive and optimize their abilities`
        
    },
]


  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: winSize,
    slidesToScroll: 1,
    autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,   
  swipeToSlide: true,
  };
  return (
    <section className="w-full mx-auto py-10"> 
         <Slider {...settings}>
     {cardData.map((card,index)=>(
        <div className="px-5 flex flex-col">
<div className="flex flex-col h-full">
    
      <Card key={index} className=" bg-white h-full "> 
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400"> {card.content}</p>
        </Card>
     </div></div>
    ))}   
    
    </Slider>
    </section>
 
  );
}

