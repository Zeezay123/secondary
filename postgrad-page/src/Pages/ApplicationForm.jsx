import { Button, Label, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { PaystackButton } from 'react-paystack'
import girl from '../assets/girls2.png'
import books from '../assets/books.png'
import SecondHero from '../components/SecondHero'
import { useEffect } from 'react'



const ApplicationForm = () => {
    const [firstname, setfirstname] = useState('')
    const [othername, setothername] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [classname, setClassname] = useState('')
    const [gender, setGender] = useState('')
    const [reference, setReference] = useState('')
    const [states, setStates] = useState([])
    const [parent, setParent] = useState('')
    const [lga, setLga] = useState([])
    const [selectedState, setSelectedState] =useState('Abia') 
    const [selectedLga, setSelectedLga] =useState('') 
    const [amount, setAmount] =  useState(10000)
//     const [idx, setIdx] = useState(null)
// const [tags, setTags] = useState([])
// const TagRef = useRef({})
  

    useEffect(()=>{

      const fetchPay = async()=>{

        const res = await fetch(`/api/api/payment/`)
      }
    },[])

  
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

const removeEle =(index)=>{
  // tags.splice(index,1)
  setTags(tags.filter((data)=> data.id !== index))

}


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
       value={amount}
         readOnly 
       />
        </div>

{/*    
<div className='flex gap-1 flex-col' >

<div className='w-96 min-h-10 border flex items-center gap-2 flex-wrap px-2 py-1'> 
  {tags.length > 0 && tags.map((tag, index)=>( 
     <div 
      key={tag.id}
      // ref={(e)=>TagRef.current[tag.name] = e}
      onClick={()=>removeEle(tag.id)}
      className='w-fit font-[inter] text-sm py-1  flex justify-between items-center bg-slate-100 rounded px-2 gap-3 text-black font-medium' > {tag.name} <CloseIcon fontSize={12}/> </div>))}
  
   </div>

<div className='flex gap-3'> 

<button className='w-fit border p-2 h-fit' onClick={()=>(setTags([...tags, {name:'Jss 1', id:Date.now()}]))}> jss1</button> 
<button className='w-fit border p-2 h-fit' onClick={()=>(setTags([...tags, {name:'Jss 2', id:Date.now()}]))}> jss2</button> 
<button className='w-fit border p-2 h-fit' onClick={()=>(setTags([...tags, {name:'Jss 3', id:Date.now()}]))}> jss3</button> 
<button className='w-fit border p-2 h-fit' onClick={()=>(setTags([...tags, {name:'Sss 1', id:Date.now()}]))}> jss3</button> 
<button className='w-fit border p-2 h-fit' onClick={()=>(setTags([...tags, {name:'Sss 2', id:Date.now()}]))} > jss4</button> 
<button className='w-fit border p-2 h-fit' onClick={()=>(setTags([...tags, {name:'Sss 3', id:Date.now()}]))} > jss5</button> 


</div>
</div> */}

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

        <div >  <Label htmlFor='reference'> Reference No. </Label>
       <TextInput 
       type='text'
       id='reference'
      
        className='focus:outline-none'/>
        </div>
       
       <Button className='col-span-2'>Submit</Button>

        
    
    </form>

     
     
    </section>
  )
}

export default ApplicationForm