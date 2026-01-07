import { Alert, FileInput, Label, Modal, ModalBody, ModalHeader,  Textarea, TextInput, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Popover } from 'flowbite-react'
import React,{useState,useEffect} from 'react'
import { FaFile } from 'react-icons/fa6'
import axios from 'axios'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FaCheck } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from "react-icons/hi";




const YearbookTable = () => {
    const [yearbook, setyearbook] = React.useState([])
const [showModal, setShowModal] = React.useState(false)
    const [yearbooks, setYearbooks] = useState({title:'', content:'', image:'', file:''})
    const [yearbookList, setYearbookList] = useState([])
    const [succMsg, setSuccMsg] = React.useState('')
    const [errMsg, setErrMsg] = React.useState('')
    const [file, setImageFile] = React.useState('')
    const [pdfFile, setPdfFile] = React.useState('')
    const [preview, setpreview] = React.useState('')
    const [uploadProgress, setUploadProgress] = React.useState(0)
    const [fileProg, setFileProg] = React.useState(0)
    const [deleteModal, setDeleteModal] = React.useState(false)




React.useEffect(() => {
        const fetchYearbooks = async ()=>{
            try {
                const res = await fetch(`/api/yearbook/getyearbooks`, {
                    method:'GET',
                    headers:{
                      'Content-Type':'application/json'},
                    credentials:'include',
                   })  

                     if(!res.ok) {
                        console.log(res.statusText)
                     }
                
                     const data = await res.json()
                     console.log(data)
                     setyearbook(data)

                }catch(error){
                    console.error('Error fetching yearbooks:', error);
                }

            }


            fetchYearbooks()
    },[])


    const handleSubmit = async (id) => {
        try {
            // Fetch yearbooks from API here

           const res = await fetch(`/api/yearbook/updateyearbook/${id}`, {
            method:'PUT',
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

    const handleShowModal= async (id)=>{

            try {
                const res = await fetch(`/api/yearbook/getyearbook/${id}`, {
                    method:'GET',
                    headers:{
                      'Content-Type':'application/json'},
                    credentials:'include',
                   })  

                     if(!res.ok) {
                        console.log(res.statusText)
                     }
                
                     const data = await res.json()
                     console.log(data)
                     setYearbooks(data)

                }catch(error){
                    console.error('Error fetching yearbooks:', error);
                }

     

    setShowModal(true)
    }

     

    const handleCloseModal=()=>{
        setShowModal(false)
        setYearbooks({title:'', content:'',image:'', file:''})
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


    const handleDelete= async(id)=>{
        try {
             const res = await fetch(`/api/yearbook/deleteyearbook/${id}`, {
                    method:'DELETE',
                    headers:{
                      'Content-Type':'application/json'},
                    credentials:'include',
                   })  

                     if(!res.ok) {
                        console.log(res.statusText)
                     }
                
                     const data = await res.json()
                     console.log(data)
                     setSuccMsg(data)

                     setTimeout(()=>{
                        setDeleteModal(false)
                     },1500)
                  
                     alert(data)

        }catch(error){

        }
    }


  return (
    <div className='max-w-7xl mx-auto py-12'>
        
      <Table hoverable >
         <TableHead className='flex'> 
            <TableHeadCell>id</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Pdf</TableHeadCell>
            <TableHeadCell>Update</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
         </TableHead>

         <TableBody>
            { yearbook.length > 0 ? yearbook.map((yb)=>(
                <TableRow key={yb.id}>
                <TableCell>{yb.id}</TableCell>
                <TableCell>{yb.title}</TableCell>
                <TableCell>{yb.content}</TableCell>
                <TableCell> <img src={`uploads/${yb.image}`} alt="" /> </TableCell>


                <TableCell> 
               {yb.pdf ?     <a href={`uploads/${yb.pdf}`} target={'_blank'}> 
                 <FaFile size={24} color='blue'/></a> : 
             <a href='#' > 
                 <FaFile size={24} color='blue'/></a> 
              
                 } 
                 </TableCell>


                <TableCell className='text-blue-600 font-semibold cursor-pointer' onClick={()=>handleShowModal(yb.id)}>Edit</TableCell>
                <TableCell className='text-red-600 font-semibold cursor-pointer' onClick={() => setDeleteModal(true)} > Delete 
             
<Modal show={deleteModal} onClose={()=>setDeleteModal(false)} popup>
    <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={()=>handleDelete(yb.id)} >
                Yes, I'm sure
              </Button>
              <Button color="alternative" onClick={() => setDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
</Modal>

                </TableCell>
                </TableRow>
            )) : <TableRow className='flex justify-center items-center p-3'><p className=' flex font-bold justify-center items-center text-center'> No Data Available</p> </TableRow>}
               
         </TableBody>
      </Table>




<Modal show={showModal} onClose={handleCloseModal} className='flex flex-col gap-5 justify-center items-center'> 
    <ModalHeader className='text-center font-bold '> Update yearbook details</ModalHeader>
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
        value={yearbooks.content}
        onChange={(e)=> setYearbooks({...yearbooks, content:e.target.value})}
        
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
      { (yearbooks.image  && fileProg == 100) &&  <div className='flex text-green-500 p-2'> <FaCheck/> uploaded </div>}
       </div>
      </div>

        <div >
        <Label htmlFor='image'> Yearbook file </Label>
    <div className='flex gap-2'>   <FileInput
       id='image'
        onChange={(e)=>handleChangeFile(e)}
        
       />
       { fileProg == 100 &&  <div className='flex text-green-500 p-2'> <FaCheck/> uploaded </div>}
       <Button onClick={uploadFile}>Upload</Button></div>  
      </div>

       <Button onClick={()=>handleSubmit(yearbooks.id)}>Submit</Button>
    </ModalBody>
     </Modal>


    </div>
  )

}

export default YearbookTable