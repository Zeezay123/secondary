import React,{useState,useEffect} from 'react'
import imageOne from '../assets/images/imageone.jpg'
import { Badge } from 'flowbite-react'
import CardCaro from '../components/CardCaro'

const PrimInfo = () => {

  const [aboutfiles, setaboutFiles] = useState({})

useEffect(() => {
    const fetchData = async ()=>{
     const res = await fetch(`/api/settings/about`,{
     method:'GET',
     headers:{
         'Content-Type': 'application/json'
     }
     })
 
     
     if(!res.ok) {
         console.log(res)
         console.log('could not get about page')
         return
 
     }
      const data = await res.json()
     try {
         
          setaboutFiles({
            title:data.title, subtitle:data.subtitle,
     intro:data.intro, mission:data.mission, vision:data.vision, 
     philosophy:data.philosophy, vcMessage:data.vcMessage,
      directorMessage:data.directorMessage, vcimage:data.vcimage,
       directorimage:data.directorimage})
         
          setErrMsg('')
          setSuccessMsg('')
     } catch (error) {
         setErrMsg(error.message)
     }
    
 
 
 
    }
 
    fetchData()
 
   
 }, [])
 

 const infoData = {
    main:{
        header:'Nurturing Knowledge, Character, and Innovation',
        subheader:'Delsu Staff Schools – Building Minds, Shaping Futures',
        body:`
Delsu Staff Schools were established to provide a solid educational foundation for the children of university staff 
and the wider community. Rooted in a tradition of excellence, the schools are committed to nurturing intellectual growth,
 moral integrity, and lifelong learning. With a focus on building strong academic and social skills, the schools ensure that every 
 child is prepared to thrive in an ever-changing world.The schools offer a well-structured curriculum that blends academic rigor
with co-curricular activities, ensuring a balanced and holistic education. `,
    subbody:`From early childhood learning to higher classes, 
the teaching approach is designed to stimulate curiosity, creativity, and problem-solving abilities. With modern teaching facilities 
and a team of dedicated educators, Delsu Staff Schools continue to maintain high standards that reflect the values and vision of Delta 
State University. Beyond academics, the schools emphasize character building, discipline, and leadership. Students are encouraged to 
participate in cultural, sporting, and community development activities that promote teamwork and responsibility. By providing a safe,
 supportive, and dynamic environment, Delsu Staff Schools remain a place where young learners grow into confident individuals, equipped 
with the knowledge and values to make meaningful contributions to society.`
    }


}
    


 

  return (
    
    <section className='w-full flex flex-col  py-4 mt-5 md:mt-20'>
        <div className='flex px-5 w-full justify-center gap-10 items-center'>
        <div className='flex flex-col items-center md:items-start md:w-[45%] gap-5'>
         <h1 className='font-[inter] bg-gradient-to-r bg-clip-text text-transparent 
         text-center md:text-left text-3xl md:text-5xl/snug from-blue-500
          to-red-950  font-black' >{aboutfiles?.vcimage}</h1>

         <p className=' font-inter text-sm/normal text-justify  md:text-[1rem] ' dangerouslySetInnerHTML={{__html:aboutfiles?.vcMessage}}/>

         <h2 className='font-[inter]  text-black 
         text-center md:text-left text-xl font-black '  dangerouslySetInnerHTML={{__html:aboutfiles?.directorimage}} />

         <p className ='font-inter text-sm/normal text-justify  md:text-[1rem] '  dangerouslySetInnerHTML={{__html:aboutfiles?.directorMessage}} />

         <div className='flex gap-2 md:gap-5 flex-wrap'>
            
         <Badge color='info' size='sm'> Intergrity </Badge> 
         <Badge color='success' size='sm'> Resposibility </Badge> 
         <Badge color='failure' size='sm'> Character </Badge> 
         <Badge color='purple' size='sm'> Virture </Badge> 
         <Badge color='warning' size='sm'> TrustWorthiness </Badge> 
         
         </div>
        
        </div>

        <div className='w-full md:w-[45%] hidden md:flex'>
            <img className='rounded-3xl' src={imageOne} alt="" loading='lazy' />
        </div>

        
        </div>
         <CardCaro />       
    </section>
  )
}

export default PrimInfo