import React, { useState } from 'react';
import logo from '../assets/delsulogo.png';
import { Avatar, Button,Dropdown, Navbar, DropdownHeader, DropdownItem, DropdownDivider} from 'flowbite-react';
import { Link, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaMoon } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import {toggleTheme} from '../Redux/theme/themeslice.js'
import { signOutSuccess } from '../Redux/user/slice.js';

const HeaderMenu = () => {

  const [moonToggle, setMoonToogle] = useState(false);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = useLocation().pathname;
  const currentUser = useSelector(state => state.user.currentUser);
  

  
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
   
      <Navbar className="bg-white  justify-between w-full">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link  className="flex items-center" to="/">
            <img src={logo} className="h-10 mr-3" alt="Delsu Logo" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">Delta State University</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to='/'  className={`font-semibold  ${path == '/' ? 'text-blue-700':'dark:text-white text-gray-700' }`}>Home</Link>
            <Link to='/programmes'  className={`font-semibold  ${path == '/programmes' ? 'text-blue-700':'dark:text-white text-gray-700 ' }`}>Programmes</Link>
            {/* <Link to='/dashboard'  className={`font-semibold  ${path == '/dashboard' ? 'text-blue-700':'dark:text-white text-gray-700' }`}>Dashboard</Link> */}
            <Link to='/about'  className={`font-semibold  ${path == '/about' ? 'text-blue-700':'dark:text-white text-gray-700' }`}>About</Link>
            <Link to='/posts'  className={`font-semibold  ${path == '/posts' ? 'text-blue-700':'dark:text-white text-gray-700' }`}>Blog</Link>
            <Link to='/admision'  className={`font-semibold  ${path == '/admision' ? 'text-blue-700':'dark:text-white text-gray-700' }`}>Admision</Link>
           
          </div>
{/* 
        <Button onClick={()=> dispatch(toggleTheme())}>
          
           <FaMoon />
          </Button>   */}


          {/* Buttons */}

          {currentUser ? (<>
          <Dropdown 
          className='z-50'
            arrowIcon={false}
           inline 
           label={
            <Avatar
            alt='user'
            img={currentUser?.profilePhoto}
            rounded/>
           }
           >
          
          <DropdownHeader>
            <span className='block text-sm font-medium'> @{currentUser?.username || 'User'}</span>
            <span className='block text-sm font-medium truncate'> @{currentUser?.email || 'email'}</span>
          </DropdownHeader>
            <Link to='/dashboard?tab=profile'>
             <DropdownItem>
               Profile
             </DropdownItem>
            </Link> 
            <DropdownDivider/>
              <Link to={'/dashboard?tab=signout '}>
             <DropdownItem onClick={handleSignout}>
               Sign out
             </DropdownItem>
            </Link> 
          </Dropdown>
          
          </>):(

  null
   
          )}
     

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 space-y-2 px-4 bg-white">
             <Link to='/'  className={`font-semibold block ${path == '/' ? 'text-blue-700':'text-gray-700' }`}>Home</Link>
            <Link to='/projects'  className={`font-semibold block ${path == '/projects' ? 'text-blue-700':'text-gray-700' }`}>Programmes</Link>
            {/* <Link to='/dashboard'  className={`font-semibold block ${path == '/dashboard' ? 'text-blue-700':'text-gray-700' }`}>Dashboard</Link> */}
            <Link to='/about'  className={`font-semibold block ${path == '/about' ? 'text-blue-700':'text-gray-700' }`}>About</Link>
            <Link to='/blog'  className={`font-semibold block ${path == '/blog' ? 'text-blue-700':'text-gray-700' }`}>Blog</Link>
            
          </div>
        )}
      </Navbar>

  );
};

export default HeaderMenu;
