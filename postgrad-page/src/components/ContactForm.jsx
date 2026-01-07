import { Button, Label, Textarea, TextInput, Alert } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [succMsg, setSuccMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccMsg('')
    setErrMsg('')

    try {
      const res = await fetch('/api/contact/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setSuccMsg('Message sent successfully! We will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setErrMsg(data.message || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setErrMsg('An error occurred. Please try again later.')
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }




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

        {succMsg && <Alert color='success'>{succMsg}</Alert>}
        {errMsg && <Alert color='failure'>{errMsg}</Alert>}

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <TextInput
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
          <TextInput
            name="email"
            placeholder="Email*"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
          <Textarea
            name="message"
            placeholder="Message*"
            value={formData.message}
            onChange={handleChange}
            required
            className="h-32 md:h-40"
          />
          <Button
            type="submit"
            disabled={loading}
            className="rounded-full  bg-blue-700 hover:bg-blue-800 transition-colors duration-300 w-full md:w-full self-center md:self-start"
          >
            {loading ? 'Sending...' : 'Submit Form'}
          </Button>
        </form>
      </div>
    </section>
  )
}




export default ContactForm