import { Label, TextInput, Button } from 'flowbite-react'
import { PaystackButton } from 'react-paystack'

import React from 'react'
import { useState } from 'react'

const Instruction = () => {

  return (
    <section className='mt-5'>
       <div className='font-[inter]'>
       <h1 className='font-bold text-xl p-1'>Step 1  </h1> 
        <p className='font-normal text-sm/normal p-5 '> 
           To apply DELSU Secondary School,
           Enter your email and pay the #7000 form fee. On completion of the payment 
           A reference code will be sent to your email

        </p>
       </div>
 <div className='font-[inter]'>
      <h1 className='font-bold text-xl p-1'> Step 2  </h1> 
        <p className='font-normal text-sm/normal p-5 '> 
            Fill out the registration form 
            from the website and enter the reference number sent to you or alternatively complete the registration 
            form obtained from the Registration Pack from our office with a receipt of your payment.
        </p>
       </div>

        <div className='font-[inter]' >
       <h1 className='font-bold text-xl p-1'> Stage 3 </h1>
        <p className='font-normal text-sm/normal p-5 '> 
            
            On completion of the application form. 
             Candidates are required to sit for the entrance examination into the college. Please indicate
              your preferred date on the form or call the admissions office
               on to write the entrance examinations any day including Saturdays.
</p>
<p className='font-normal text-sm/normal p-5 '>
Subjects: Candidates sit for Mathematics and English Language and two other  subjects of their choice  depending on their
 proposed course of study such as English Literature; Business Studies; Economics; Accounts; Physics; Chemistry; Biology
        </p>
       </div>
      
        {/* <Button> Next </Button> */}
    </section>
  )
}

export default Instruction