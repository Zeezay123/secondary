import { Button, Label, Textarea, TextInput, Alert, FileInput, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, ModalHeader } from 'flowbite-react'
import React, { use } from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { set } from 'mongoose'

const Dashprincipal = () => {

const [principal, setprincipal] = useState({
    name: '',
    message: '',
    image: ''
})
const [principalData, setPrincipalData] = useState(null)
const [showModal, setShowModal] = useState(false)
const [selectedPrincipal, setSelectedPrincipal] = useState({
    name: '',
    message: '',
    image: ''
})
const [file, setFile] = useState(null)
const [preview, setPreview] = useState('')
const [successMsg, setSuccessMsg] = useState('')
const [errMsg, setErrMsg] = useState('')
const [isEditing, setIsEditing] = useState(false)

useEffect(() => {
    getData()
}, [])

const getData = async () => {
    try{
        const response = await fetch('/api/directory/principal')
        
        if(!response.ok){
            console.log('No principal data found')
            setIsEditing(false)
            setPrincipalData(null)
            return
        }

        const data = await response.json()
        setprincipal({
            name: data.name || '',
            message: data.message || '',
            image: data.image || ''
        })
        setPrincipalData(data)
        setIsEditing(true)

    }catch(err){
        console.log(err.message)
        setIsEditing(false)
        setPrincipalData(null)
    }
}

const uploadImage = async () => {
    if (!file) {
        setErrMsg('Please select an image')
        return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
        const res = await axios.post('/api/uploads', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        const data = res.data
        setprincipal({ ...principal, image: data })
        setSuccessMsg('Image uploaded successfully')
        setErrMsg('')
    } catch (error) {
        setErrMsg('Error uploading image')
        console.log(error.message)
    }
}

const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    const previewUrl = URL.createObjectURL(selectedFile)
    setPreview(previewUrl)
}

const handleOpenModal = () => {
    if (principalData) {
        setSelectedPrincipal({
            name: principalData.name || '',
            message: principalData.message || '',
            image: principalData.image || ''
        })
    }
    setShowModal(true)
    setErrMsg('')
    setSuccessMsg('')
}

const handleCloseModal = () => {
    setShowModal(false)
    setSelectedPrincipal({
        name: '',
        message: '',
        image: ''
    })
    setPreview('')
    setFile(null)
    setErrMsg('')
    setSuccessMsg('')
}

const handleUpdate = async () => {
    try {
        const response = await fetch('/api/directory/updateprincipal', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(selectedPrincipal)
        })

        if (!response.ok) {
            const errorData = await response.json()
            setErrMsg(errorData.message || 'Failed to update principal')
            return
        }

        const data = await response.json()
        setSuccessMsg('Principal updated successfully')
        setErrMsg('')
        setPreview('')
        getData()


        
        setTimeout(() => {
            handleCloseModal()
        }, 2000)
    } catch (error) {
        setErrMsg(error.message || 'An error occurred')
    }
}

