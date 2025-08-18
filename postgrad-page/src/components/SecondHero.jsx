import React from 'react'
import imageOne from '../assets/images/abrak gate 1.png'

const SecondHero = ({title, content }) => {
return (
    <header className="relative w-full">
    
      <div className="w-full h-[300px] md:h-[400px]">
        <img
          className="w-full h-full object-cover"
          src={imageOne}
          alt="Hero background"
        />
        
        <div className="absolute inset-0 bg-black opacity-20 "></div>
      </div>

      <div className="absolute left-1/2 bottom-[-5rem] transform -translate-x-1/2 bg-blue-800 rounded-lg shadow-lg p-6 md:p-10 w-[90%] md:w-[600px]">
        <h1 className="text-3xl md:text-4xl font-bold text-white font-sans">
          {title || 'Title'}
        </h1>
        <p className="text-white font-medium mt-4 md:mt-6 leading-relaxed">
          {content ||
            'The CCODeL mission drives our focus on quality education for all and service to our neighbours in need.'}
        </p>
      </div>
    </header>
)
};

export default SecondHero;
