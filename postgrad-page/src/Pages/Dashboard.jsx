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
import DashSecondary from '../components/DashSecondary';
import DashPrimary from '../components/DashPrimary';
import DashPayment  from '../components/DashPayment';
import DashAppForm from '../components/DashAppForm';
import DashComp from '../components/DashComp';
import DashInter from '../components/DashInter';
import DashAnthem from '../components/DashAnthem';
import DashQuiz from '../components/DashQuiz';
import DashCulture from '../components/DashCulture';
import DashExcur from '../components/DashExcur';
import DashUpdateExcur from '../components/DashUpdateExcur';
import DashCultUpdate from '../components/DashCultUpdate';
import DashCreateClub from '../components/DashCreateClub';

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
  <div className='min-h-screen flex'>

    {/* Sidebar */}
    <div className='md:w-56 fixed h-full'>
      <DashSidebar/>
    </div>

    {/* Main Content */}
    <div className='flex-1 md:ml-56 p-4'>
      {!tab && <DashComp/>}

      {tab === 'profile' && <DashProfile/>}
      {tab === 'posts' && <DashPost/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'course' && <DashCourse/>}
      {tab === 'about' && <DashAbout />}
      {tab === 'staff' && <DashStaff />}
      {tab === 'quiz' && <DashQuiz/>}
      {tab === 'culture' && <DashCulture/>}
      {tab === 'excur' && <DashExcur/>}
      {tab === 'updateexcur' && <DashUpdateExcur/>}
      {tab === 'updatecult' && <DashCultUpdate/>}
      {tab === 'addclub' && <DashCreateClub/>}
      {tab === 'inter' && <DashInter/>}
      {tab === 'anthem' && <DashAnthem/>}
      {tab === 'announce' && <DashAnnounce />}
      {tab === 'payment' && <DashPayment/>}
      {tab === 'application' && <DashAppForm/>}
    </div>
  </div>
)
}

export default Dashboard