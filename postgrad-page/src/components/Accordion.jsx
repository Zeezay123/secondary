import React, { useRef, useState, useEffect } from 'react'
import { FaChevronUp } from 'react-icons/fa'

const Accordion = () => {
  const [togg, setTogg] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const AccordRef = useRef({})

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/faq/getfaq?limit=100')
        const result = await res.json()
        if (res.ok) {
          setData(result.data.map(faq => ({
            title: faq.question,
            content: faq.answer
          })))
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFaqs()
  }, [])

  const handleTogg = (index) => {
    setTogg((p) => (index === p ? null : index))
  }

  if (loading) {
    return (
      <section className="w-full max-w-3xl mx-auto px-4 md:px-0 py-10">
        <p className="text-center">Loading FAQs...</p>
      </section>
    )
  }

  if (data.length === 0) {
    return (
      <section className="w-full max-w-3xl mx-auto px-4 md:px-0 py-10">
        <p className="text-center text-gray-500">No FAQs available</p>
      </section>
    )
  }

  return (
    <section className="w-full max-w-3xl mx-auto px-4 md:px-0 py-10 flex flex-col gap-5">
      {data.map((item, index) => (
        <div
          key={index}
          ref={(el) => (AccordRef.current[index] = el)}
          onClick={() => handleTogg(index)}
          className="border border-blue-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer"
        >

          <div className="flex justify-between items-center px-4 md:px-6 py-4 text-gray-900 font-semibold text-base md:text-lg">
            <span>{item.title}</span>
            <FaChevronUp
              size={14}
              className={`text-blue-700 transform transition-transform duration-500 ${
                togg === index ? '' : 'rotate-180'
              }`}
            />
          </div>


          <div
            className="overflow-hidden transition-all duration-500 ease-in-out px-4 md:px-6"
            style={{
              maxHeight:
                togg === index
                  ? `${AccordRef.current[index]?.scrollHeight}px`
                  : '0px',
              opacity: togg === index ? 1 : 0,
            }}
          >
            <p className="text-sm md:text-base text-gray-600 pb-4">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Accordion
