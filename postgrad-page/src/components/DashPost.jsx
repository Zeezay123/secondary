import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal,ModalBody,ModalHeader } from 'flowbite-react';
import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi'



const DashPost = () => {
const [userPosts, setUserPosts] = useState([]);
const {currentUser} = useSelector((state)=> state.user)
const [showMore, setShowMore] = useState(true);
const [showModal, setShowModal] = useState(false)
const [postIdToDelete, setPostIdToDelete] = useState('')

useEffect(() => {
const fetchPost = async () => {
  try {
    console.log('Fetching posts for user:', currentUser._id);
    const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
    
    console.log('Response status:', res.status);
    console.log('Response headers:', res.headers.get('content-type'));
    
    // Check if response is ok before trying to parse JSON
    if (!res.ok) {
      console.error('API response not ok:', res.status, res.statusText);
      return;
    }
    
    // Check if response has content
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON:', contentType);
      return;
    }
    
    // Get response text first to debug
    const responseText = await res.text();
    console.log('Raw response:', responseText);
    
    // Try to parse JSON
    if (responseText) {
      const data = JSON.parse(responseText);
      console.log('Parsed data:', data);
      
      if (data.posts) {
        setUserPosts(data.posts);
        // Check if we got less than 9 posts, meaning no more posts to load
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      } else {
        console.log('No posts in response');
        setUserPosts([]);
        setShowMore(false);
      }
    } else {
      console.log('Empty response');
      setUserPosts([]);
      setShowMore(false);
    }

  } catch (error) {
    console.error('Error fetching posts:', error);
    setUserPosts([]);
    setShowMore(false);
  }
}

if (currentUser && currentUser.isAdmin) {
  fetchPost();
}
 
}, [currentUser])

const handleShowMore = async()=>{
 const startIndex = userPosts.length
 try {
   console.log('Loading more posts, startIndex:', startIndex);
   const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
   
   if (!res.ok) {
     console.error('Show more API response not ok:', res.status, res.statusText);
     return;
   }
   
   const responseText = await res.text();
   console.log('Show more raw response:', responseText);
   
   if (responseText) {
     const data = JSON.parse(responseText);
     console.log('Show more parsed data:', data);
     
     if (data.posts) {
       setUserPosts((prev) => [...prev, ...data.posts]);
       if (data.posts.length < 9) {
         setShowMore(false);
       }
     }
   }
 } catch (error) {
   console.error('Error in handleShowMore:', error);
 }
}

const handleDelete= async ()=>{
  setShowModal(false)
 try {
  const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
    method:"DELETE",
     headers:{
      'Content-Type':'application/json'
    },
  })

  const data = res.json()
if(!res.ok){
  console.log(data.message)
}else {
   setUserPosts((prev) => prev.filter((post)=>post.id !== postIdToDelete))
}
 } catch (error) {
  console.log(error)
 }

}

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
    scrollbar-track-slate-100 scrollbar-thumb-amber-400 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500'>  

    
   {
     currentUser.isAdmin && userPosts.length > 0 ? (
     <>
    <Table className='shadow-md' hoverable>
      <TableHead>
        <TableHeadCell>Date Updated</TableHeadCell>
        <TableHeadCell>Post image</TableHeadCell>
        <TableHeadCell>Post title</TableHeadCell>
        <TableHeadCell>Category</TableHeadCell>
        <TableHeadCell> <span>  Delete</span></TableHeadCell>
        <TableHeadCell><span>Edit</span></TableHeadCell>
      </TableHead>
      <TableBody className='divide-y'>
        {userPosts.map((post) => (
          <TableRow key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <Link to={`/post/${post.slug}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className='w-20 h-10 object-cover bg-gray-500'
                />
              </Link>
            </TableCell>
            <TableCell>
              <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                {post.title}
              </Link>
            </TableCell>
            <TableCell>{post.category}</TableCell>
            <TableCell>
              <span 
              onClick={ ()=>{
          
          setShowModal(true)
          setPostIdToDelete(post._id)
          
          }}
              className='font-medium text-red-500 hover:underline cursor-pointer'>
                Delete
              </span>
            </TableCell>
            <TableCell>
              <Link className='text-teal-500 font-medium hover:underline' to={`/update-post/${post._id}`}>
                <span>Edit</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  {
   showMore && 
    <button onClick={handleShowMore} className='w-full text-blue-600 self-center text-sm py-7'>
    Show more
    </button>
  }

       </>
     ) : (<div> no post yet </div>)
   }

   <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
       <ModalHeader/>
       <ModalBody>
         <div className='tect-center flex flex-col items-center justify-center'>
   <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
   dark:text-gray200 mb-4 mx auto'/>
   
   <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
     Are you sure?
   </h3>
   
   <div className='flex gap-5 items-center'>
     <Button color="red" onClick={handleDelete}> Yes am sure!</Button>
   
     <Button color="gray" onClick={()=>setShowModal(false)}>No,Cancel</Button>
   </div>
         </div>
       </ModalBody>
      </Modal>
   
   </div>
  )
}

export default DashPost
