import { Alert, Button, FileInput, Label, Modal, ModalBody, ModalHeader, Table, Textarea, TextInput } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FaCheck } from 'react-icons/fa6';
import YearbookTable from './YearbookTable'




const DashYearBook = () => {

    const [showModal, setShowModal] = React.useState(false)
    const [yearbooks, setYearbooks] = useState({title:'', description:'', image:'', file:''})
    const [yearbookList, setYearbookList] = useState([])
    const [succMsg, setSuccMsg] = React.useState('')
    const [errMsg, setErrMsg] = React.useState('')
    const [file, setImageFile] = React.useState('')
    const [pdfFile, setPdfFile] = React.useState('')
    const [preview, setpreview] = React.useState('')
    const [uploadProgress, setUploadProgress] = React.useState(0)
    const [fileProg, setFileProg] = React.useState(0)

    useEffect(() => {

    }, [])


    const handleSubmit = async () => {
        try {
            // Fetch yearbooks from API here

           const res = await fetch(`/api/yearbook/createyearbook`, {
            method:'POST',
            headers:{
              'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify(yearbooks)
           }) 
           
           if(!res.ok) {
            console.log(res.statusText)
            return
           }

           console.log(yearbooks)
            setSuccMsg('Yearbook added successfully!')
            setTimeout(() =>{
          
            setShowModal(false)
            }, 2000)
           



        } catch (error) {
            console.error('Error fetching yearbooks:', error);
        }

      }

    const handleShowModal=()=>{
    setShowModal(true)
    }

     

    const handleCloseModal=()=>{
        setShowModal(false)
        setYearbooks({title:'', description:'',image:'', file:''})
        setpreview('')
        setErrMsg('')
        setSuccMsg('')
    }


    const handleChangeFile= async (e)=>{
     
       const file=e.target.files[0]

      setPdfFile(file)

    }

    const handleChangeImage=(e)=>{
        const file=e.target.files[0]

      setImageFile(file)

      const preview = URL.createObjectURL(file)
       setpreview(preview)
    }

    const uploadImage = async()=>{
         
      const formdata = new FormData()
      formdata.append('file',file)

          try {
         
        const res = await axios.post('/api/uploads', formdata, {
        headers: {  'content-type': 'multipart/form-data'},
        onUploadProgress:(progressEvent)=>{
             const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
             )

             setUploadProgress(percent)
        }

        })

        if(!res.ok) {
          setErrMsg(res.statusText)
          console.log(res)
          
        }

        const data = await res.data
        setYearbooks({...yearbooks, image:data})
        setSuccMsg('Image uploaded successfully')
        setErrMsg('')



      } catch (error) {
        console.log('Error uploading file:', error)
      }
    }
      
    const uploadFile =async()=>{
        const file = pdfFile
        const formdata = new FormData()
        formdata.append('file',file)
      



       
      try {

        const res = await axios.post(`/api/uploads/`, formdata, {  
          headers:{ 
            'Content-Type':'multipart/form-data'
          },
         onUploadProgress:(progressEvent)=>{
              const percent = Math.round((progressEvent.loaded * 100)/ progressEvent.total )
         
             setFileProg(percent)
            }

        })
         
           if(!res.ok)
           {
            setSuccMsg('')
             setErrMsg(res.statusText)
           }

        const data = await res.data
        console.log(data)
         setYearbooks({...yearbooks,file:data})
         setSuccMsg('pdf uploaded successfuly')
         setErrMsg('')


      }catch(err){
        setSuccMsg('')
        setErrMsg(err)
      }
    }


  return (
    <div className='max-w-7xl mx-auto border-2 flex flex-col items-center justify-center p-5 mt-10'>
        <h1 className='text-2xl font-bold text-center my-5'>Add Yearbook here...</h1>
        <Button onClick={handleShowModal}>Add yearbook </Button>


<YearbookTable/>

  

  <Modal show={showModal} onClose={handleCloseModal} className='flex flex-col gap-5 justify-center items-center'> 
    <ModalHeader className='text-center font-bold '> Enter yearbook details</ModalHeader>
    <ModalBody className='flex flex-col gap-5'>

      {succMsg && <Alert color='success'> {succMsg} </Alert>}
      {errMsg && <Alert color='red'> {errMsg}</Alert>}
      <div >
        <Label htmlFor='title'>Enter Title of Yearbook </Label>
        <TextInput 
        id='title'
        placeholder='enter title'
        value={yearbooks.title}
        onChange={(e)=> setYearbooks({...yearbooks, title:e.target.value})}
        />
      </div>

       <div >
        <Label htmlFor='content'>Enter Yearbook  description </Label>
        <Textarea
        row={4} 
        id='content'
        placeholder='enter short description'
        value={yearbooks.description}
        onChange={(e)=> setYearbooks({...yearbooks, description:e.target.value})}
        
        />
      </div>
      
       <div >
        <Label htmlFor='image'> Yearbook Image </Label>
    <div className='flex gap-2'>   <FileInput
       id='image'
       onChange={(e)=>handleChangeImage(e)}
       />
       
       <Button onClick={uploadImage}>Upload</Button></div>  

       <div className='p-2'>
        <img src={preview} alt="" />
      { yearbooks.image &&  <div className='flex text-green-500 p-2'> <FaCheck/> uploaded </div>}
       </div>
      </div>

        <div >
        <Label htmlFor='image'> Yearbook file </Label>
    <div className='flex gap-2'>   <FileInput
       id='image'
        onChange={(e)=>handleChangeFile(e)}
        
       />
       { yearbooks.file &&  <div className='flex text-green-500 p-2'> <FaCheck/> uploaded </div>}
       <Button onClick={uploadFile}>Upload</Button></div>  
      </div>

       <Button onClick={handleSubmit}>Submit</Button>
    </ModalBody>
     </Modal>


        
        </div>
  )
}

export default DashYearBook