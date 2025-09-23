import { Card } from 'flowbite-react'
import React, {useEffect, useState} from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { TbMessage2Share } from 'react-icons/tb'
import { Link } from 'react-router-dom'


const HowToApply = () => {
const [dataOne, setDataOne] = useState({});
const [dataTwo, setDataTwo] = useState({});
const [dataThree, setDataThree] = useState(null);



useEffect(()=>{

  const fetchAll =async()=> {
   const [studentRes, accRes, camRes] = await Promise.all([fetch(`/api/content/student`),
     fetch(`/api/content/accomodation`),
    fetch(`/api/content/campus`)])


   if(!studentRes.ok || !accRes.ok || !camRes){
    console.log([studentRes,accRes, camRes ])
    return
   }


  const [studentData, accData, camData] = await Promise.all([studentRes.json(), accRes.json(), camRes.json()])
  setDataOne(studentData)
  setDataTwo(accData)
  setDataThree(camData)
}
fetchAll()
},[])




   const capital =(myName)=>{
    const firstleter = myName.charAt(0).toLocaleUpperCase()
    const restLetter = myName.slice(1)

     return firstleter + restLetter
   }

  const cards = [
    {
      image: dataOne?.image || '',
      title: "capital(dataOne?.title)" || 'Loading',
      text: dataOne?.content || 'Loading',
      links: [
        { label: dataOne?.subtitle || 'Loading', href: "#" },
      ],
    },
    {
      image: dataTwo?.image || '', 
      title: "capital(dataTwo?.title)",
      text: dataTwo.content,
      links: [{ label:dataTwo?.subtitle, href: "#" }],
    },
    {
      image: dataThree?.image || ' ',
      title:"capital(dataThree?.title)",
      text: dataThree?.content || 'loading',
      links: [{ label: dataTwo?.subtitle, href: "#" }],
    },
  ];



  return (
    <section className="max-w-7xl mx-auto px-4 py-12  mb-50">
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white shadow-md">
            {/* Image */}
            <img
              src={`uploads/${card.image}`}
              alt={card.title}
              className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="bg-blue-900 text-white p-6 flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="mb-4" dangerouslySetInnerHTML={{__html:card?.text || ''}}></p>
              <div className="mt-auto space-y-2">
                {card.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="inline-flex items-center text-slate-200 hover:underline"
                  >
                    {link.label}
                    <span className="ml-1">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
  
}

export default HowToApply