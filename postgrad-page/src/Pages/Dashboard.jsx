import React, { useEffect, useState } from 'react'
import { Navbar } from 'flowbite-react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';
import DashCourse from '../components/DashCourse';
import DashAbout from '../components/DashAbout';
import DashStaff from '../components/DashStaff';
import DashAnnounce from '../components/DashAnnounce';

const Dashboard = () => {
 const location = useLocation();
 const [tab, setUseTab] = useState('')

 useEffect(()=>{
  // Get the tab from the URL query parameters
  // This assumes the URL is like /dashboard?tab=someTab
  const urlParams = new URLSearchParams(location.search) // 
  const tabFromUrl = urlParams.get('tab') 
 
if(tabFromUrl){
  
  setUseTab(tabFromUrl)
}
 
 }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row '>

      <div className='md:w-56'>

      {/* Sidebar */}
      <DashSidebar/>
     </div>
         

     
        {/* Profile  */}

       {tab === 'profile' && <DashProfile/>}
  
          
          {/*Posts */}
    
       {tab === 'posts' && <DashPost/>}
       {tab === 'users' && <DashUsers/>}
       {tab === 'course' && <DashCourse/>}
       {tab === 'about' && <DashAbout />}
       {tab === 'staff' && <DashStaff />}
       {tab === 'announce' && <DashAnnounce />}
      
     
    
     </div>
  )
}

export default Dashboard