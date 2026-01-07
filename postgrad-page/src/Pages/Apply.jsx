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
import PortalCTA from '../components/PortalCTA'



const Apply = () => {

const [stepButt, setStepButt]= useState(true);
const [payButt, setPayButt]= useState(false);
const [formButt, setFormButt]= useState(false);
const [stages, setStages]= useState([]);
const [reference, setreference]= useState('');
const [childnum, setChildnum]= useState(null);
const [amount, setAmount]= useState(0);


useEffect(()=>{
  fetchdata()
},[])


const fetchdata = async()=>{
  const res = await fetch(`api/application/stages`)
  if(!res.ok){
    console.log('error fetching data')
  }
  const data = await res.json()
  setStages(data)
}

const handleVerify= async(reference)=>{

  const res = await fetch(`/api/payment/${reference}`)
  if(!res.ok){
    return alert('Invalid Reference Number')
  }   
  const data = await res.json()
  console.log(data)
  alert(`Payment of N${data.amount} Successful for ${data.name}. You can now proceed to fill the application form.`)
  setChildnum(data.children)
  setAmount(data.amount)
  setFormButt(true)
 
}

const handleStepButton=()=>{
  setFormButt(false)
}


  


  return (
    <section className='flex flex-col justify-between items-center w-full '>
   <SecondHero title='Submit Your Application'/>

   <div className='px-auto py-12 bg-slate-100 w-full'>
     <div className='grid max-w-7xl mx-auto px-auto'>

      <div>
        <h1 className='text-3xl font-bold text-center mb-2'>Application Process</h1>
        <h4 className='text-center text-sm text-gray-500'> Follow these simple steps to complete your application and join our school community.</h4>
      </div> 

      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 mb-20'>
        
          
          {stages.map((stage)=>(
<div className='flex flex-col items-center  p-5  rounded-lg ' key={stage.id}>
             <div className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-950 text-blue-100 font-bold text-xl mb-4'>{stage?.stage_number || '1'}</div>
          <h2 className='font-semibold text-lg mb-2'>{`Stage ${stage?.stage_number}`}</h2>
          <p className='text-center text-gray-500 text-xs/normal'>{stage?.description}</p>
        
                </div>
          ))}
         

      </div>

     </div>
   </div>
    
 {<PaystackForm setFormButt={setFormButt} setPayButt={setPayButt} setStepButt={setStepButt}/> }

 <section className='mb-12'>
  <div className='flex flex-col gap-4  bg-slate-100 md:rounded-lg px-10 py-10 md:w-4xl md:mx-auto mt-5'>
   <div className='flex flex-col gap-3 '> 
    <Label htmlFor='name'> Enter your reference Number to verify</Label>
      <div className='flex gap-5 items-center '>         
              <TextInput type='text'
                className='bg-slate-50 w-full'
                required
                id='name'
                value={reference}
                onChange={(e)=>setreference(e.target.value)} />
               <Button onClick={()=>handleVerify(reference)}> Verify </Button>
                </div> 
                
                </div> 
  </div>
 </section>
  {formButt && <ApplicationForm   reference={reference}  amount={amount}/> }
    
    {/* { stepButt &&<Button onClick={handleStepButton} className='mt-30'> Pay Now </Button>} */}

<PortalCTA />
 
    </section>
  )
}

export default Apply