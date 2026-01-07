import React, { useState, useEffect } from 'react'
import SecondHero from '../components/SecondHero'
import PortalCTA from '../components/PortalCTA'
import { FaUser, FaUserGroup } from 'react-icons/fa6'
import { AvatarGroup, ChevronDownIcon } from 'flowbite-react'
import { TbPaperBag } from 'react-icons/tb'
import image1 from '../assets/home.jpg'
import image2 from '../assets/jet2.jpg'
import image3 from '../assets/teacher1.jpg'

const Clubs = () => {

const [clubMain, setClubMain] = useState(null)
const [clubs, setClubs] = useState([])
const [selectedClub, setSelectedClub] = useState(null)
const [clubMembers, setClubMembers] = useState([])
const [showAllMembers, setShowAllMembers] = useState(false)

const MEMBERS_DISPLAY_LIMIT = 8

useEffect(() => {
  fetchClubMain()
  fetchClubs()
}, [])

useEffect(() => {
  if (selectedClub) {
    fetchClubMembers(selectedClub.id)
  }
}, [selectedClub])

const fetchClubMain = async () => {
  try {
    const res = await fetch('/api/clubs/clubmain')
    if (!res.ok) {
      console.error('Failed to fetch club main')
      return
    }
    const data = await res.json()
    setClubMain(data)
  } catch (error) {
    console.error('Error fetching club main:', error)
  }
}

const fetchClubs = async () => {
  try {
    const res = await fetch('/api/clubs/clubsub')
    if (!res.ok) {
      console.error('Failed to fetch clubs')
      return
    }
    const data = await res.json()
    setClubs(data)
    if (data.length > 0) {
      setSelectedClub(data[0])
    }
  } catch (error) {
    console.error('Error fetching clubs:', error)
  }
}

const fetchClubMembers = async (clubId) => {
  try {
    const res = await fetch(`/api/clubs/clubmember/club/${clubId}`)
    if (!res.ok) {
      console.error('Failed to fetch club members')
      return
    }
    const data = await res.json()
    setClubMembers(data)
    setShowAllMembers(false) // Reset view when club changes
  } catch (error) {
    console.error('Error fetching club members:', error)
  }
}


  return (
    <section className='flex flex-col items-center justify-center gap-10'>
        <SecondHero title='Welcome to DELSU Clubs'/>

        {/* Main Club Section */}
  <section className='grid grid-cols-2 items-center md:min-h-[70vh] md:min-w-7xl'>
    <div className='flex flex-col justify-center items-center min-h-[60vh]'>
     <div className='bg-blue-700 rounded relative w-[30rem] h-10' >
      <div className='absolute w-[32rem] -top-5 h-10'>   
        <h1 className='w-fit font-inter text-black text-4xl font-bold'>
          {clubMain?.title || 'Meet Our Prestigious Clubs'}
        </h1>
      </div> 
     </div>

     <p className='w-[29rem] font-[inter] text-lg/normal mt-5 text-justify'>
       {clubMain?.intro || 'Discover the story of our humble beginnings, our unwavering commitment to child development, and the passionate team dedicated to making a difference in your child\'s life.'}
     </p> 
      
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
         <p className='text-sm text-wrap w-[70%] text-center'>Skill Acquisition</p>
       </div>

      </div>
    </div>


    <div className='relative  flex justify-center items-center'>
        <div className='w-[30rem] h-[25rem] rounded-2xl object-cover'> 
          <img 
            src={clubMain?.imageone ? `uploads/${clubMain.imageone}` : image1} 
            alt="" 
            className='w-full h-full rounded-2xl object-cover'
          />
        </div>
       
        <div className='w-[15rem] h-[15rem] rounded-2xl object-cover absolute -bottom-10 z-10 left-5 '> 
          <img 
            src={clubMain?.imagetwo ? `uploads/${clubMain.imagetwo}` : image2} 
            alt="" 
            className='w-full h-full rounded-2xl object-cover'
          />
        </div>
    
    </div>
  </section>


{/* Clubs Sub Section */}
  <section className='grid grid-rows-1  items-center justify-center gap-8 mt-10 max-w-6xl'>

    <div className='flex flex-col items-center gap-5'> 

   <div className='flex justify-center items-center bg-blue-700 rounded relative md:w-[45rem] h-10' >
      <div className='absolute md:w-[45rem] -top-5 h-10 flex justify-center items-center'>   
        <h1 className='w-fit font-inter text-center text-black text-4xl font-bold'>
          {clubMain?.subtitle || 'In DELSU We Commit to Excellence'}
        </h1>
      </div> 
   </div>
       
   <p className='text-center'>{clubMain?.intro || 'At DELSU, we believe that early childhood is a magical time of exploration, creativity, and growth.'}</p>
 </div>


<div className='flex justify-between border-b border-slate-400'>
  {clubs.length > 0 ? (
    clubs.map((club, index) => (
      <button 
        key={index} 
        onClick={() => setSelectedClub(club)} 
        className={`w-40 flex item-center justify-center transition-all ease duration-300 ${selectedClub?.id === club.id ? 'border-b border-amber-400' : ''}`}
      >
        {club.title}
      </button>
    ))
  ) : (
    <p className='text-center w-full py-4'>No clubs available</p>
  )}
</div>

<div className='flex border gap-5 justify-center items-center md:min-w-[75rem] p-5 min-h-[20vh] flex-wrap bg-blue-600 rounded-3xl'>
  {selectedClub ? (
    <div className='bg-white p-6 rounded-2xl max-w-4xl'>
      <h2 className='font-bold text-2xl mb-4'>{selectedClub.title}</h2>
      <p className='text-lg mb-2'><strong>Subtitle:</strong> {selectedClub.subtitle}</p>
      <p className='text-base'>{selectedClub.intro}</p>
    </div>
  ) : (
    <p className='text-white'>Select a club to view details</p>
  )}
</div>

<section className='flex flex-col items-center justify-center mt-5'>
   <div> 
     <div className='flex justify-center items-center bg-blue-700 rounded relative md:w-[45rem] h-10' >
      <div className='absolute md:w-[45rem] -top-5 h-10 flex justify-center items-center'> 
          <h1 className='w-fit font-inter text-center text-black text-4xl font-bold'> Meet Our Club Executives</h1>
      </div> 
     </div>
     <p className='text-center md:w-[45rem] p-2 '> 
       Get to know the passionate and experienced leaders who create a nurturing, fun, and inspiring environment for every member at {selectedClub?.title || 'our clubs'}! 
     </p>
   </div> 

   <div className=''>
     <div className='grid grid-cols-4 gap-3 max-w-[90rem]'>
       {clubMembers.length > 0 ? (
         (showAllMembers ? clubMembers : clubMembers.slice(0, MEMBERS_DISPLAY_LIMIT)).map((member, index) => (
           <div className='flex flex-col' key={index}>  
             <div className='object-cover rounded-3xl'>
               <img 
                 src={member.photo ? `uploads/${member.photo}` : image3} 
                 alt={member.name} 
                 className='rounded-3xl w-full h-64 object-cover' 
               />
             </div>
             <h1 className='font-bold py-2 md:text-xl'>{member.name}</h1>
             <h4 className='text-sm'>{member.role}</h4>
           </div>
         ))
       ) : (
         <div className='col-span-4 text-center py-8'>
           <p className='text-lg text-gray-600'>No executives found for this club</p>
         </div>
       )}
     </div>

     {/* View More/Less Button */}
     {clubMembers.length > MEMBERS_DISPLAY_LIMIT && (
       <div className='flex justify-center mt-8'>
         <button
           onClick={() => setShowAllMembers(!showAllMembers)}
           className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl'
         >
           {showAllMembers ? (
             <>
               <span>View Less</span>
               <svg className='w-5 h-5 transform rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
               </svg>
             </>
           ) : (
             <>
               <span>View More ({clubMembers.length - MEMBERS_DISPLAY_LIMIT} more)</span>
               <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
               </svg>
             </>
           )}
         </button>
       </div>
     )}
   </div>
</section>



<PortalCTA />

  </section>

    </section>
  )
}

export default Clubs