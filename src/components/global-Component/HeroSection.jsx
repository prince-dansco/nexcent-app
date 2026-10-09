import React from 'react';

export default function HeroSection() {
  return (
    <div className=" md:max-w-7xl mx-auto px-4 md:px-[60px] py-10">
      <div className="flex  flex-col md:flex-row justify-between items-center gap-4 md:gap-1">
      <div className="  md:max-w-[650px] w-full flex flex-col items-center md:items-start">
        <h1 className='text-3xl md:text-[65px] md:leading-[70px] font-sans font-bold'>Lessons and insights <span className='text-green-500'>from 8 years</span></h1>
        <p className='text-xs font-sans font-medium text-gray-500 my-6'>Where to grow your business as a photographer: site or social media?</p>
        <button className='px-4 py-3 rounded-md text-base font-sans font-light bg-green-500 text-white max-w-[150px] w-full mx-auto  md:mx-0'>Register</button>
      </div>
      <div className="max-w-[400px] w-full h-auto">
        <img 
          src="/hero.png"  
          alt="hero-image" 
          className="w-full h-auto object-cover"
        />
      </div>
      
      </div>
      <div className="flex justify-self-center items-center gap-3 mt-12 ">
        <div className="w-5 h-5 rounded-full bg-green-500"></div>
        <div className="w-5 h-5 rounded-full bg-gray-200"></div>
        <div className="w-5 h-5 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}