const handleSubmit = async(e)=>{
    e.preventDefault() 

    try{
        const url = isEditing ? '/api/directory/updateprincipal' : '/api/directory/createprincipal'
        const method = isEditing ? 'PUT' : 'POST'

        const response = await fetch(url, {
            method: method,
            headers:{       
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body:JSON.stringify(principal)
        })          
        
        if(!response.ok){
            const errorData = await response.json()
            setErrMsg(errorData.message || 'Failed to save principal data')
            return
        }

      

        const data = await response.json()
        setSuccessMsg(isEditing ? 'Principal updated successfully' : 'Principal added successfully')
        setErrMsg('')
        setPreview('')
        setIsEditing(true)
        getData()  
        console.log(data)
    } catch(error){
        setErrMsg(error.message || 'An error occurred')
        console.log(error.message)
    }

}

console.log(principalData)


  return (
    <div className='max-w-7xl mx-auto  py-12 px-4 sm:px-6 lg:px-8 '>
        
        <h1 className='text-3xl font-bold mb-6 mx-auto text-center'>Principal's Dashboard</h1>

        {successMsg && <Alert color='success' className='mb-4'>{successMsg}</Alert>}
        {errMsg && <Alert color='failure' className='mb-4'>{errMsg}</Alert>}

        <div className='mx-auto space-y-6'>
            <div>
            <Label htmlFor='name'> Principal's Name </Label>
            <TextInput
            id='name'
            placeholder='enter principal name'
            required={true}

            onChange={(e)=>setprincipal({...principal, name:e.target.value})}
            />
            </div>

            <Label htmlFor='message'> Principal's Message </Label>
          <div>
         
            <Textarea
            id='message'
             rows={6}
             className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
             placeholder="Enter principal's message here..."
              onChange={(e)=>setprincipal({...principal, message:e.target.value})}/>


   
          </div>

          <div>
            <Label htmlFor='image'>Principal's Image</Label>
            <div className='flex gap-2 mt-2'>
              <FileInput
                id='image'
                accept='image/*'
                onChange={handleImageChange}
              />
              <Button onClick={uploadImage}>Upload Image</Button>
            </div>
            
            {preview && (
              <div className='mt-4'>
                <img src={preview} alt='Preview' className='w-32 h-32 object-cover rounded-md' />
              </div>
            )}
          </div>

        </div>
        <Button className='mt-6 w-full' onClick={handleSubmit}> 
          {isEditing ? 'Update Principal' : 'Add Principal'}
        </Button>

        {/* Principal Information Table */}
        <div className='mt-12 overflow-x-auto'>
          <div className="font-bold text-black text-2xl mb-5">Current Principal Information</div>
          <Table hoverable className='border-0 f'>
            <TableHead className='flex'>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {principalData ? (
                <TableRow>
                  <TableCell className='font-medium'>{principalData.name}</TableCell>
                  <TableCell>
                    <div className='max-w-md truncate'>{principalData.message}</div>
                  </TableCell>
                  <TableCell>
                    {principalData.image && (
                      <img src={`uploads/${principalData.image}`} alt="Principal" className='w-20 h-20 object-cover rounded' />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size='sm' onClick={handleOpenModal}>Edit</Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className='text-center text-lg font-medium p-7'>
                    No principal information available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Update Modal */}
        <Modal show={showModal} onClose={handleCloseModal} size='xl'>
          <ModalHeader>Update Principal Information</ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-4'>
              {successMsg && <Alert color='success'>{successMsg}</Alert>}
              {errMsg && <Alert color='failure'>{errMsg}</Alert>}
              
              <div>
                <Label htmlFor='modal-name'>Principal's Name</Label>
                <TextInput
                  id='modal-name'
                  placeholder='Enter principal name'
                  value={selectedPrincipal.name}
                  onChange={(e) => setSelectedPrincipal({ ...selectedPrincipal, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor='modal-message'>Principal's Message</Label>
                <Textarea
                  id='modal-message'
                  rows={6}
                  placeholder="Enter principal's message here..."
                  value={selectedPrincipal.message}
                  onChange={(e) => setSelectedPrincipal({ ...selectedPrincipal, message: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor='modal-image'>Principal's Image</Label>
                <div className='flex gap-2 mt-2'>
                  <FileInput
                    id='modal-image'
                    accept='image/*'
                    onChange={handleImageChange}
                  />
                  <Button onClick={uploadImage}>Upload Image</Button>
                </div>
                
                {preview && (
                  <div className='mt-4'>
                    <img src={preview} alt='Preview' className='w-32 h-32 object-cover rounded-md' />
                  </div>
                )}
                
                {selectedPrincipal.image && !preview && (
                  <div className='mt-4'>
                    <img src={`uploads/${selectedPrincipal.image}`} alt='Principal' className='w-32 h-32 object-cover rounded-md' />
                  </div>
                )}
              </div>

              <Button onClick={handleUpdate} className='mt-4 w-full'>Update Principal</Button>
            </div>
          </ModalBody>
        </Modal>
        </div>
  )
}

export default Dashprincipal