import React, { useState } from 'react'
import SecondHero from '../components/SecondHero'
import { FaUser, FaUserGroup } from 'react-icons/fa6'
import { AvatarGroup, ChevronDownIcon } from 'flowbite-react'
import { TbPaperBag } from 'react-icons/tb'
import image1 from '../assets/home.jpg'
import image2 from '../assets/jet2.jpg'
import image3 from '../assets/teacher1.jpg'

const Clubs = () => {

const clubs = [
    {
        title: 'Jet Club',
        activity:[
            {name:'Experiments'},
            {content: 'About Experiments'},
            {Icon:''}
        ],
         details:[
            {
            image:image3,
            name:'Maro Paul',
            post:'President',
         },
               {
            image:image3,
            name:'Maro Paul',
            post:'President',
         },

              {
            image:image3,
            name:'Maro Paul',
            post:'President',
         },
              {
            image:image3,
            name:'Maro Paul',
            post:'President',
         },
              {
            image:image3,
            name:'Maro Paul',
            post:'President',
         },
         {
            image:image3,
            name:'Maro Paul',
            post:'President',
         },
           
           {
            image:image3,
            name:'Maro Paul',
            post:'President',
         },
           
           {
            image:image3,
            name:'Maro Paul',
            post:'President',
         },
        
        
        ]
    },
     {
        title: 'Art Club',
        activity:[
            {name:'Experiments'},
            {content: 'About Experiments'},
            {Icon:''}
        ]
    },
     {
        title: 'Social Club',
        activity:[
            {name:'Experiments'},
            {content: 'About Experiments'},
            {Icon:''}
        ]
    },
     {
        title: 'Business Club',
        activity:[
            {name:'Experiments'},
            {content: 'About Experiments'},
            {Icon:''}
        ]
    },
     {
        title: 'Drama Club',
        activity:[
            {name:'Experiments'},
            {content: 'About Experiments'},
            {Icon:''}
        ]
    },


]
const [selectedClub, setSelectedClub] = useState(clubs[0])


  return (
    <section className='flex flex-col items-center justify-center gap-10'>
        <SecondHero title='Welcome to DELSU Clubs'/>
  <section className='grid grid-cols-2 items-center md:min-h-[70vh] md:min-w-7xl'>
    <div className='flex flex-col justify-center items-center min-h-[60vh]'>
     <div className='bg-blue-700 rounded relative w-[30rem] h-10' >
      <div className='absolute w-[32rem] -top-5 h-10'>   <h1 className='w-fit font-inter text-black  text-4xl font-bold'> Meet Our Prestigious Clubs</h1></div> 
        </div>

       <p className='w-[29rem] font-[inter] text-lg/normal mt-5 text-justify'> Discover the story of our humble beginnings, our unwavering commitment to child development, and the passionate team dedicated to making a difference in your child's life. </p> 
      
      <div className='flex  mt-5 md:w-[30rem]  gap-10'> 
       <div className='flex flex-col justify-center items-center gap-2'> 
           <FaUserGroup size={24}/>
           <p className='text-sm text-wrap w-[70%] text-center'> Social Skills Development </p>
           
       </div>

       <div className='flex flex-col justify-center items-center gap-2'>
        <FaUser size={24}/>
        <p className='text-sm text-wrap w-[70%] text-center' > Developing Leadership </p>
       </div>
       
       <div className='flex flex-col justify-center items-center gap-2'>
         <TbPaperBag size={24}/>
         <p className='text-sm text-wrap w-[70%] text-center'>Skill Acquisation</p>
       </div>

      </div>
    </div>


    <div className='relative  flex justify-center items-center'>
        <div className='w-[30rem] h-[25rem] rounded-2xl object-cover'> <img src={image1} alt=""  className='w-full h-full rounded-2xl object-cover'/></div>
       
       
        <div className='w-[15rem] h-[15rem] rounded-2xl object-cover absolute -bottom-10 z-10 left-5 '> <img src={image2} alt=""  className='w-full h-full rounded-2xl object-cover'/></div>
    
    
    </div>
  </section>

  <section className='grid grid-rows-1  items-center justify-center gap-8 mt-10 max-w-6xl'>

    <div className='flex flex-col items-center gap-5'> 

   <div className='flex justify-center items-center bg-blue-700 rounded relative md:w-[45rem] h-10' >
      <div className='absolute md:w-[45rem] -top-5 h-10 flex justify-center items-center'>   <h1 className='w-fit font-inter text-center text-black  text-4xl font-bold'> In Delsu We Commit to Excellence</h1></div> 
        </div>
       
       <p> At DELSU, we believe that early childhood is a magical time of exploration, creativity, and growth.</p>
 </div>


<div className='flex justify-between border-b border-slate-400'>{clubs.map((club,index)=>(
   <button key={index} onClick={()=>setSelectedClub(club)} className={`w-40  flex item-center justify-center transition-all ease duration-300 ${selectedClub.title === club.title ? 'border-b border-amber-400' : ''}`}>{club.title} </button>
))} </div>

<div className='flex border  gap-5 justify-center items-center md:min-w-[75rem] p-5 max-h-[60vh]  flex-wrap bg-blue-600  rounded-3xl'>
    {selectedClub.activity.map((dat,index)=>(
        <div key={index}className='bg-white h-48 w-56 rounded-2xl' >
            <div> <img src={dat.Icon} alt='' /> </div>
            <h1 className='font-bold p-4 text-xl'>{dat.name} </h1>
            <p className='px-5 text-sm'> {dat.content} </p>
             </div>
    ))} 
</div>

<section className='flex flex-col items-center justify-center mt-5'>
   <div> 
     <div className='flex justify-center items-center bg-blue-700 rounded relative md:w-[45rem] h-10' >
      <div className='absolute md:w-[45rem] -top-5 h-10 flex justify-center items-center'> 
          <h1 className='w-fit font-inter text-center text-black  text-4xl font-bold'> Meet Our Club Executives</h1></div> 
          
        </div>
       <p className='text-center md:w-[45rem] p-2 '> Get to know the passionate and experienced educators who create a 
            nurturing, fun, and inspiring environment for every child at Gigglio! </p>
            </div> 

            <div className=''>

             
              
              <div className='grid grid-cols-4 gap-3 max-w-[90rem]'>
                   
                    
                 {  selectedClub.details?.map((data,index)=>
                    (
                        <div className='flex flex-col'>  
                    <div className=' object-cover rounded-3xl'><img src={data.image} alt=" " className='rounded-3xl' /></div>
                    <h1 className='font-bold py-2 md:text-xl'>{data.name}</h1>
                    <h4 className='text-sm'>{data.post}</h4>
                    </div>
                   ))}
                
                  
              </div>

        

            </div>
</section>




  </section>

    </section>
  )
}

export default Clubs