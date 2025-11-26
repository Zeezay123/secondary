import { Button, Label, Textarea, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'

const ContactForm = () => {
 const [formData, getFormData]= useState([])




  return (
    <section className="w-full flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="font-[inter] text-2xl md:text-4xl font-bold text-gray-900">
            Ask us any question
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Write to us and we’ll reply via your provided email. Thank you.
          </p>
        </div>

        <form className="flex flex-col gap-4 mt-4">
          <TextInput
            placeholder="Name*"
            required
            className="w-full"
          />
          <TextInput
            placeholder="Email*"
            type="email"
            required
            className="w-full"
          />
          <Textarea
            placeholder="Message*"
            required
            className="h-32 md:h-40"
          />
          <Button
            type="submit"
            className="rounded-full  bg-blue-700 hover:bg-blue-800 transition-colors duration-300 w-full md:w-full self-center md:self-start"
          >
            Submit Form
          </Button>
        </form>
      </div>
    </section>
  )
}




export default ContactForm