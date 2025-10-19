import { Button, Label, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { PaystackButton } from 'react-paystack'
import girl from '../assets/girls2.png'
import books from '../assets/books.png'
import SecondHero from '../components/SecondHero'
import { useEffect } from 'react'



const ApplicationForm = () => {
const [states, setStates] = useState([])
    const [lga, setLga] = useState([])
    const [selectedState, setSelectedState] =useState('Abia') 
    const [selectedLga, setSelectedLga] =useState('') 
    const amount = 10000
  


  
useEffect(()=>{

    const fetchStates = async ()=>{
      const res = await fetch(`https://nga-states-lga.onrender.com/fetch`)
      const data = await res.json()

      if(!res.ok){
        console.log(res) 
        return
      }
      try {
        
        setStates(data)
      } catch (error) {
        console.log(error)
      }
    }
  fetchStates()
  },[])

  useEffect(()=>{

    const fetchLga = async ()=>{
      const res = await fetch(`https://nga-states-lga.onrender.com/?state=${selectedState}`)
      const data = await res.json()

      if(!res.ok){
        console.log(res) 
        return
      }

      setLga(data)
    }
  fetchLga()
  },[selectedState])
 

const handleSelectedState =(e)=>
{
 setSelectedState(e.target.value)
}

const handleSuccess =()=>{
    setPaid(true)
}


const handleSelectedLga =(e)=>{
  setSelectedLga(e.target.value)
} 

console.log(selectedState)
console.log(selectedLga)



    return (
    <section> 
      
    <div> <h1 className='font-[inter] font-bold text-2xl p-5 text-black'> Fill the Application Form </h1> </div>
    <form className='grid grid-cols-2 items-center justify-center min-w-[800px] px-8  gap-5 mx-auto'>


       <div>  <Label className='text-sm' htmlFor='firstname'> First name</Label>
       <TextInput 
       id='fullname'
       type='text'
       placeholder='firstname'/>
        </div>

       <div>  <Label className='text-sm' htmlFor='othername'> Other name</Label>
       <TextInput 
       id='othername'
       type='text'
       placeholder='othername'/>
        </div>

         <div>  <Label className='text-sm' htmlFor='lastname'> Last name</Label>
       <TextInput 
       id='lastname'
       type='text'
       placeholder='lastname'/>
        </div>

      <div>  <Label htmlFor='email'> Email</Label>
       <TextInput
       id='email'
       type='email'
       placeholder='example@email.com'
       required
       />
        </div>

        <div>  <Label htmlFor='phone'> Phone Number</Label>
       <TextInput
       id='phone'
       type='number'
       placeholder='23458978892'/>
        </div>


        

  <div className=''> 
        <Label htmlFor='Gender'> Gender</Label>
       <Select> 
        <option value="male">Male</option>
        <option value="female">Female</option>
       </Select>

      
        </div>
        
        

        <div >  <Label htmlFor='amount'> Amount</Label>
       <TextInput 
       type='number'
       id='amount'
       />
        </div>

        <div>  <Label> Class</Label>
       <Select>
        <option value="Jss1"> Junior Secondary School 1</option>
        <option value="Jss2"> Junior Secondary School 2</option>
        <option value="Jss3"> Junior Secondary School 3</option>
        <option value="sss1"> Senior Secondary School 1</option>
        <option value="sss2"> Senior Secondary School 2</option>
        <option value="sss3"> Senior Secondary School 3</option>
       </Select>
        </div>

      <div>  <Label> State</Label>
       <Select onChange={(e)=>handleSelectedState(e)}>
        {states.map((data,index)=>(
          <option key={index} value={data} > {data}</option>
        ))}
       </Select>
        </div>

        <div>  <Label> LGA</Label>
       <Select onChange={(e)=>handleSelectedLga(e)}>
        {lga.map((data,index)=>(
          <option key={index} value={data} > {data}</option>
        ))}
       </Select>
        </div>

<div>  <Label> I am a </Label>
       <Select>
        <option value="parent">Parent</option>
        <option value="guardian">Guardian</option>

       </Select>
        </div>

        <div>  <Label htmlFor='reference'> Reference No. </Label>
       <TextInput 
       type='number'
       id='reference'/>
        </div>
       
       <Button className='col-span-2'>Submit</Button>

        
    
    </form>

     
     
    </section>
  )
}

export default ApplicationForm