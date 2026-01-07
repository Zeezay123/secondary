import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PortalCTA from '../components/PortalCTA'
import { Alert, Button, FileInput, Label, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'
import axios from 'axios'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FaCheck } from 'react-icons/fa6'
import { set } from 'mongoose'

const ClubPage = () => {
    const location = useLocation()
    const [clubData, setClubData] = useState('')
    const [clubMember, setClubMember] = useState({
        club_id:'',
        name: '',
        role: '',
        photo: ''
    })

    const [tableData, setTableData] = useState([])
    const [updateMemberData, setUpdateMemberData] = useState({
        club_id:'',
        name: '',
        role: '',
        photo: ''
    })

    const [file, setFile] = useState('')
    const [updatefile, setUpdateFile] = useState('')
    const [preview, setPreview] = useState('')
    const [updatepreview, setUpdatePreview] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [tab, setTab] = useState('')
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if(tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

    useEffect(() => {
        if(tab) {
            fetchClubData()
        }
    }, [tab])

    const fetchClubData = async () => {
        try {
            const [clubRes, memberRes] = await Promise.all([fetch(`/api/clubs/clubsub/${tab}`), fetch(`/api/clubs/clubmember/club/${tab}`)])
            // const response = await fetch(`/api/clubs/clubsub/${tab}`)
           
            if(!clubRes.ok || !memberRes.ok) {
                setErrMsg(clubRes.statusText || memberRes.statusText)
                return
            }

            const [clubdata, memdata] = await Promise.all([clubRes.json(), memberRes.json()])
            setClubData(clubdata[0])
            setClubMember({...clubMember, club_id: clubdata[0].id})
            setTableData(memdata)
            console.log(clubdata)
            console.log(memdata)
        } catch(err) {
            setErrMsg(err.message)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(!file) return
        
        setFile(file)
        const previewUrl = URL.createObjectURL(file)
        setPreview(previewUrl)
        setErrMsg('')
    }
    //for update image
    const handleUpdateImageChange = (e) => {
        const file = e.target.files[0]
        if(!file) return
        
        setUpdateFile(file)
        const previewUrl = URL.createObjectURL(file)
        setUpdatePreview(previewUrl)
        setErrMsg('')
    }

    const Upload = async() => {
        if(!file) {
            setErrMsg('Please select a file to upload')
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            setIsUploading(true)
            setProgress(0)
            
            const response = await axios.post(`/api/uploads`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgress(percent)
                }
            })

            const data = response.data
            setSuccessMsg('Image uploaded successfully!')
            setClubMember({...clubMember, photo: data})
            setErrMsg('')
            
        } catch(err) {
            setErrMsg(err.message || 'Upload failed')
            setSuccessMsg('')
        } finally {
            setIsUploading(false)
        }
    }

    //update upload
    const updateUpload = async() => {
        if(!updatefile) {
            setErrMsg('Please select a file to upload')
            return
        }

        const formData = new FormData()
        formData.append('file', updatefile)

        try {
            setIsUploading(true)
            setProgress(0)
            
            const response = await axios.post(`/api/uploads`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setProgress(percent)
                }
            })

            const data = response.data
            setSuccessMsg('Image uploaded successfully!')
            setUpdateMemberData({...updateMemberData, photo: data})
            setErrMsg('')

            console.log(data)
            
        } catch(err) {
            setErrMsg(err.message || 'Upload failed')
            setSuccessMsg('')
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async() => {
        try {
            const response = await fetch('/api/clubs/clubmember/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(clubMember)
            })

            if(!response.ok) {
                const errorData = await response.json()
                setErrMsg(errorData.message || 'Failed to create member')
                return
            }

            setSuccessMsg('Member added successfully!')
            setClubMember({club_id: clubData.id, name: '', role: '', photo: ''})
            setFile('')
            setPreview('')
            setErrMsg('')
        } catch(err) {
            setErrMsg(err.message)
        }
    }

    const handleOpenModal=(id)=> {
        setShowModal(true)
        setSelectedId(id)
    }

    const handleCloseModal =()=>{
        setShowModal(false)
        fetchClubData()
    }   

    const handleUpdate = async() => {
        // Update member logic here
        try{

            const response = await fetch(`/api/clubs/clubmember/update/${selectedId}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials:'include',

                body:JSON.stringify(updateMemberData)
            })

            if(!response.ok){
                setErrMsg(response.message)
            }

            setSuccessMsg('Update Successfully')
            setUpdateMemberData({club_id: clubData.id, name: '', role: '', photo: ''})
            setErrMsg('')
           

            setTimeout(() =>{
                setShowModal(false )
                fetchClubData()
            },2000)

        }catch(error){
            setSuccessMsg('')
            setErrMsg(error.message || 'An error occurred')
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* <h1 className="text-3xl font-bold mb-2">{clubData.title}</h1> */}
            <h2 className="text-xl mb-6">Member Information</h2>

            {errMsg && <Alert color="failure" className="mb-4">{errMsg}</Alert>}
            {successMsg && <Alert color="success" className="mb-4">{successMsg}</Alert>}

            {isUploading && (
                <div className="w-20 h-20 mx-auto mb-4">
                    <CircularProgressbar value={progress} text={`${progress}%`} />
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Member Name</Label>
                    <TextInput
                        required
                        id="name"
                        value={clubMember.name}
                        onChange={(e) => setClubMember({...clubMember, name: e.target.value})}
                        placeholder="Enter member name"
                    />
                </div>

                <div>
                    <Label htmlFor="role">Role</Label>
                    <TextInput
                        required
                        id="role"
                        value={clubMember.role}
                        onChange={(e) => setClubMember({...clubMember, role: e.target.value})}
                        placeholder="Enter role"
                    />
                </div>

                <div>
                    <Label htmlFor="Updatephoto">Image URL</Label>
                    <div className="flex gap-2">
                        <FileInput
                            id="updatephoto"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="flex-1"
                        />
                        <Button onClick={Upload} disabled={!file || isUploading}>
                            Upload
                        </Button>
                    </div>
                </div>

                {preview && (
                    <div className="mt-4">
                        <img src={preview} alt="Preview" className="max-w-xs rounded-lg shadow-md" />
                        {clubMember.photo && (
                            <p className="text-green-600 flex items-center gap-1 mt-2">
                                <FaCheck /> Uploaded
                            </p>
                        )}
                    </div>
                )}

                <Button onClick={handleSubmit} className="w-full">
                    Add Member
                </Button>
            </div>


            <div className='mt-12 overflow-x-auto'>

              <Table hoverable className='border-0'>
                <TableHead className='flex justify-center'>
                      <TableHeadCell>Member Name </TableHeadCell>
                      <TableHeadCell>Role </TableHeadCell>
                      <TableHeadCell>Photo </TableHeadCell>
                      <TableHeadCell> </TableHeadCell>
                </TableHead>

                <TableBody className='flex flex-col justify-center items-center divide-y' >
                  {
                    tableData && tableData.length > 0 ? tableData.map((member)=>(   
                        <TableRow className='flex items-center' key={member.id}>
                            <TableCell className='font-medium'> {member.name} </TableCell>
                            <TableCell> {member.role} </TableCell>
                            <TableCell> <img src={`uploads/${member.photo}`} alt={`${member.name}'s image`} className='w-8 h-8 rounded'/> </TableCell>
                            <TableCell> <Button onClick={()=>handleOpenModal(member.id)}>Update</Button> </TableCell>
                        </TableRow> 
                    )) : <div className='flex text-center justify-center items-center text-lg font-medium p-7'>No Members added Yet</div>
                  }
                </TableBody>
