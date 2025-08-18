import { TextInput, Button, Alert, Modal, ModalHeader,ModalBody } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState,useEffect } from 'react'
import { updateFaliure,updateStart,updateSucess,deleteUserFailure,deleteUserStart,deleteUserSucess,signOutSuccess } from '../Redux/user/slice.js'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'


const DashProfile = () => {
const {currentUser, error} = useSelector(state => state.user)
const [imageFile, setImageFile]= useState('')
const [previewImageUrl, setPreviewImageUrl]= useState('')
const [imgFileUpload, setImgFileUpload] = useState(false)
const [updateSuccessful, setUpdateSuccessful] = useState(null)
const [updateError, setUpdateError] = useState(null)
const newPic = useRef()
const [showModal, setShowModal] = useState(false)

const [formData, setFormDta] = useState({})
const navigate = useNavigate();

const dispatch = useDispatch();
const onChoose =()=> {
  newPic.current.click()
}
const handleChange=(e)=>{
 const file = e.target.files[0]
if(file){
  setImageFile(file)
 const preview = URL.createObjectURL(file)
 setPreviewImageUrl(preview)
}
}


useEffect(()=>{

  if(imageFile){
    uploadImage()
  }
},[imageFile])

const data = new FormData()
data.append('file', imageFile)
data.append('upload_preset', 'codelWebImagesPreset')

const uploadImage = async()=>{

 
const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  try{

 setImgFileUpload(true)
const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
  method:'POST',
  body:data
})

const {url} = await res.json()
 setFormDta({...formData, profilePhoto:url})

  }catch(error){
    console.log('Error Message:', error)
  }finally{
    setImgFileUpload(false)
  }
}

const handleFormChange= (e)=>{
  setFormDta({...formData, [e.target.id]:e.target.value})
}


const handleSubmit= async(e)=>{
e.preventDefault()
setUpdateError(null)
setUpdateSuccessful(null)
if(Object.keys(formData).length === 0){
  setUpdateError('No changes made')
  return
}

if(imgFileUpload){
  setUpdateError('Please Wait for image to upload')
  return;
}

try {

  dispatch(updateStart());
  const res = await fetch(`/api/users/update/${currentUser._id}`, {
    method:'PUT',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(formData)
  })
 
  const fData = await res.json()
  if(!res.ok){
    dispatch(updateFaliure(fData.message));
    setUpdateError(fData.message)

  }else{
   dispatch(updateSucess(fData))
   setUpdateSuccessful('Profile Updated Successfully')
  }
  
} catch (error) {
  dispatch(updateFaliure(error.message))
    setUpdateError(error.message)

}
}

const handleDelete = async ()=>{
setShowModal(false)
  try {
    
 dispatch(deleteUserStart())
      const res = await fetch(`/api/users/delete/${currentUser._id}`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json'
    },
  })
  const data = await res.json();
  console.log(data);

    if(!res.ok){
      
     dispatch(deleteUserFailure(data.message))
    }
    else{
      dispatch(deleteUserSucess(data))
    }
  } catch (error) {

    dispatch(deleteUserFailure(error.message))
  }

}


const handleSignout =async()=>{
  try{
    const res = await fetch('/api/users/signout', {
      method:'POST',
    })
    
    const data = res.json()
    if(!res.ok){
      console.log(error.message)
    }
   else{
    dispatch(signOutSuccess())
   }
  }catch(error){
    console.log(error.message)
  }
}




  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
       <h1 className=' py-2 text-center font-semibold text-3xl'> Profile </h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 '> 
      <input type="file" accept='image/*' ref={newPic} onChange={handleChange} className='hidden'  />
      <div className='w-32 h-32 self-center cursor-pointer 
       shadow-md overflow-hidden rounded-full'>
        
      <img onClick={onChoose} src={ previewImageUrl || currentUser.profilePhoto } alt='user'  className='rounded-full 
      w-full h-full object-cover border-8 border-[lightgray]'/>
        </div>  

        <TextInput type='text'  id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleFormChange}/>
        <TextInput type='email'  id='email' placeholder='email@mail' defaultValue={currentUser.email} onChange={handleFormChange}/>
        <TextInput type='password'  id='password' placeholder='password' defaultValue='' onChange={handleFormChange}/>
      
      <Button type='submit' outline disabled={imgFileUpload}> 
       { imgFileUpload ? 'loading...': 'Update'}
      </Button>

{currentUser.isAdmin && ( 
  <Link to={'/create-post'}>  
 
  <Button type='button' className='w-full'>
  Create a post 
</Button>
</Link>
)}
 
    </form>

    <div className='flex text-red-500 justify-between mt-5 '> 
      <span className='cursor-pointer' onClick={()=>setShowModal(true)}> Delete Account </span> 
      <span className='cursor-pointer' onClick={handleSignout}>Sign out</span>
      </div>
{
  updateSuccessful ? <Alert color='success' className='mt-5'> {updateSuccessful} </Alert>: null
}
{ updateError ? <Alert color='failure' className='mt-5'> {updateError} </Alert> : null}
   
{ error && (<Alert color='failure' className='mt-5'> {error} </Alert> )}
   
   <Modal show={showModal} onClick={()=>setShowModal(false)} popup size='md'>
    <ModalHeader/>
    <ModalBody>
      <div className='tect-center flex flex-col items-center justify-center'>
<HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
dark:text-gray200 mb-4 mx auto'/>

<h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
  Are you sure?
</h3>

<div className='flex gap-5 items-center'>
  <Button color="red" onClick={handleDelete}> Yes am sure!</Button>

  <Button color="gray" onClick={()=>setShowModal(false)}>No,Cancel</Button>
</div>
      </div>
    </ModalBody>
   </Modal>
    </div>
  )
}

export default DashProfile 