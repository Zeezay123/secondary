import { useState } from 'react'
import { BrowserRouter, Link,Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import HeaderMenu from './components/HeaderMenu'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePost'
import PostPage from './Pages/PostPage'
// import Admision from './Pages/Admision'
// import DashCourse from './components/DashCourse'
import DepartmentPage from './Pages/DepartmentPage'
import Test from './Pages/Test'
import Secondary from './components/Secondary'
import Principal from './Pages/Principal'
import Teacher from './Pages/Teacher'
import Apply from './Pages/Apply'
import Anthem from './Pages/Anthem'
import Clubs from './Pages/Clubs'
import InterhouseSports from './Pages/Interhouse'
import Quiz from './Pages/Quiz'
import Excursion from './Pages/Excursion'
import Culture from './Pages/Culture'
import Arts from './Pages/Arts'
import Alumni from './Pages/Alumni'
import Prefects from './Pages/Prefects'
import CreateActivity from './Pages/CreateActivity'
import Teachers from './components/Teachers'



function App() {


  return (
    <BrowserRouter>
    <HeaderMenu />
      <Routes>
        <Route path='/' element={<Test/>} />
        <Route path='/about' element={<About />} />
        <Route path='/posts' element={<Blog />} />
        <Route path='/principal' element={<Principal/>} />
        <Route path='/teacher' element={<Teachers/>} />
        {/* <Route path='/programmes' element={<Programmes/>} /> */}
        {/* <Route path='/admision' element={<Admision/>} /> */}
        <Route path='/anthem' element={<Anthem/>} />
        <Route path='/secondary' element={<Secondary/>}/>
        <Route path='/excursion' element={<Excursion/>}/>
        <Route path='/clubs' element={<Clubs/>}/>
        <Route path='/interhouse' element={<InterhouseSports/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/apply' element={<Apply/>} />
        <Route path='/culture' element={<Culture/>} />
        <Route path='/art' element={<Arts/>} />
        <Route path='/alumni' element={<Alumni/>} />
        <Route path='/prefects' element={<Prefects/>}/>
        <Route element={<PrivateRoute/>}>         
        <Route path='/dashboard' element={<Dashboard />} />
           </Route>

           <Route element={<PrivateRoute/>}>       
           <Route path='/create-activity' element={<CreateActivity/>} />   
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />}/>
        {/* <Route path='/create-course' element={<DashCourse />}/> */}
           </Route>
        <Route path='/programmes/:id' element={<DepartmentPage/>}/>
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
