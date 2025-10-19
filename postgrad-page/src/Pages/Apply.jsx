import { Button, Label, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { PaystackButton } from 'react-paystack'
import girl from '../assets/girls2.png'
import books from '../assets/books.png'
import SecondHero from '../components/SecondHero'
import { useEffect } from 'react'
import ApplicationForm from './ApplicationForm'
import Instruction from './Instruction'
import PaystackForm from './PaystackForm'



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
    <div className='flex flex-col  h-screen items-center p-10 mt-5 rounded border border-slate-50 shadow max-w-4xl '>

      <div className='flex gap-2 items-center'>
         <span className='flex font-[inter] border text-sm border-slate-50 font-medium justify-center items-center w-6 h-6 rounded-full shadow '>1</span> <span className='w-10 h-[2px] rounded-full bg-blue-800'> </span>
          <span className='flex font-[inter] border text-sm border-slate-50 font-medium justify-center items-center w-6 h-6 rounded-full shadow '>2</span> <span className='w-10 h-[2px] rounded-full bg-blue-800'></span> 
          <span className='flex font-[inter] border text-sm border-slate-50 font-medium justify-center items-center w-6 h-6 rounded-full shadow '>3</span> </div>

 { stepButt && <Instruction/>}
  {payButt && <PaystackForm setFormButt={setFormButt} setPayButt={setPayButt} setStepButt={setStepButt}/> }
  {formButt && <ApplicationForm/> }
    
    { stepButt &&<Button onClick={handleStepButton}> Pay Now </Button>}
    
    </div>



   
    </section>
  )
}

export default Apply