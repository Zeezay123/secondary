import { Alert, FileInput, Label, Modal, ModalBody, ModalHeader,  Textarea, TextInput, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Popover } from 'flowbite-react'
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FaCheck } from 'react-icons/fa6';
import AnnounceTable from './AnnounceTable';


const DashAnnounce = () => {
  const [annData, setAnndata] = useState({ title: '', content: '', image:'' });
  const [alert, setAlert] = useState({ type: '', message: '' }); // For notifications
  const [showModal, setShowModal] = React.useState(false)
     const [succMsg, setSuccMsg] = React.useState('')
      const [errMsg, setErrMsg] = React.useState('')
      const [file, setImageFile] = React.useState('')
      const [preview, setpreview] = React.useState('')



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('/api/announce/');
  //       if (!res.ok) {
  //         console.log('cannot fetch data');
  //         return;
  //       }

  //       const data = await res.json();
  //       setAnndata(data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleCloseModal=()=>{
        setShowModal(false)
        setAnndata({title:'', content:'',image:''})
        setpreview('')
        setErrMsg('')
        setSuccMsg('')
    }


 const handleSubmit = async () => {
        try {
            // Fetch yearbooks from API here

           const res = await fetch(`/api/announce/createannounce`, {
            method:'POST',
            headers:{
              'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify(annData)
           }) 
           
           if(!res.ok) {
            console.log(res.statusText)
            return
           }

           console.log(annData)
            setSuccMsg('Announcement added successfully!')
            setTimeout(() =>{
          
            setShowModal(false)
            }, 2000)
           



        } catch (error) {
            console.error('Error fetching Announcements:', error);
        }

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
        setAnndata({...annData, image:data})
        setSuccMsg('Image uploaded successfully')
        setErrMsg('')



      } catch (error) {
        console.log('Error uploading file:', error)
      }
    }




  return (


<div className='mx-auto max-w-7xl py-15 '>

<h1 className='text-2xl  my-5 font-bold text-center'> Announcements Page</h1>

<Button onClick={()=>setShowModal(true)}> add announcement</Button>



<AnnounceTable/>
<Modal show={showModal} onClose={handleCloseModal} className='flex flex-col gap-5 justify-center items-center'> 
    <ModalHeader className='text-center font-bold '> Enter announcement details</ModalHeader>
    <ModalBody className='flex flex-col gap-5'>

      {succMsg && <Alert color='success'> {succMsg} </Alert>}
      {errMsg && <Alert color='red'> {errMsg}</Alert>}
      <div >
        <Label htmlFor='title'>Enter Title of Announcement </Label>
        <TextInput 
        id='title'
        placeholder='enter title'
        value={annData.title}
        onChange={(e)=> setAnndata({...annData, title:e.target.value})}
        />
      </div>

       <div >
        <Label htmlFor='content'>Enter description </Label>
   
    <ReactQuill
          theme="snow"
          placeholder="Write Announcement"
          className="h-72 mb-5"
         value={annData.content}
          onChange={(value) => setAnndata({ ...annData, content: value })}
         />


      </div>
      
       <div >
        <Label htmlFor='image'>  Image </Label>
    <div className='flex gap-2'>   <FileInput
       id='image'
       onChange={(e)=>handleChangeImage(e)}
       />
       
       <Button onClick={uploadImage}>Upload</Button></div>  

       <div className='p-2'>
        <img src={preview} alt="" />
      { annData.image &&  <div className='flex text-green-500 p-2'> <FaCheck/> uploaded </div>}
       </div>
      </div>

      

       <Button onClick={handleSubmit}>Submit</Button>
    </ModalBody>
     </Modal>


    </div>
  );
};

export default DashAnnounce;