</Table>
            </div>

            <Modal show={showModal} onClose={handleCloseModal}>
                <ModalHeader>Update Member</ModalHeader>
                <ModalBody>
                     <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Member Name</Label>
                    <TextInput
                        required
                        id="name"
                        value={updateMemberData.name}
                        onChange={(e) => setUpdateMemberData({...updateMemberData, name: e.target.value})}
                        placeholder="Enter member name"
                    />
                </div>

                <div>
                    <Label htmlFor="role">Role</Label>
                    <TextInput
                        required
                        id="role"
                        value={updateMemberData.role}
                        onChange={(e) => setUpdateMemberData({...updateMemberData, role: e.target.value})}
                        placeholder="Enter role"
                    />
                </div>

                <div>
                    <Label htmlFor="photo">Image URL</Label>
                    <div className="flex gap-2">
                        <FileInput
                            id="photo"
                            onChange={handleUpdateImageChange}
                            accept="image/*"
                            className="flex-1"
                        />
                        <Button onClick={updateUpload} disabled={!updatefile || isUploading}>
                            Upload
                        </Button>
                    </div>
                </div>

                {updatepreview && (
                    <div className="mt-4">
                        <img src={updatepreview} alt="Preview" className="max-w-xs rounded-lg shadow-md" />
                        {updateMemberData.photo && (
                            <p className="text-green-600 flex items-center gap-1 mt-2">
                                <FaCheck /> Uploaded
                            </p>
                        )}
                    </div>
                )}

                <Button onClick={handleUpdate} className="w-full">
                    Update Member
                </Button>
            </div>
                </ModalBody>
            </Modal>
            <PortalCTA />
        </div>
    )
}

export default ClubPage