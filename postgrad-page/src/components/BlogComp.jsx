import { Alert, Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useState , useEffect} from 'react';
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css';
import { FaAsterisk } from "react-icons/fa";

const BlogComp = () => {

const [aboutfiles, setaboutFiles] = useState({title:'', subtitle:''})
const [errMsg, setErrMsg] = useState('')
const [successMsg, setSuccessMsg] = useState('')

useEffect(() => {
   const fetchData = async ()=>{
    const res = await fetch(`/api/settings/blog/`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json'
    }
    })

    
    if(!res.ok) {
        console.log(res)
        console.log('could not get blog')
        return

    }
    
    try {
         const data = await res.json()
         setaboutFiles({title:data.title, subtitle:data.subtitle})
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
     const res = await fetch(`/api/settings/updateblog`, {
        method:'PUT',
        headers: {
            'Content-Type':'application/json'
        }, 
        credentials:'include',
        body: JSON.stringify(aboutfiles)
    })
    
    const data = await res.json()
    if(!res.ok){
        console.log('unautho')
        setErrMsg(data)
        return null
    }


    console.log(data)
    setSuccessMsg("Successfully updated")
    
    setErrMsg(null)
 
        
    

    } catch (error) {
        setErrMsg(error.message)
        setErrMsg(null)
        return null
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
     placeholder={aboutfiles.title}
     value={aboutfiles.title}
     onChange={(e)=>{setaboutFiles({...aboutfiles,title: e.target.value})}}
     />
    </div>    

  <div className='mb-4'> <Label htmlFor='Home' className='flex  gap-1 items-center' >
      
    Sub Title <FaAsterisk size={6} color='red'/>
     </Label>
     <TextInput
     type='text'
     id='subtitle'
     value={aboutfiles.subtitle}
     placeholder={aboutfiles.subtitle}
     required
  

     onChange={(e)=>{setaboutFiles({...aboutfiles, subtitle: e.target.value})}}
     
     />
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

export default BlogComp