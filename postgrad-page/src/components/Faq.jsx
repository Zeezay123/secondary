import React from 'react'
import Accordion from './Accordion'
import ContactForm from './ContactForm'

const Faq = () => {
    
  return (
   <section className='mt-10 '>
    <div className='w-full flex justify-center items-center'>
      <h1 className='w-full md:w-[50%] wrap-normal font-[inter] text-wrap font-bold text-2xl md:text-4xl/relaxed text-black text-center '> General Questions From Parents and Gaurdians</h1>
    </div>
   <div className='flex flex-col md:flex-row gap-5 md:px-20 items-center justify-center'>
     <Accordion />
     <ContactForm/>
    </div>
    </section>
  )
}

export default Faq