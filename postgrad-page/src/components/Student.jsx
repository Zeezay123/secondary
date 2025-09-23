import { Label, TextInput,FileInput, Button, Alert} from 'flowbite-react'
import React from 'react'
import { useState , useEffect} from 'react';
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css';
import { FaAsterisk } from "react-icons/fa";
import axios from "axios";
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'



const Student = () => {
const [file, setFile] = useState('')
const [imageUrl, setImageUrl] = useState('')
const [aboutfiles, setaboutFiles] = useState({})
const [drpreview, setDrPreview] = useState('')
const [errMsg, setErrMsg] = useState('')
const [uploadprogress, setUploadProgress]= useState(0)
const [succMsg, setSuccessMsg] = useState('')



useEffect(()=>{
  const fetchContent = async ()=>{
    const res = await fetch(`/api/content/student`)
    const data = await res.json()

    if(!res.ok){
        setErrMsg(data)
        return
    }

    try {
        setaboutFiles({subtitle:data.subtitle, content:data.content, image:data.image })
   setErrMsg(null)
    } catch (error) {
        setErrMsg(error)
    }
  }
fetchContent()
},[])

const handleFileChange=(e)=>{
  const file = e.target.files[0] 
  setFile(file) 
  console.log(file)
  const preview = URL.createObjectURL(file)
  setDrPreview(preview)
}



const  upload =async()=> {

    try {
 const formdata = new FormData()
 formdata.append('file', file)

        const res = await axios.post(`/api/uploads/`, formdata, {
            headers:{"Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log("Upload Progress:", percent + "%");
        setUploadProgress(percent); 
      },
    })

    const data = res.data
    console.log(data)
    setaboutFiles({...aboutfiles, image:data}) 
    setUploadProgress(null)
    console.log(aboutfiles)


    } catch (error) {
        setErrMsg("error uploading image")
        setUploadProgress(0)
        console.log(error.message)
    }
  

}

const handleSubmit= async(e) =>{
    e.preventDefault()
    try {
        const res = await fetch(`/api/content/student`, {
            method:'PUT',
            headers:{'Content-type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(aboutfiles)

        })

        const data = res.json()
        if(!res.ok){
            setErrMsg(data)
            setSuccessMsg(null)
            return
        }

        setErrMsg(null)
        setSuccessMsg("Updated Successfully")
        console.log(aboutfiles)

    } catch (error) {
        setErrMsg(error)
        setSuccessMsg(null)
    }
}


  return (
    <div className='max-w-6xl md:min-w-4xl mx-auto border-grey-2 shadow rounded-lg p-5'> 
      
      <form onSubmit={handleSubmit}>
        {/* <div className='mb-4'>
          <Label className='flex  gap-1 items-center' >
               
             Title<FaAsterisk size={6} color='red'/>
              </Label>
              <TextInput
              type='text'
              id='title'
              required
              placeholder={aboutfiles?.title || ''}
              value={aboutfiles?.title || ''}
              onChange={(e)=>{setaboutFiles({...aboutfiles,title: e.target.value})}}
              />
             </div>   */}
                <div className='mb-4'> <Label  className='flex  gap-1 items-center' >
                    
                  Sub Title <FaAsterisk size={6} color='red'/>
                   </Label>
                   <TextInput
                   type='text'
                   id='subtitle'
                   value={aboutfiles?.subtitle || ''}
                   placeholder={aboutfiles?.subtitle || ''}
                   required
                
              
                   onChange={(e)=>{setaboutFiles({...aboutfiles, subtitle: e.target.value})}}
                   
                   />
              </div> 

              <div className='min-h-32 mb-5 mt-5 gap-4 flex flex-col py-5'>
                  <Label>Content</Label>
                       <ReactQuill theme='snow' 
                       placeholder='write about your website...' className='h-32 mb-5'
                       value={aboutfiles?.content || ''}
                       onChange={(value)=>{setaboutFiles({...aboutfiles, content: value})}} />
                     </div>
                     
               <div className='mb-5 mt-15'>
                  <Label > Image </Label>
                 <div className='flex gap-5 mt-5'>
                  <FileInput
                   id="image"
                   name="image"
                   accept="image/*"
                   onChange={handleFileChange}
                
                  
                  /> 
                  <Button onClick={upload} disabled={uploadprogress} > 
                  { uploadprogress ? <div className='w-16 h-16'> <CircularProgressbar value={uploadprogress} text={`${uploadprogress}`}/> </div> : 'Upload' }</Button>
                    </div>
                  
               </div>
              
               {drpreview && <div className='flex justify-center items-center' > <img src={drpreview} alt=""  />  </div>}
              

             { errMsg && <Alert color='faliure' > {errMsg} </Alert>}
             {succMsg && <Alert color='success' > {succMsg} </Alert>}
     
     
     <Button className='w-full' type='submit' >Submit</Button>
      </form>
       
    </div>
  )
}

export default Student