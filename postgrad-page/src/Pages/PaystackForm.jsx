import React from 'react'
import { Label, TextInput, Button } from 'flowbite-react'
import { PaystackButton } from 'react-paystack'
import { useState } from 'react'

const PaystackForm = ({setFormButt,setPayButt, setStepButt}) => {
    
          const publicKey = 'pk_test_42da8648ac8831e39be57caf56c5633d63c489fd'
        const [email, setemail] = useState('') 
        const [childNum, setChildNum] = useState(1)
        const [name, setName] = useState('')
        const [reference, setreference] = useState('') 
        const [paid, setPaid] = useState('paid')
    
        let amount = (((10000 * 100)) * childNum) + 1000 * 100
    
    
        const handleSuccess=async(reference)=>{
          amount = amount/100
          const res = await fetch(`/api/payment/create`,{
           method:'POST',
           headers:{
            'Content-Type':'application/json'
           },
           body:JSON.stringify({reference,email,name,amount,paid, childNum})
          })
       
          if(!res.ok){
            return res.body
          }

          const data = await res.json()

          console.log(data)

            setFormButt(true),
            setPayButt(false),
            setStepButt(false)
            setreference(reference)
            console.log(email,name,reference,amount,paid)

        }
    
        const componentProps = {
        email,
        name,
        paid,
        amount,
        publicKey,
        text: "Pay Now",
        onSuccess:({reference})=>handleSuccess(reference),
        onClose: () => setPaid(true),
      }
    


  return (
    <section className='w-full flex-col justify-center items-center '>
          <div className='grid mx-auto py-12 md:px-auto max-w-7xl '>
          
          
          <div className='mb-7'>
        <h1 className='text-3xl font-bold text-center mb-2'>Enter Your Details</h1>
        <h4 className='text-center text-sm text-gray-500'> Detaild entered will be used to verify your payment. Please ensure accuracy as we are not liable to mistakes made in the entry </h4>
      </div> 
        
          <div className='flex flex-col gap-4  bg-slate-100 md:rounded-lg px-10 py-10 md:w-4xl md:mx-auto mt-5'>
         
         
          <div className=''> 
          <div className='flex flex-col gap-3 '> <Label htmlFor='name'> Enter your Name</Label>
            <TextInput type='text'
            className='bg-slate-50'
            required
            id='name'
            value={name}
            onChange={(e)=>setName(e.target.value)} />
          
            </div> 


            </div>


            <div className='md:grid md:grid-cols-1 md:gap-6 '> 
             <div className=' flex flex-col gap-3'> <Label htmlFor='email'> Enter your Email</Label>
            <TextInput type='email'
            required
            id='email'
            value={email}
            onChange={(e)=>setemail(e.target.value)} />
            </div>

            

</div>
            <div className={`flex text-white font-[inter] rounded font-bold items-center justify-center ${ !name || !email || !childNum ? 'bg-gray-500' : `bg-blue-800`} p-2  mt-5`}><PaystackButton  {...componentProps} />  </div> 
        </div>
          </div>
    </section>
  )
}

export default PaystackForm