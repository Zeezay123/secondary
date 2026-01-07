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
import DashMiniClubs from '../components/DashMiniClubs';
import ClubPage from './ClubPage';
import DashFoem from '../components/DashFoem';
import Dashprincipal from '../components/Dashprincipal';
import DashYearBook from '../components/DashYearBook';
import DashTeachers from '../components/DashTeachers';
import DashPrefect from '../components/DashPrefect';
import DashAlumni from '../components/DashAlumni';
import DashFaq from '../components/DashFaq';
import DashContact from '../components/DashContact';

const Dashboard = () => {
 const location = useLocation();
 const [tab, setUseTab] = useState('')    
 const [clubs, setClubs] = useState([])
 const [errMsg, setErrMsg] = useState('')

 useEffect(()=>{
  // Get the tab from the URL query parameters
  // This assumes the URL is like /dashboard?tab=someTab
  const urlParams = new URLSearchParams(location.search) // 
  const tabFromUrl = urlParams.get('tab') 
 
if(tabFromUrl){
  
  setUseTab(tabFromUrl)
  
}

fetchclubs()
 
 }, [location.search])


 const fetchclubs = async()=>{
try{

  const response = await fetch(`api/clubs/clubsub`)
  if(!response.ok){
    setErrMsg(response.statusText)
    return
  }
  
  const data = await response.json()
  setClubs(data)



}catch(error){

  setErrMsg(error.message || 'Error updating')

}

 }

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
    {clubs.map((club, index) => (
      tab === `${club.id}` && <ClubPage key={index}/>
    ))}
    {tab === 'contact' && <DashContact/>}
     {tab === 'faq' && <DashFaq/>}
      {tab === 'quiz' && <DashQuiz/>}
      {tab === 'culture' && <DashCulture/>}
      {tab === 'excur' && <DashExcur/>}
      {tab === 'principal' && <Dashprincipal/>}
      {tab === 'teach' && <DashTeachers/>}
      {tab === 'alumni' && <DashAlumni/>}
      {tab === 'prefects' && <DashPrefect/>}
      {tab === 'updateexcur' && <DashUpdateExcur/>}
      {tab === 'updatecult' && <DashCultUpdate/>}
      {tab === 'addclub' && <DashCreateClub/>}
      {tab === 'addclubs' && <DashMiniClubs/>}
      {tab === 'inter' && <DashInter/>}
      {tab === 'anthem' && <DashAnthem/>}
      {tab === 'announce' && <DashAnnounce />}
      {tab === 'payment' && <DashPayment/>}
      {tab === 'application' && <DashAppForm/>}
      {tab === 'form' && <DashFoem/>}
      {tab === 'yearbook' && <DashYearBook/>}
    </div>
  </div>
)
}

export default Dashboard