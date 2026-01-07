import React from 'react'
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import {HiUser, HiArrowSmRight, HiDocumentText, HiDocumentSearch, HiOutlineUser, HiOutlineUserGroup, HiOfficeBuilding, HiPencil, HiUsers, HiDocumentReport, HiOutlineDocumentRemove, HiOutlineDocumentDownload, HiOutlineDatabase, HiArchive} from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { signOutSuccess } from '../Redux/user/slice'
import { useDispatch, useSelector } from 'react-redux'



const DashSidebar = () => {
  const {currentUser} = useSelector(state=>state.user)
  const location = useLocation();
  const [clubs, setClubs] = useState([])
 const [tab, setUseTab] = useState('')
 const dispatch = useDispatch()
 const [errMsg, setErrMsg] = useState('')

 useEffect(()=>{
  // Get the tab from the URL query parameters
  // This assumes the URL is like /dashboard?tab=someTab
  const urlParams = new URLSearchParams(location.search) // 
  const tabFromUrl = urlParams.get('tab') 
 
if(tabFromUrl){
  setUseTab(tabFromUrl)
  fetchclubs()
}
 
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



 
 const handleSignout =async()=>{
   try{
     const res = await fetch('/api/users/signout', {
       method:'POST',
     })
     
     const data = res.json()
     if(!res.ok){
       console.log(error.message)
     }
    else{
     dispatch(signOutSuccess())
    }
   }catch(error){
     console.log(error.message)
   }
 }
 
  return (
    <Sidebar className='md:w-56 '>
   <SidebarItems className='cursor-pointer'>
    <SidebarItemGroup className='flex flex-col gap-1'>
   <Link to='/dashboard?tab=profile' > 
    <SidebarItem as='div'
     active={tab === 'profile'}
      icon={HiUser} label={ currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark'>
      Profile
     </SidebarItem></Link>

{<SidebarCollapse label='Clubs' icon={HiDocumentReport}>
   <Link to={`/dashboard?tab=addclub`}>  <SidebarItem>Add Club Info</SidebarItem></Link>
   <Link to={`/dashboard?tab=addclubs`}>  <SidebarItem>Add Clubs </SidebarItem></Link>
   {clubs?.map((club, index)=> (

      <Link key={index} to={`/dashboard?tab=${club.id}`}> <SidebarItem active={tab===club.title} as='div'>{club.title} </SidebarItem></Link>
     ))}  </SidebarCollapse> }

     {
       currentUser.isAdmin && (
     <SidebarCollapse icon={HiArchive} label='School Life'> 
     
     

     <Link to={'/dashboard?tab=inter'}> 
     <SidebarItem
     active={tab === 'inter'}
     icon={HiDocumentText}
     as='div'
     > Interhouse </SidebarItem>
     </Link>
     
     <Link to={'/dashboard?tab=anthem'}> 
     <SidebarItem
     active={tab === 'staff'}
     icon={HiDocumentText}
     as='div'
     > Anthem </SidebarItem>
     </Link>
     <Link to={'/dashboard?tab=excur'}> 
     <SidebarItem
     active={tab === 'excur'}
     icon={HiUsers}
     as='div'
     > Excursion </SidebarItem>
     
     </Link>
      <Link to={'/dashboard?tab=culture'}> 
     
     <SidebarItem
     active={tab === 'culture'}
     icon={HiDocumentText}
     as='div'
     > Culture</SidebarItem>
     </Link>
     
      <Link to={'/dashboard?tab=quiz'}> 
     
     <SidebarItem
     active={tab === 'quiz'}
     icon={HiDocumentText}
     as='div'
     > Quiz </SidebarItem>
     </Link>
     </SidebarCollapse>
     
       )
      }


     {
      currentUser.isAdmin && (
 <Link to={'/dashboard?tab=posts'}> 

   <SidebarItem
   active={tab === 'posts'}
   icon={HiDocumentText} as='div'>
    Posts
   </SidebarItem>
   
   </Link>
      )
     }




     
     {
      currentUser.isAdmin && (
 <Link to={'/dashboard?tab=about'}> 

   <SidebarItem
   active={tab === 'about'}
   icon={HiDocumentText} as='div'>
    Top Page
   </SidebarItem>
   
   </Link>
      )
     }


{/* Application info */}
{
  currentUser.isAdmin && (
    <SidebarCollapse icon={HiDocumentReport} label='Reports'>
       <Link to={'/dashboard?tab=application'}>
        <SidebarItem
        active={tab=== 'application'} 
        icon={HiOutlineDocumentRemove}
        as='div'>
         Application Info
        </SidebarItem>
       </Link>
       {/* <Link to={'/dashboard?tab=form'}>
        <SidebarItem
        active={tab === 'form'} 
        icon={HiOutlineDocumentRemove}
        as='div'>
           Form
        </SidebarItem>
       </Link> */}

      <Link to={'/dashboard?tab=payment'}>
      <SidebarItem as='div' 
      active={tab==='payment'}   
      icon={HiOutlineDocumentDownload}
      >
        Payment 
      </SidebarItem>
      </Link>

    </SidebarCollapse>
  )
}


{/* Staff info */}

    {
      currentUser.isAdmin && (
<SidebarCollapse icon={HiDocumentText} label='Directory'> 

<Link to={'/dashboard?tab=principal'}> 
  <SidebarItem
  active={tab === 'principal'}
  icon={HiDocumentText}
  as='div'
  > Principal </SidebarItem>
</Link>
<Link to={'/dashboard?tab=teach'}> 
  <SidebarItem
  active={tab === 'teach'}
  icon={HiDocumentText}
  as='div'
  > Teachers </SidebarItem>
</Link>

<Link to={'/dashboard?tab=prefects'}> 
  <SidebarItem
  active={tab === 'prefects'}
  icon={HiDocumentText}
  as='div'
  > Prefects </SidebarItem>
</Link>
<Link to={'/dashboard?tab=alumni'}> 
  <SidebarItem
  active={tab === 'alumni'}
  icon={HiUsers}
  as='div'
  > Alumni </SidebarItem>
</Link>


</SidebarCollapse>

      )
     }

      {
      currentUser.isAdmin && (
 <Link to={'/dashboard?tab=yearbook'}> 

   <SidebarItem
   active={tab === 'yearbook'}
   icon={HiOutlineUserGroup} as='div'>
    Yearbook
   </SidebarItem>
   </Link>
      )
     }

      {
      currentUser.isAdmin && (
 <Link to={'/dashboard?tab=announce'}> 

   <SidebarItem
   active={tab === 'annouce'}
   icon={HiOutlineUserGroup} as='div'>
    Announcement
   </SidebarItem>

   </Link>
      )
     }


      {
      currentUser.isAdmin && (
 <Link to={'/dashboard?tab=contact'}> 

   <SidebarItem
   active={tab === 'contact'}
   icon={HiOutlineUserGroup} as='div'>
    Contact
   </SidebarItem>

   </Link>
      )
     }



  <SidebarItem  icon={HiArrowSmRight} onClick={handleSignout}> Sign Out </SidebarItem>
    </SidebarItemGroup>
   </SidebarItems>

  
    </Sidebar>
  )
}

export default DashSidebar