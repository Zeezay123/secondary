import { Button, CloseIcon, Label, Select, TextInput } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { PaystackButton } from 'react-paystack'
import girl from '../assets/girls2.png'
import books from '../assets/books.png'
import SecondHero from '../components/SecondHero'
import { useEffect } from 'react'
import ApplicationForm from './ApplicationForm'
import Instruction from './Instruction'
import PaystackForm from './PaystackForm'
import image from '../assets/part.jpg'



const Apply = () => {
    
const [stepButt, setStepButt]= useState(true);
const [payButt, setPayButt]= useState(false);
const [formButt, setFormButt]= useState(false);

const handleStepButton=()=>{
  setFormButt(false)
  setStepButt(false)
  setPayButt(true)
}


  


  return (
    <section className='flex flex-col justify-between items-center w-full '>
   <SecondHero title='Submit Your Application'/>
    <div className='flex flex-col  h-fit md:min-w-5xl items-center p-10 rounded border border-slate-100 shadow max-w-4xl -mt-10 z-10 md:mb-20 bg-white'>

      <div className='flex gap-2 items-center'>
         <span className='flex font-[inter] border text-sm border-slate-50 font-medium justify-center items-center w-6 h-6 rounded-full shadow '>1</span> <span className='w-10 h-[2px] rounded-full bg-blue-800'> </span>
          <span className='flex font-[inter] border text-sm border-slate-50 font-medium justify-center items-center w-6 h-6 rounded-full shadow '>2</span> <span className='w-10 h-[2px] rounded-full bg-blue-800'></span> 
          <span className='flex font-[inter] border text-sm border-slate-50 font-medium justify-center items-center w-6 h-6 rounded-full shadow '>3</span> </div>

 { stepButt && <Instruction/>}
  {payButt && <PaystackForm setFormButt={setFormButt} setPayButt={setPayButt} setStepButt={setStepButt}/> }
  {formButt && <ApplicationForm/> }
    
    { stepButt &&<Button onClick={handleStepButton} className='mt-30'> Pay Now </Button>}
    
    </div>


<div className=' md:w-7xl   max-h-64 flex flex-col justify-center items-center rounded-3xl bg-center mx-auto p-20 md:gap-5 gap-2'
style={{backgroundImage:`url(${image})`}}
>
<h1 className='font-[inter] font-bold md:text-5xl  text-white'> Already a Part of DELSU Staff School? </h1>

<p className='font-[inter] md:max-w-xl  text-wrap text-center text-white '> Login to your portal to get the latest update about you child/student, results, timetable, classes and many more features</p>

<div className='flex gap-5 items-center justify-center'

>
  <div className='w-fit p-2 md:px-7 flex items-center justify-center font-[inter] font-medium bg-white text-black hover:bg-slate-100 rounded'> Teachers</div>
  <div className='w-fit p-2 md:px-7 flex items-center justify-center font-[inter] font-medium border-white border-2 text-white rounded'>Students</div>
</div>
</div>
 
    </section>
  )
}

export default Apply