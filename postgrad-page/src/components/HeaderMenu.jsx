import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/delsulogo.png';
import { Avatar, Button,Dropdown, Navbar, DropdownHeader, DropdownItem, DropdownDivider, ChevronDownIcon, ChevronUpIcon} from 'flowbite-react';
import { Link, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaMoon } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import {toggleTheme} from '../Redux/theme/themeslice.js'
import { signOutSuccess } from '../Redux/user/slice.js';
import Excursion from '../Pages/Excursion.jsx';

const HeaderMenu = () => {

  const [transMode, setTrasnMode] = useState(false);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = useLocation().pathname;
  const currentUser = useSelector(state => state.user.currentUser);
  const [textCol, setTestCol] = useState('black')
  const [drop, setDrop] = useState(false)
  const AboutRef = useRef({})
  const [openIndex, setOpenIndex] = useState(null)
  // const handleDrop=(index)=>{
  //   setDrop((p)=> index == p ? null : p )
  // }
  
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
  

const menus =[
  {
    title:'About us',
    child:['About','Principal','Teacher', 'Prefects','Alumni']
  },

   {
    title:'Admission',
    child:['Apply']
  },

   {
    title:'School Life',
    child:['Anthem', 'Clubs', 'Quiz', 'Excursion', 'Interhouse','Culture']
  },

   {
    title:'Portals',
    child:['Teacher', 'Student']
  },



]


 const listenScrollEvent = () => {
  if  (window.scrollY > 10 ) {
    setTrasnMode(true) 
    setTestCol('white') 
  }
  else {
    setTestCol('black')
    setTrasnMode(false)
  
  }
  
    
    
};
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };

   
 
  }, []);


  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
 
    


  return (
    <section className=' relative '> 

   {
   !currentUser ? (
   <nav className='hidden md:flex w-full justify-between items-center  fixed z-50 py-5 md:px-8'>
     
  {transMode ? <div className=''> </div> :  <Link  className="flex items-center" to="/">
            <img src={logo} className="h-10 mr-3" alt="Delsu Logo" />
            <span className={` text-xl font-bold text-black `}>Delta State University</span>
          </Link>}
     


     {/* <div  className='flex justify-between bg-white/50 backdrop-blur-3xl font-semibold text-sm w-fit gap-5 py-3 px-5 rounded-full font-[inter] text-black '>
     <div  onMouseEnter={()=>setDrop(true)} onMouseLeave={()=>setDrop(false)} className=' h-full'
     > <div className='flex relative items-center justify-center transition-transform duration-500 gap-1'> <h1> About Us</h1>  {drop ? <ChevronUpIcon/> :<ChevronDownIcon/>}  </div>
     
      { drop && 
    <div className='flex items-center justify-center font-[inter] w-35 gap-3 font-medium text-sm text-black flex-col absolute top-8 p-2'> 
        <div className='bg-white/30 rounded shadow backdrop-blur-3xl mt-3 w-30 grid grid-rows-1 gap-3 px-2 py-2'>
          <Link to={'/about'} className='px-3 hover:bg-white rounded '> Framework</Link>
          <Link to={'/principal'} className='px-3 hover:bg-white rounded '> Principals</Link>
          <Link className='px-3 hover:bg-white rounded '>Teachers</Link>
          <Link className='px-3 hover:bg-white rounded '>Anthem</Link>
    
      </div> </div>  
      } </div>
    
      <div  onMouseEnter={()=>setDrop(true)} onMouseLeave={()=>setDrop(false)} className=' h-full'
     > <div className='flex relative items-center justify-center transition-transform duration-500 gap-1'> <h1> About Us</h1>  {drop ? <ChevronUpIcon/> :<ChevronDownIcon/>}  </div>
     
      { drop && 
    <div className='flex items-center justify-center font-[inter] w-35 gap-3 font-medium text-sm text-black flex-col absolute top-8 p-2'> 
        <div className='bg-white/30 rounded shadow backdrop-blur-3xl mt-3 w-30 grid grid-rows-1 gap-3 px-2 py-2'>
          <Link to={'/about'} className='px-3 hover:bg-white rounded '> Framework</Link>
          <Link to={'/principal'} className='px-3 hover:bg-white rounded '> Principals</Link>
          <Link className='px-3 hover:bg-white rounded '>Teachers</Link>
          <Link className='px-3 hover:bg-white rounded '>Anthem</Link>
    
      </div> </div>  
      } </div>
     <Link to='/apply'>Admission</Link>
     <Link >School Life</Link>
     <Link>Teachers</Link>
     <Link>Portal</Link>
     
     </div> */}

     {
     <div className="flex bg-white py-2 px-8 gap-10 rounded-full shadow ">
      {menus.map((data, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center"
        
        >
          <div  
            onClick={() => toggleDropdown(index)}
            className="flex items-center gap-2 text-gray-800 font-medium hover:text-blue-600"
          >
            <span>{data.title}</span>
            {data.child && data.child.length > 0 ? (
              openIndex === index ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )
            ) : null}
          </div>

          {/* Dropdown */}
          {data.child && data.child.length > 0 && openIndex === index && (
            <div className="absolute flex flex-col top-10 bg-white border shadow-md rounded-md py-2 px-4 min-w-[150px]">
              {data.child.map((sub, i) => (
                <Link to={`/${sub}`}
                  key={i}
                  className="block font-[inter] py-1 px-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded cursor-pointer"
                >
                  {sub}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
     }
      
     </nav>) :
   
<></>

//    <Navbar className={`${currentUser ? 'bg-blue-900  justify-between w-fulljustify-between w-full fixed z-50 top-0 left-0 ' : `${transMode ? 'bg-white text-white w-full' : 'bg-transparent text-gray-900'}  `}`}>
//         <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
//           {/* Logo */}
//           <Link  className="flex items-center" to="/">
//             <img src={logo} className="h-10 mr-3" alt="Delsu Logo" />
//             <span className={` text-xl font-bold ${transMode ?'text-black dark:text-white' : 'text-white'}`}>Delta State University</span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center space-x-8">
//             <Link to='/'  className={`font-semibold  ${path == '/'  ? 'text-blue-700': `${ transMode ?'text-black' : 'text-white'}` }`}>Home</Link>
//             <Link to='/programmes'  className={`font-semibold  ${path == '/programmes' ? 'text-blue-700':`${ transMode ?'text-black' : 'text-white'}` }`}>Programmes</Link>
//             {/* <Link to='/dashboard'  className={`font-semibold  ${path == '/dashboard' ? 'text-blue-700':'dark:text-white text-gray-700' }`}>Dashboard</Link> */}
//             <Link to='/about'  className={`font-semibold  ${path == '/about' ? 'text-blue-700':`${ transMode ?'text-black' : 'text-white'}` }`}>About</Link>
//             <Link to='/posts'  className={`font-semibold  ${path == '/posts' ? 'text-blue-700':`${ transMode ?'text-black' : 'text-white'}` }`}>Blog</Link>
//             <Link to='/admision'  className={`font-semibold  ${path == '/admision' ? 'text-blue-700':`${ transMode ?'text-black' : 'text-white'}` }`}>Admission</Link>
           
//           </div>
// {/* 
//         <Button onClick={()=> dispatch(toggleTheme())}>
          
//            <FaMoon />
//           </Button>   */}


//           {/* Buttons */}
  
//           {currentUser ? (<>
//           <Dropdown 
//           className='z-50'
//             arrowIcon={false}
//            inline 
//            label={
//             <Avatar
//             alt='user'
//             img={currentUser?.profilePhoto}
//             rounded/>
//            }
//            >
          
//           <DropdownHeader>
//             <span className='block text-sm font-medium'> @{currentUser?.username || 'User'}</span>
//             <span className='block text-sm font-medium truncate'> @{currentUser?.email || 'email'}</span>
//           </DropdownHeader>
//             <Link to='/dashboard?tab=profile'>
//              <DropdownItem>
//                Profile
//              </DropdownItem>
//             </Link> 
//             <DropdownDivider/>
//               <Link to={'/dashboard?tab=signout '}>
//              <DropdownItem onClick={handleSignout}>
//                Sign out
//              </DropdownItem>
//             </Link> 
//           </Dropdown>
          
//           </>):(

//   null
   
//           )}
     

//           {/* Mobile Toggle Button */}
//           <button
//             className="lg:hidden text-gray-700 focus:outline-none"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               {isMobileMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden mt-3 space-y-2 px-4 bg-white">
//              <Link to='/'  className={`font-semibold block ${path == '/' ? 'text-blue-700':'text-gray-700' }`}>Home</Link>
//             <Link to='/projects'  className={`font-semibold block ${path == '/projects' ? 'text-blue-700':'text-gray-700' }`}>Programmes</Link>
//             {/* <Link to='/dashboard'  className={`font-semibold block ${path == '/dashboard' ? 'text-blue-700':'text-gray-700' }`}>Dashboard</Link> */}
//             <Link to='/about'  className={`font-semibold block ${path == '/about' ? 'text-blue-700':'text-gray-700' }`}>About</Link>
//             <Link to='/blog'  className={`font-semibold block ${path == '/blog' ? 'text-blue-700':'text-gray-700' }`}>Blog</Link>
            
//           </div>
//         )}
//       </Navbar>
}
    </section>
  );
};

export default HeaderMenu;
