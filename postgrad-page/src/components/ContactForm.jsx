import { Button, Label, Textarea, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'

const ContactForm = () => {
 const [formData, getFormData]= useState([])

  return (
    <section className='grid grid-rows-1 md:mt-5 h-fit w-2xl'>
    <div className=' flex flex-col gap-3'>   <h1 className='font-[inter] text-4xl font-bold text-black'>Ask us any question</h1>
     <p>write us and we will reply via your provided email. thank you </p>
      <form action="" className='flex flex-col gap-5 mt-3'>
        <TextInput placeholder='Name*'  required/>
        <TextInput placeholder='Email*' required/> 
        <Textarea placeholder='Message*' className='h-28' required/>

        <Button type='submit' className='rounded-full'> Submit Form</Button>
      </form>
</div>
    </section>
  )
}

export default ContactForm