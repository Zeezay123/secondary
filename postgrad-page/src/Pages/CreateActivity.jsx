import { Button, Label, Textarea, TextInput } from 'flowbite-react'
import React, { useState } from 'react'

const CreateActivity = () => {
const [activeData, setActiveData] = useState({act:'', descp:''})

const handleSubmit = async()=>{
    const response = await fetch(`api/settings/createactivity`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body:JSON.stringify(activeData)

        

    })
    if(!response.ok) {
        console.log(response)
    }

    // const data = await response.json()
    // console.log(data)
}

console.log(activeData)

  return (
    <div className='mx-auto py-20 max-w-3xl'>
    
    <div className='flex flex-col gap-3 mb-5'>
        <Label htmlFor='act'>Enter Activity Title</Label>
        <TextInput id='act'
         required
         value={activeData.act}
         onChange={(e)=>setActiveData({...activeData, act:e.target.value})}
         />
    </div>

        <div className='flex flex-col gap-3 mt-5'>
        <Label htmlFor='act'>Description</Label>
        <Textarea 
        id='descp'
         className='h-72'
         value={activeData.descp}
         onChange={(e)=>setActiveData({...activeData, descp:e.target.value})}
         />
    </div>

    <Button className='w-full mt-5' onClick={handleSubmit}> Submit </Button>
    
    </div>
  )
}

export default CreateActivity