import React from 'react'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react'
import {HiUser, HiArrowSmRight, HiDocumentText, HiDocumentSearch, HiOutlineUser, HiOutlineUserGroup} from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { signOutSuccess } from '../Redux/user/slice'
import { useDispatch, useSelector } from 'react-redux'


const DashSidebar = () => {
  const {currentUser} = useSelector(state=>state.user)
  const location = useLocation();
 const [tab, setUseTab] = useState('')
 const dispatch = useDispatch()

 useEffect(()=>{
  // Get the tab from the URL query parameters
  // This assumes the URL is like /dashboard?tab=someTab
  const urlParams = new URLSearchParams(location.search) // 
  const tabFromUrl = urlParams.get('tab') 
 
if(tabFromUrl){
  setUseTab(tabFromUrl)
}
 
 }, [location.search])



 
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
    <Sidebar className='md:w-56'>
   <SidebarItems className='cursor-pointer'>
    <SidebarItemGroup className='flex flex-col gap-1'>
   <Link to='/dashboard?tab=profile' > 
    <SidebarItem as='div'
     active={tab === 'profile'}
      icon={HiUser} label={ currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark'>
      Profile
     </SidebarItem></Link>


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
 <Link to={'/dashboard?tab=users'}> 

   <SidebarItem
   active={tab === 'users'}
   icon={HiOutlineUserGroup} as='div'>
    Users
   </SidebarItem>
   
   </Link>
      )
     }

     {
      currentUser.isAdmin && (
 <Link to={'/dashboard?tab=course'}> 

   <SidebarItem
   active={tab === 'course'}
   icon={HiOutlineUserGroup} as='div'>
    Courses
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
    About
   </SidebarItem>
   
   </Link>
      )
     }


    {
      currentUser.isAdmin && (
 <Link to={'/dashboard?tab=staff'}> 

   <SidebarItem
   active={tab === 'staff'}
   icon={HiDocumentText} as='div'>
    Directory
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




  <SidebarItem  icon={HiArrowSmRight} onClick={handleSignout}> Sign Out </SidebarItem>
    </SidebarItemGroup>
   </SidebarItems>

  
    </Sidebar>
  )
}

export default DashSidebar