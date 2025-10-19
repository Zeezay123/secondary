import React from 'react'
import Accordion from './Accordion'
import ContactForm from './ContactForm'

const Faq = () => {
    
  return (
   <section className='grid grid-rows-1 '>
    <div className='flex justify-center items-center'>
      <h1 className='w-[50%] wrap-normal font-[inter] font-bold text-3xl md:text-4xl/relaxed text-black text-center '> General Questions From Parents and Gaurdians</h1>
    </div>
   <div className='flex gap-5 px-20 items-center justify-center'>
     <Accordion />
     <ContactForm/>
    </div>
    </section>
  )
}

export default Faq