import { Alert, Button, FileInput, Label, TextInput, useSidebarContext } from 'flowbite-react'
import React from 'react'
import { useState , useEffect} from 'react';
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css';
import { FaAsterisk } from "react-icons/fa";
import axios from "axios";
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


const AboutComp = () => {
 const [aboutfiles, setaboutFiles] = useState({})
 const [errMsg, setErrMsg] = useState('')
 const [successMsg, setSuccessMsg] = useState('')
 const [preview, setPreview] = useState('')
 const [drpreview, setDrPreview] = useState('')
 const [vcFile, setVcFile] = useState({})
 const [vcimage, setVcImage] = useState('') 
 const [directorimage, setDirectorImage] = useState('') 
 const [drFile, setDrFile] = useState({})
 const [vcUploadProgress, setVcUploadProgress] = useState(0)
 const [drUploadProgress, setDrUploadProgress] = useState(0)

 const [uploaderr, setUploadError] = useState(0)





const uploadVc = async () => {
  try {
    const formData = new FormData();
    formData.append("file", vcFile);

    const res = await axios.post("/api/uploads/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        
        setVcUploadProgress(percent); 
      },
    });

    const data = await res.data
    console.log(data)
    setVcUploadProgress(null)
    setVcImage(data);
    setaboutFiles({ ...aboutfiles, vcimage:data });
  } catch (error) {
    setUploadError("Error Uploading image")
    setVcUploadProgress(0)
    console.log(error.message);
  }
};


 const uploadDr = async () =>{
    try {
        const formData =  new FormData()
        formData.append('file', drFile)

       
    const res = await axios.post("/api/uploads/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      
        setDrUploadProgress(percent); 
      },
    });
       const data = await res.data
    console.log(data)
   
      
        setDirectorImage(data)
        setaboutFiles({...aboutfiles, directorimage:data})
        setUploadError(null) 
        setDrUploadProgress(null)


    } catch (error) {
        console.log(error.message)
         setUploadError("Error Uploading image")
         setDrUploadProgress(0)
    }
 }



 useEffect(() => {
    const fetchData = async ()=>{
     const res = await fetch(`/api/settings/about`,{
     method:'GET',
     headers:{
         'Content-Type': 'application/json'
     }
     })
 
     
     if(!res.ok) {
         console.log(res)
         console.log('could not get about page')
         return
 
     }
      const data = await res.json()
     try {
         
          setaboutFiles({
            title:data.title, subtitle:data.subtitle,
     intro:data.intro, mission:data.mission, vision:data.vision, 
     philosophy:data.philosophy, vcMessage:data.vcMessage,
      directorMessage:data.directorMessage, vcimage:data.vcimage,
       directorimage:data.directorimage})
         
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
      const res = await fetch(`/api/settings/updateabout`, {
         method:'PUT',
         headers: {
             'Content-Type':'application/json'
         }, 
         credentials:'include',
         body: JSON.stringify(aboutfiles)
     })

     const data = await res.json() 

    
 
     if(!res.ok){

         setErrMsg(data)
         return
     }
 
 
     
     setSuccessMsg("Successfully updated")
     
     setErrMsg(null)
  
         
     
 
     } catch (error) {
         setErrMsg(error.message)
         setErrMsg(null)
     }
 
 
 
 }
 
 const handleVcImageChange =(e)=>{

   const file = e.target.files[0]
   const pre = URL.createObjectURL(file)
   setVcFile(file)
   setPreview(pre)

   

 }

  const handleDrImageChange =(e)=>{

   const file = e.target.files[0]

   const pre = URL.createObjectURL(file)
   setDrFile(file)
   setDrPreview(pre)

   

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
      placeholder={aboutfiles?.title || ''}
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
      placeholder={aboutfiles?.subtitle || ''}
      required
   
 
      onChange={(e)=>{setaboutFiles({...aboutfiles, subtitle: e.target.value})}}
      
      />
 </div> 

<div className='min-h-32 mb-5 mt-5 gap-4 flex flex-col py-5'>
    <Label>Vc's Message</Label>
         <ReactQuill theme='snow' 
         placeholder='write about your website...' className='h-32 mb-5'
         value={aboutfiles?.vcMessage || ''}
         onChange={(value)=>{setaboutFiles({...aboutfiles, vcMessage: value})}} />
       </div>
       
 <div className='mb-5 mt-10'>
     <Label className='mb-5'> Vcs Image </Label>
 <div className='flex gap-5 mt-5 '>  
    <FileInput
     id="vcimage"
     name="vcimage"
     accept="image/*"
     onChange={handleVcImageChange}
    /> 
    <Button
     onClick={uploadVc}
     disabled={vcUploadProgress}
     > 
     { vcUploadProgress ? <div className='w-16 h-16'>
        <CircularProgressbar value={vcUploadProgress} text={`${vcUploadProgress}`} /> </div>: 'Upload'
         }
     </Button> </div>
 </div>
    

 {preview && <div className='flex justify-center items-center' > <img src={preview} alt=""  />  </div>}

<div className='min-h-32 mb-5 mt-5 gap-4 flex flex-col py-5'>
    <Label>Director's Message</Label>
         <ReactQuill theme='snow' 
         placeholder='write about your website...' className='h-32 mb-5'
         value={aboutfiles?.directorMessage || ''}
         onChange={(value)=>{setaboutFiles({...aboutfiles, directorMessage: value})}} />
       </div>
       
 <div className='mb-5 mt-10'>
    <Label > Director's Image </Label>
   <div className='flex gap-5 mt-5'>
    <FileInput
     id="directorimage"
     name="directorimage"
     accept="image/*"
     onChange={handleDrImageChange}
    
    /> 
    <Button onClick={uploadDr}  disabled={drUploadProgress} > 
    { drUploadProgress ? <div className='w-16 h-16'> <CircularProgressbar value={drUploadProgress} text={`${drUploadProgress}`}/> </div> : 'Upload' }</Button>
      </div>
    
 </div>

 {drpreview && <div className='flex justify-center items-center' > <img src={drpreview} alt=""  />  </div>}


  
  
       <div className='min-h-32 mb-5 mt-5 gap-4 flex flex-col py-5'>

     <Label>Intro</Label>

         <ReactQuill theme='snow' 
         placeholder='write about your website...' className='h-32 mb-5'
         value={aboutfiles?.intro || ''}
         onChange={(value)=>{setaboutFiles({...aboutfiles, intro: value})}} />
       </div>

       
       <div className='min-h-32 mb-5 mt-5 gap-4 flex flex-col py-5'>
        
     <Label>Mission</Label>

         <ReactQuill theme='snow' 
         placeholder='write about your website...' className='h-32 mb-5'
         value={aboutfiles?.mission || ''}
         onChange={(value)=>{setaboutFiles({...aboutfiles, mission: value})}} />
       </div>
 

 
       <div className='min-h-32 mb-5 mt-5 gap-4 flex flex-col py-5'>
        
     <Label>Vision</Label>

         <ReactQuill theme='snow' 
         placeholder='write about your website...' className='h-32 mb-5'
         value={aboutfiles?.vision || ''}
         onChange={(value)=>{setaboutFiles({...aboutfiles, vision: value})}} />
       </div>
 
 
       <div className='min-h-32 mb-5 mt-10 gap-4 flex flex-col py-5'>
        
     <Label>Philosophy</Label>

         <ReactQuill theme='snow' 
         placeholder='write about your website...' className='h-32 mb-5'
         value={aboutfiles?.philosophy || ''}
         onChange={(value)=>{setaboutFiles({...aboutfiles, philosophy: value})}} />
       </div>
 
 
 <div className='w-full'>
 
     <Button className='mt-10 w-full mb-2' type='submit'> Submit </Button>
 </div>
       
         </form>
 
 {successMsg && <Alert color='success' >{successMsg}</Alert>}
 
 
 {errMsg && <Alert color='failure' >{errMsg}</Alert>}
     </div>
   )
 
}

export default AboutComp