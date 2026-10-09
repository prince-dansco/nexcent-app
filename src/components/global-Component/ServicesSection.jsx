import React from 'react'
import ServicesSecTwo from './ServicesSecTwo'

export default function ServicesSection() {
  return (
    <div className='max-w-7xl mx-auto md:px-[60px] px-4'>
     <div className="py-10">
        <h2 className='text-5xl font-sans font-bold text-center'>Our Clients</h2>
        <pre  className='text-base text-gray-500 font-sans font-medium text-center'>We have been working with some Fortune 500+ clients</pre>
        <div className="mt-9 flex justify-between">
           <img src="/section_one.png" alt="icon one"  className='object-contain w-20'/> 
           <img src="/section_two.png" alt="icon two"  className='object-contain w-20'/> 
           <img src="/section_three.png" alt="icon three"  className='object-contain w-20'/> 
           <img src="/sectio_four.png" alt="icon four"  className='object-contain w-20'/> 
           <img src="/section_five.png" alt="icon five"  className='object-contain w-20'/> 
           <img src="/section_three.png" alt="icon three"  className='object-contain w-20'/> 
        </div>
        <ServicesSecTwo />
        </div> 
    </div>
  )
}
