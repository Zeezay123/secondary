import React from 'react'
import { Label, TextInput, Button } from 'flowbite-react'
import { PaystackButton } from 'react-paystack'
import { useState } from 'react'

const PaystackForm = ({setFormButt,setPayButt, setStepButt}) => {
    
          const publicKey = 'pk_test_42da8648ac8831e39be57caf56c5633d63c489fd'
        const [email, setemail] = useState('') 
        const [reference, setreference] = useState('') 
        const [paid, setPaid] = useState(true)
    
        const amount = 10000 * 100
    
    
        const handleSuccess=(reference)=>{

            setFormButt(true),
            setPayButt(false),
            setStepButt(false)
            setreference(reference)

        }
    
        const componentProps = {
        email,
        amount,
        publicKey,
        text: "Pay Now",
        onSuccess:({reference})=>handleSuccess(reference),
        onClose: () => setPaid(true),
      }
    


  return (
    <section>
          <div>
            <Label htmlFor='email'> Enter your Email</Label>
            <TextInput type='email'
            required
            id='email'
            value={email}
            onChange={(e)=>setemail(e.target.value)} />
            <div className='flex text-white font-[inter] rounded font-bold items-center justify-center bg-blue-800 p-2  mt-5'><PaystackButton  {...componentProps} />  </div> 
        </div>
    </section>
  )
}

export default PaystackForm