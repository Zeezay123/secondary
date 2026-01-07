import {
  Alert,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  TextInput,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Popover, ChevronLeftIcon, ChevronRightIcon 
} from "flowbite-react";
import React, { useState, useEffect } from "react";
import { FaFile } from "react-icons/fa6";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const AnnounceTable = () => {
  const [annData, setannData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [annDatas, setannDatas] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [succMsg, setSuccMsg] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");
  const [file, setImageFile] = React.useState("");
  const [preview, setpreview] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [fileProg, setFileProg] = React.useState(0);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [teacherToDelete, setTeacherToDelete] = React.useState(null);
  const [limit, setLimit] = useState(10)
   const [pagenum, setPageNum] = useState(1)
   const [tRows, setTRows] = useState('')


  const startIndex = (pagenum - 1) * limit 

  React.useEffect(() => {
          const fetchAnnData = async ()=>{
              try {
                  const res = await fetch(`/api/announce/getAnnounce?startIndex=${startIndex}&limit=${limit}`, {
                      method:'GET',
                      headers:{
                        'Content-Type':'application/json'},
                      credentials:'include',
                     })  
  
                       if(!res.ok) {
                          console.log(res.statusText)
                       }
                  
                       const data = await res.json()
                     
                       setannData(data.data)
                        setTRows(data.total)
                        console.log(data)
  
                  }catch(error){
                      console.error('Error fetching Announcments:', error);
                  }
  
              }
  
  
              fetchAnnData()
      },[limit,pagenum])


      const totalPage = Math.ceil( tRows / limit )
    const handleSubmit = async (id) => {
        try {
            // Fetch annDatas from API here

           const res = await fetch(`/api/announce/updateannouce/${id}`, {
            method:'PUT',
            headers:{
              'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify(annDatas)
           }) 
           
           if(!res.ok) {
            console.log(res.statusText)
            return
           }

        
            setSuccMsg('Annoucement added successfully!')
            setTimeout(() =>{
          
            setShowModal(false)
            }, 2000)
           



        } catch (error) {
            console.error('Error fetching Announcement:', error);
        }

      }

const handleShowModal= async(id)=>{

            try {
                const res = await fetch(`/api/announce/getAnnounce/${id}`, {
                    method:'GET',
                    headers:{
                      'Content-Type':'application/json'},
                    credentials:'include',
                   })  

                     if(!res.ok) {
                        console.log(res.statusText)
                     }
                
                     const data = await res.json()
               
                     setannDatas(data)
                    console.log(data)
                }catch(error){
                    console.error('Error fetching Announcments:', error);
                }

     

    setShowModal(true)
    }


   const handleCloseModal=()=>{
        setShowModal(false)
        setannDatas({title:'', content:'',image:''})
        setpreview('')
        setErrMsg('')
        setSuccMsg('')
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
        setannDatas({...annDatas, image:data})
        setSuccMsg('Image uploaded successfully')
        setErrMsg('')



      } catch (error) {
        console.log('Error uploading file:', error)
      }
    }
      

  const handleDelete= async()=>{
        if (!teacherToDelete) return;
        
        try {
             const res = await fetch(`/api/announce/deleteannounce/${teacherToDelete}`, {
                    method:'DELETE',
                    headers:{
                      'Content-Type':'application/json'},
                    credentials:'include',
                   })  

                     if(!res.ok) {
                        console.log(res.statusText)
                     }
                
                     const data = await res.json()
                    
                     setSuccMsg(data)

                     setTimeout(()=>{
                        setDeleteModal(false)
                        setTeacherToDelete(null)
                     },1500)
                  
                     alert(data)

        }catch(error){

        }
    }

    console.log(annDatas.id)

  return (
    <div className="max-w-7xl mx-auto py-12">
      <Table hoverable border={0}>
        <TableHead className="flex">
          <TableHeadCell>id</TableHeadCell>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Description</TableHeadCell>
          <TableHeadCell>Image</TableHeadCell>
          <TableHeadCell>Update</TableHeadCell>
          <TableHeadCell>Delete</TableHeadCell>
        </TableHead>

        <TableBody>
          {annData.length > 0? (
            annData.map((yb) => (
              <TableRow key={yb.id}>
                <TableCell>{yb.id}</TableCell>
                <TableCell>{yb.title}</TableCell>
                <TableCell><span className="line-clamp-2" dangerouslySetInnerHTML={{__html: yb.content}}></span></TableCell>
                <TableCell>
                  {" "}
                  <img src={`uploads/${yb.image}`} alt="" />{" "}
                </TableCell>

                <TableCell
                  className="text-blue-600 font-semibold cursor-pointer"
                  onClick={() => handleShowModal(yb.id)}
                >
                  Edit
                </TableCell>
                <TableCell
                  className="text-red-600 font-semibold cursor-pointer"
                  onClick={() => {setDeleteModal(true); setTeacherToDelete(yb.id)}}
                >
                  Delete
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="flex justify-center items-center p-3">
              <p className=" flex font-bold justify-center items-center text-center">
                {" "}
                No Data Available
              </p>{" "}
            </TableRow>
          )}
        </TableBody>
        <div className='flex  justify-between mt-5 items-center'> 
                  
                    <div className='text-sm text-gray-600 font-[inter]' >Total number of Announcements is {tRows} </div>
        
                   <div className='flex gap-10 items-center'>
                   
        
                    <select className='border-[1px] border-slate-600 rounded w-fit px-1 focus:outline-0' value={limit} onChange={(e)=>{setLimit(e.target.value)
                        setPageNum(1)}
                    }>
                     <option value={5}> 5 </option>
                     <option value={10}> 10 </option>
                     <option value={15}> 15 </option>
                     <option value={20}> 20</option>
                     <option value={50}> 50</option>
                     <option value={75}> 75</option>
                     <option value={100}> 100</option>
                    </select>
         <div className='font-[inter] text-black text-sm font-semibold'> Page {pagenum} of {totalPage}</div>
                  <div className=' flex items-center justify-center gap-2'> 
              <button className={`flex items-center justify-center p-1 border-2 ${pagenum === 1 ?' border-slate-100 text-slate-300':'border-blue-800 text-blue-800'} rounded text-xs`} disabled={pagenum === 1} onClick={()=>setPageNum((p)=> Math.max(p-1,1))}> <ChevronLeftIcon /> </button> 
              <button className={`flex items-center justify-center p-1 border-2 ${pagenum === totalPage ?' border-slate-100 text-slate-300':'border-blue-800 text-blue-800'} rounded text-xs`} disabled={pagenum === totalPage} onClick={()=>setPageNum((p)=>Math.min(p+1,totalPage))}><ChevronRightIcon/> </button>
            </div>     </div>   
                  </div>     
      </Table>


      
      <Modal show={showModal} onClose={handleCloseModal} className='flex flex-col gap-5 justify-center items-center'> 
          <ModalHeader className='text-center font-bold '> Update announcement details</ModalHeader>
          <ModalBody className='flex flex-col gap-5'>
      
            {succMsg && <Alert color='success'> {succMsg} </Alert>}
            {errMsg && <Alert color='red'> {errMsg}</Alert>}
            <div >
              <Label htmlFor='title'>Enter Title of Announcement </Label>
              <TextInput 
              id='title'
              placeholder='enter title'
              value={annDatas.title}
              onChange={(e)=> setannDatas({...annDatas, title:e.target.value})}
              />
            </div>
      
             <div >
              <Label htmlFor='content'>Enter description </Label>
         
          <ReactQuill
                theme="snow"
                placeholder="Write Announcement"
                className="h-72 mb-5"
               value={annDatas.content}
                onChange={(value) => setannDatas({ ...annDatas, content: value })}
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
            { annDatas.image &&  <div className='flex text-green-500 p-2'> <FaCheck/> uploaded </div>}
             </div>
            </div>
      
            
      
             <Button onClick={() => handleSubmit(annDatas.id)}>Submit</Button>
          </ModalBody>
           </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setTeacherToDelete(null);
        }}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this announcement?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleDelete}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setDeleteModal(false);
                  setTeacherToDelete(null);
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AnnounceTable;
