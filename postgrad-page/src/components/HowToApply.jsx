import { Card } from 'flowbite-react'
import React, {useEffect, useState} from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { TbMessage2Share } from 'react-icons/tb'
import { Link } from 'react-router-dom'


const HowToApply = () => {
const [dataOne, setDataOne] = useState(null);
const [dataTwo, setDataTwo] = useState(null);
const [dataThree, setDataThree] = useState(null);


useEffect(() => {
  
const fetchdataAll = async ()=>{
  try {
     
     const [resOne, resTwo, resThree ] = await Promise.all([
      fetch('/api/settings/howtoapplyone'),
      fetch('/api/settings/howtoapplytwo'),
      fetch('/api/settings/howtoapplythree')
     ]) 
    
    
     if(resOne.ok || resTwo.ok || resThree.ok){

       const [resOneData, resTwoData, resThreeData ] =  await Promise.all([
       resOne.json(),
       resTwo.json(),
       resThree.json()
     ]) 
  
     setDataOne(resOneData)
     setDataTwo(resTwoData)
     setDataThree(resThreeData)
     
    }

     if(!res.ok){
      console.log('cant get response')
     }

  } catch (error) {
    console.log(error.message)
  }
}

fetchdataAll()
     
}, [])



console.log(dataOne)
console.log(dataTwo)
console.log(dataThree)


  return (
    <div className=' flex flex-col md:p-20 p-5 items-center md:items-start gap-10'>
        
   <div className='flex md:flex-row md:justify-between flex-col  items-center w-full cursor-pointer'> <h1 className=' font-bold font-sans text-3xl text-blue-800'> </h1>
  <Link to={'/admision'} >  <h2 className=' underline font-semibold text-lg font-sans '>View all Requirements</h2> </Link> </div>
        

        <div className='flex flex-col md:flex-row gap-5 '>
         

            <Card>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 flex gap-3 items-center dark:text-white'><span> <FaRegFileAlt/> </span> {dataOne?.title || 'Loading'}</h1>
                 <p className="font-normal text-gray-700 dark:text-gray-400"> {dataOne?.subtitle || 'Loading'}</p>
            </Card>

               <Card>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 flex gap-3 items-center dark:text-white'><span> <TbMessage2Share /> </span> {dataTwo?.title || 'Loading'}</h1>
                 <p className="font-normal text-gray-700 dark:text-gray-400">{dataTwo?.subtitle || 'Loading'}</p>
            </Card>

                <Card>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 flex gap-3 items-center dark:text-white'><span> <FaRegFileAlt/> </span> {dataThree?.title || 'Loading'}</h1>
                 <p className="font-normal text-gray-700 dark:text-gray-400">{dataThree?.subtitle || 'Loading'}</p>
            </Card> 
        </div>
        
        </div>
  )
}

export default HowToApply