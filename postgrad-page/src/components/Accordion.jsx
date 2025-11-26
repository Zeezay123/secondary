import React, { useRef, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'

const Accordion = () => {
  const [togg, setTogg] = useState(null)
  const AccordRef = useRef({})

  const handleTogg = (index) => {
    setTogg((p) => (index === p ? null : index))
  }

  const data = [
    {
      title: 'What documents are needed for admission?',
      content: `Honoring the achievements, resilience,
      and unity of the DELSU Secondary School Class of 2024 — a remarkable chapter in our school’s story.`,
    },
    {
      title: 'When does the school session start?',
      content: `Our academic year runs from September through July, divided into three terms.`,
    },
    {
      title: 'Is there a boarding facility available?',
      content: `Yes, our school offers a safe and well-supervised boarding system with modern amenities.`,
    },
    {
      title: 'How do I apply for admission?',
      content: `Applications can be made online through the school portal or directly at the school’s administrative office.`,
    },
  ]

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
