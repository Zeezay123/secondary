import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function ImageSlider({children}) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,   
  swipeToSlide: true,
  };
  return (
    <section className="w-full"> 
         <Slider {...settings}>
    {React.Children.map(children, (child,index)=>(
        <div key={index}>
            {child}
        </div>
    ))}
    </Slider>
    </section>
 
  );
}

