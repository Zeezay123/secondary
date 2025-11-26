import React,{useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "flowbite-react";

export default function CardCaro() {

  const [aboutfiles, setaboutFiles] = useState({})
  const [errMsg, setErrMsg] = useState({})
  
  
  useEffect(() => {
      const fetchData = async ()=>{
       const res = await fetch(`/api/settings/about`,{
       method:'GET',
       headers:{
           'Content-Type': 'application/json'
       }
       })
   
       
       if(!res.ok) {
           console.log(res)
           console.log('could not get about page')
           return
   
       }
        const data = await res.json()
       try {
           
            setaboutFiles({
              title:data.title, subtitle:data.subtitle,
       intro:data.intro, mission:data.mission, vision:data.vision, 
       philosophy:data.philosophy, vcMessage:data.vcMessage,
        directorMessage:data.directorMessage, vcimage:data.vcimage,
         directorimage:data.directorimage})
           
            setErrMsg('')
      
       } catch (error) {
           setErrMsg(error.message)
       }
      
   
   
   
      }
   
      fetchData()
   
     
   }, [])
 

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024, // tablets and small laptops
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // phones
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="md:px-10 md:py-5 p-3">
      <Slider {...settings}>
      
          <div className="px-3">
            <Card className="w-full h-full bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
                Mission
              </h5>
              <p className="font-normal text-gray-700 text-sm leading-relaxed"  dangerouslySetInnerHTML={{__html:aboutfiles?.mission}}/>
            </Card> 
            
          </div>

          
          <div className="px-3">
            <Card className="w-full h-full bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
                Vision
              </h5>
              <p className="font-normal text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html:aboutfiles?.vision}}/>
            </Card> 
            
          </div>

          
          <div className="px-3">
            <Card className="w-full h-full bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
                Philosophy
              </h5>
              <p className="font-normal text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html:aboutfiles?.philosophy}}/>
              
              
            </Card> 
            
          </div>
          
          <div className="px-3">
            <Card className="w-full h-full bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
                Learning Objectives
              </h5>
              <p className="font-normal text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html:aboutfiles?.intro}}/>
               
            </Card> 
            
          </div>
       
      </Slider>
    </section>
  );
}
