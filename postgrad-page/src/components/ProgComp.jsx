import { Alert, Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useState , useEffect} from 'react';
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css';
import { FaAsterisk } from "react-icons/fa";

const ProgComp = () => {

const [aboutfiles, setaboutFiles] = useState({})
const [errMsg, setErrMsg] = useState('')
const [successMsg, setSuccessMsg] = useState('')

useEffect(() => {
   const fetchData = async ()=>{
    const res = await fetch(`/api/settings/program/`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
    }
    })

    
    if(!res.ok) {
        console.log(res)
        console.log('could not get homepage')
        return

    }
    
    const data = await res.json()
    
    try {
         
         setaboutFiles({title:data.title, subtitle:data.subtitle, 
            second_title:data.second_title, content:data.content})
         console.log(data)
         setErrMsg('')
         setSuccessMsg('')
    } catch (error) {
        setErrMsg(error.message)
    }
   



   }

   fetchData()

  
}, [])

const  handleSubmit =async (e)=>{

    e.preventDefault()
   try {
     const res = await fetch(`/api/settings/updateprogram`, {
        method:'PUT',
        headers: {
            'Content-Type':'application/json'
        }, 
        credentials:'include',
        body: JSON.stringify(aboutfiles)
    })

    const data = await res.json()

    if(!res.ok){
        console.log(data)
        setErrMsg(data)
        return
    }
 


    console.log(data)
    setSuccessMsg("Successfully updated")
    
    setErrMsg(null)
 
        
    

    } catch (error) {
        setErrMsg(error.message)
        setErrMsg(null)
    }



}








  return (
    <div className='max-w-6xl md:min-w-5xl mx-auto border-grey-2 shadow rounded-lg p-5'>

        <form  onSubmit={handleSubmit} >
 <div className='mb-4'>
 <Label htmlFor='Home' className='flex  gap-1 items-center' >
      
    Title<FaAsterisk size={6} color='red'/>
     </Label>
     <TextInput
     type='text'
     id='title'
     required
     value={aboutfiles?.title || ''}
     onChange={(e)=>{setaboutFiles({...aboutfiles,title: e.target.value})}}
     />
    </div>    

  <div className='mb-4'> <Label htmlFor='Home' className='flex  gap-1 items-center' >
      
    Sub Title <FaAsterisk size={6} color='red'/>
     </Label>
     <TextInput
     type='text'
     id='subtitle'
     value={aboutfiles?.subtitle || ''}
     required
  

     onChange={(e)=>{setaboutFiles({...aboutfiles, subtitle: e.target.value})}}
     
     />
</div> 
      
 <div className='mb-4'> <Label htmlFor='Home' className='flex  gap-1 items-center' >
      
    Content Title <FaAsterisk size={6} color='red'/>
     </Label>
     <TextInput
     type='text'
     id='subtitle'
     value={aboutfiles?.second_title || ''}
     required
  

     onChange={(e)=>{setaboutFiles({...aboutfiles, second_title: e.target.value})}}
     
     />
</div> 
 <div className='min-h-32 mb-5 gap-4 flex flex-col py-5'>
        
     <Label>Content</Label>
      <div className='min-h-72'>
        <ReactQuill theme='snow' 
         className='h-64 mb-5'
        value={aboutfiles?.content || ''}
        onChange={(value)=>{setaboutFiles({...aboutfiles, content: value})}} />
      </div>
      </div>

<div className='w-full'>

    <Button className='mt-10 w-full mb-2' type='submit'> Submit </Button>
</div>
      
        </form>

{successMsg && <Alert color='success' >{successMsg}</Alert>}


{errMsg && <Alert color='failure' >{errMsg.message}</Alert>}
    </div>
  )
}

export default ProgComp