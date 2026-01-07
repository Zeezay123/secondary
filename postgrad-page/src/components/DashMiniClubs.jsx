import { Alert, Button, FileInput, Label, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Textarea, TextInput } from 'flowbite-react'
import React, {useState, useEffect} from 'react'
import axios from 'axios' 
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCheck } from 'react-icons/fa6';
import { set } from 'mongoose';


const DashMiniClubs = () => {

   const [clubData, setClubData] = useState({
    title: '', subtitle: '', intro: ''
   }) 
  const [errMsg, setErrMsg] = useState('')
   const [successMsg, setSuccessMsg] = useState('')
   const [clubsAll, setAllClubs] = useState([])
   const [showModal, setShowModal] = useState(false)

   const [selectedClub, setSelectedClub] = useState("")
   const [selectedId, setSelectedId] = useState('')
   

   useEffect(()=>{
    fetchAllData()
   },[])



   const  fetchAllData =async()=>{
    try{

        const response = await fetch(`/api/clubs/clubsub`)

        if(!response.ok){
            return setErrMsg(response.statusText)
        }

        const data = await response.json()
        setAllClubs(data)        

        console.log(selectedClub)

    } catch(error){

        setErrMsg(error.message || 'An error occurred')

    }
   }



const handleOpenModal= async (selectedid)=> {
setSelectedId(selectedid)
    setShowModal(true)
  try{

      const response = await fetch(`/api/clubs/clubsub/${selectedid}`)
      
      if(!response.ok){
        setErrMsg(response.statusText)
        return
      }
setErrMsg('')
setSuccessMsg('')


  }catch(error){
    setErrMsg(error.message || 'error getting data')
  }



}

const handleCloseModal =()=>{
setShowModal(false)
setSelectedClub({title:'', subtitle:'', intro:''})
setErrMsg('')
setSuccessMsg('')


}

   const handleCreate = async () =>{
    try{

        const response = await fetch(`/api/clubs/clubsub/create`, {
            method: 'POST',
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
            setSuccessMsg('Club created successfully!')
            setErrMsg('')
            fetchAllData()
        
    }catch(error){
        setErrMsg(error.message || 'An error occurred')
    }
   }



    const handleUpdate = async () =>{
        try{

            const response = await fetch(`/api/clubs/clubsub/update/${selectedId}`, {
                method: 'Put',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(selectedClub)
              })


              if(!response.ok){
                const errorData = await response.json()
                setErrMsg(errorData.message || 'Failed to update Club')
                setShowModal(false)
                return
             }

                const data = await response.json()
                setSuccessMsg('Club updated successfully!')
                setErrMsg('')   
                fetchAllData()
                
                setTimeout(()=>{
                    setShowModal(false)
                    setSelectedClub({title:'', subtitle:'', intro:''})
                },2000)

            }
    
    catch(error){
        setErrMsg(error.message || 'An error occurred')
        setShowModal(false)
     }}
console.log(clubsAll)


  return (
    <div className='mx-auto mx-w-7xl  w-3xl py-12 '>
        <div className="font-bold  text-black text-4xl mb-7 mx-auto"> 
            Enter New Club</div>
          
        <div className='mb-7'> 
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

        

            <Button onClick={handleCreate} className='mt-4 w-full'> Create Club </Button>
        </div>

    <div className='mt-12 overflow-x-auto '>
        <Table hoverable className='border-0'>
            <TableHead className='flex justify-center'>
                <TableHeadCell>Title </TableHeadCell>
                <TableHeadCell>Subtitle </TableHeadCell>
                <TableHeadCell>About </TableHeadCell>
                <TableHeadCell> </TableHeadCell>
            </TableHead>
 <TableBody className='flex flex-col justify-center items-center divide-y' >
           
                { 
                   clubsAll.length > 0 ? clubsAll.map((club)=>(
                 <TableRow className='flex items-center' key={club.id}>  
                      <TableCell className='font-medium'> {club.title} </TableCell> 
                      <TableCell> {club.subtitle} </TableCell> 
                      <TableCell> {club.intro} </TableCell> 
                      <TableCell> <Button onClick={()=>handleOpenModal(club.id)}>Update</Button> </TableCell> 
                 </TableRow> 
            
                   ))

                    : <div className='flex text-center justify-center items-center text-lg font-medium p-7'>No Clubs created Yet</div>
                }
                    </TableBody>  
        </Table>
    </div>


 <Modal show={showModal} onClose={handleCloseModal}>
    <ModalHeader> Update Club </ModalHeader>
    <ModalBody>

    <div className='mb-7'> 
            {errMsg  && <div> <Alert> {errMsg}</Alert> </div>}
            {successMsg  && <div> <Alert> {successMsg}</Alert> </div>}
            <div>
                <Label htmlFor='title'> Title  </Label>
                <TextInput id='title'
                 placeholder='Enter Club Title'
                 value={selectedClub.title}
                 onChange={(e)=> setSelectedClub({...selectedClub, title: e.target.value})}
                  />
            </div>

             <div>
                <Label htmlFor='subtitle'> Sub Title  </Label>
                <TextInput id='subtitle'
                 value={selectedClub.subtitle}
                 placeholder='Enter Club SubTitle'
                 onChange={(e)=>setSelectedClub({...selectedClub, subtitle:e.target.value})}
                  />
            </div>

             <div>
                <Label htmlFor='intro'> Intro  </Label>
                <Textarea id='intro'
                 placeholder='Enter Club Intro'
                 value={selectedClub.intro}
                 onChange={(e)=>setSelectedClub({...selectedClub, intro:e.target.value})}
                 
                  />
            </div>

        

            <Button onClick={handleUpdate} className='mt-4 w-full'> Update Club </Button>
        </div>

    </ModalBody>


 </Modal>
    </div>
  )
}

export default DashMiniClubs