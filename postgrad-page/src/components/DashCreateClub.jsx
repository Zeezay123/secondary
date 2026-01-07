import { Alert, Button, FileInput, Label, Textarea, TextInput, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal, ModalBody, ModalHeader } from 'flowbite-react'
import React, {useState, useEffect} from 'react'
import axios from 'axios' 
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCheck } from 'react-icons/fa6';


const DashCreateClub = () => {

   const [clubData, setClubData] = useState({
    title: '', subtitle: '', intro: '', imageOne: '',imageTwo:''
   }) 

   const [previews, setPreviews] = useState({
    imageOne: '', imageTwo:''
   }) 
   

   const [files, setFiles] = useState([{
    imageOne: null, imageTwo: null
   }])
    
   const [progress, setUploadProgress] = useState(0)

   const imagesField = [
    {key:'imageOne', label:'Image One'}, 
    {key:'imageTwo', label:'Image Two'}
]
   
   const [clubInfo, setClubInfo] = useState(null)
   const [showModal, setShowModal] = useState(false)
   const [selectedClub, setSelectedClub] = useState({
    title: '', subtitle: '', intro: '', imageOne: '',imageTwo:''
   })

   const [errMsg, setErrMsg] = useState('')
   const [successMsg, setSuccessMsg] = useState('')

   useEffect(() => {
    fetchClubInfo()
   }, [])

   const fetchClubInfo = async () => {
    try {
      const response = await fetch('/api/clubs/clubmain')
      if (!response.ok) {
        setErrMsg('Failed to fetch club info')
        return
      }
      const data = await response.json()
      console.log(data)
      setClubInfo(data)
    } catch (error) {
      setErrMsg(error.message || 'An error occurred while fetching club info')
    }
   }

   const handleOpenModal = () => {
    if (clubInfo) {
      setSelectedClub(clubInfo)
    }
    setShowModal(true)
    setErrMsg('')
    setSuccessMsg('')
   }

   const handleCloseModal = () => {
    setShowModal(false)
    setSelectedClub({
      title: '', subtitle: '', intro: '', imageOne: '', imageTwo: ''
    })
    setErrMsg('')
    setSuccessMsg('')
   }

   const handlechange = (e, key) => {
    const file = e.target.files[0]
    if(!file) return

    setFiles((prev)=>({...prev, [key]: file}))
    const preview =  URL.createObjectURL(file)
    setPreviews((prev) =>({...prev, [key]: preview}))
    setErrMsg('')
}



   const handleCreate = async () =>{
    try{

        const response = await fetch(`/api/clubs/clubmain/update`, {
            method: 'Put',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(clubData)
          });

         if(!response.ok){
            const errorData = await response.json()
            setErrMsg(errorData.message || 'Failed to create Club')
            return
         }

            const data = await response.json()
            setSuccessMsg('Club updated successfully!')
            setErrMsg('')
            fetchClubInfo()
        
    }catch(error){
        setErrMsg(error.message || 'An error occurred')
    }
   }

   const handleUpdate = async () => {
    try {
      const response = await fetch('/api/clubs/clubmain/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(selectedClub)
      })

      if (!response.ok) {
        const errorData = await response.json()
        setErrMsg(errorData.message || 'Failed to update club')
        return
      }

      const data = await response.json()
      setSuccessMsg('Club updated successfully!')
      setErrMsg('')
      fetchClubInfo()
      
      setTimeout(() => {
        setShowModal(false)
        setSelectedClub({
          title: '', subtitle: '', intro: '', imageOne: '', imageTwo: ''
        })
      }, 2000)
    } catch (error) {
      setErrMsg(error.message || 'An error occurred')
    }
   }


   const Upload = async (file,key)=>{

    if(!file) return

    const formData = new FormData()
    formData.append('file', file[key])

    try {

         const response = await axios.post(`/api/uploads`,formData,{
            headers:{'Content-Type': 'multipart/form-data'},
            onUploadProgress: (progressEvent) => {

                const percent = Math.round((progressEvent.upload * 100)/progressEvent.total)

                setUploadProgress(percent)

            }
              
         })  

         if(!response.ok){
            setErrMsg(response.statusText)
         }

          setErrMsg('')
         const data = response.data
         setClubData((prev)=>({...prev, [key]: data}))
         setSuccessMsg(`${key} is Successfully Uploaded`)


    } catch (error) {
        setErrMsg(error.message || 'An error occurred during upload')
        
    }
   
     


   }




  return (
    <div className='mx-auto mx-w-7xl  w-3xl py-12'>
        <div className="font-bold text-black text-4xl mb-7 mx-auto"> 
            Enter Club Information</div>
          
        <div> 
            {errMsg  && <div> <Alert> {errMsg}</Alert> </div>}
            {successMsg  && <div> <Alert> {successMsg}</Alert> </div>}
            <div>
                <Label htmlFor='title'> Title  </Label>
                <TextInput id='title'
                 placeholder='Enter Club Title'
                 value={clubData.title}
                 onChange={(e)=> setClubData({...clubData, title: e.target.value})}
                  />
            </div>

             <div>
                <Label htmlFor='subtitle'> Sub Title  </Label>
                <TextInput id='subtitle'
                 value={clubData.subtitle}
                 placeholder='Enter Club SubTitle'
                 onChange={(e)=>setClubData({...clubData, subtitle:e.target.value})}
                  />
            </div>

             <div>
                <Label htmlFor='intro'> Intro  </Label>
                <Textarea id='intro'
                 placeholder='Enter Club Intro'
                 value={clubData.intro}
                 onChange={(e)=>setClubData({...clubData, intro:e.target.value})}
                 
                  />
            </div>

            {
                imagesField.map((image)=>(
                    <div key={image.key}> 
                    <Label htmlFor={image.key}> {image.label}  </Label>
                  <div className='flex gap-5'>  <FileInput 
                       id={image.key}
                          accept='.jpg, .png, .jpeg'
                          onChange={(e)=>handlechange(e,image.key)}
                    /> 
                    <Button onClick={()=>Upload(files,image.key)}> Upload </Button>
                    </div> 
                    {previews[image.key] && (
                        <div> 
                            <img 
                              src={previews[image.key]} 
                              alt='Preview' 
                              className='mt-2 w-96 object-cover rounded-md'
                            />
                        </div>
                    )}
                    </div>
                ))
            }

            <Button onClick={handleCreate} className='mt-4 w-full'> Update Club </Button>
        </div>

        <div className='mt-12 overflow-x-auto'>
          <div className="font-bold text-black text-2xl mb-5">Current Club Information</div>
          <Table hoverable className='border-0'>
            <TableHead className='flex'>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Subtitle</TableHeadCell>
              <TableHeadCell>Intro</TableHeadCell>
              <TableHeadCell>Image One</TableHeadCell>
              <TableHeadCell>Image Two</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {clubInfo ? (
                <TableRow>
                  <TableCell className='font-medium'>{clubInfo.title}</TableCell>
                  <TableCell>{clubInfo.subtitle}</TableCell>
                  <TableCell>{clubInfo.intro}</TableCell>
                  <TableCell>
                    {clubInfo.imageone && (
                      <img src={`uploads/${clubInfo.imageone}`} alt="Image One" className='w-20 h-20 object-cover rounded' />
                    )}
                  </TableCell>
                  <TableCell>
                    {clubInfo.imagetwo && (
                      <img src={`uploads/${clubInfo.imagetwo}`} alt="Image Two" className='w-20 h-20 object-cover rounded' />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size='sm' onClick={handleOpenModal}>Edit</Button>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className='text-center text-lg font-medium p-7'>
                    No club information available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Modal show={showModal} onClose={handleCloseModal}>
          <ModalHeader>Update Club Information</ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-4'>
              {errMsg && <Alert color='failure'>{errMsg}</Alert>}
              {successMsg && <Alert color='success'>{successMsg}</Alert>}
              
              <div>
                <Label htmlFor='modal-title'>Title</Label>
                <TextInput
                  id='modal-title'
                  placeholder='Enter Club Title'
                  value={selectedClub.title}
                  onChange={(e) => setSelectedClub({ ...selectedClub, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor='modal-subtitle'>Sub Title</Label>
                <TextInput
                  id='modal-subtitle'
                  value={selectedClub.subtitle}
                  placeholder='Enter Club SubTitle'
                  onChange={(e) => setSelectedClub({ ...selectedClub, subtitle: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor='modal-intro'>Intro</Label>
                <Textarea
                  id='modal-intro'
                  placeholder='Enter Club Intro'
                  value={selectedClub.intro}
                  onChange={(e) => setSelectedClub({ ...selectedClub, intro: e.target.value })}
                />
              </div>

              <Button onClick={handleUpdate} className='mt-4 w-full'>Update Club</Button>
            </div>
          </ModalBody>
        </Modal>
    </div>
  )
}

export default DashCreateClub