import { Button, FileInput, Label, Textarea, TextInput } from 'flowbite-react'
import React, {useState, useEffect} from 'react'
import axios from 'axios' 
import { set } from 'mongoose'


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


   const imagesField = [
    {key:'imageOne', label:'Image One'}, 
    {key:'imageTwo', label:'Image Two'}
]
   

   

   const [errMsg, setErrMsg] = useState('')
   const [successMsg, setSuccessMsg] = useState('')

   

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

        const response = await fetch(`/api/settings/createclub`, {
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
        
    }catch(error){
        setErrMsg(error.message || 'An error occurred')
    }
   }
   




  return (
    <div className='mx-auto mx-w-7xl  w-3xl py-12'>
        <div className="font-bold text-black text-4xl mb-7 mx-auto"> 
            Enter Club Information</div>
          
        <div> 
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
                 onChange={(e)=>setClubData({...clubData, title:e.target.value})}
                  />
            </div>

             <div>
                <Label htmlFor='intro'> Intro  </Label>
                <Textarea id='intro'
                 placeholder='Enter Club Intro'
                 value={clubData.intro}
                 
                  />
            </div>

            {
                imagesField.map((image)=>(
                    <div key={image.key}> 
                    <Label htmlFor={image.key}> {image.label}  </Label>
                    <FileInput 
                       id={image.key}
                          accept='.jpg, .png, .jpeg'
                          onChange={(e)=>handlechange(e,image.key)}
                    />
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

            <Button onClick={handleCreate} className='mt-4 w-full'> Create Club </Button>
        </div>
    </div>
  )
}

export default DashCreateClub