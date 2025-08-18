import React from 'react'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import logo from '../assets/delsulogo.png'
import { Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { useDispatch, useSelector}  from 'react-redux'
import {signInStart, signInSuccess, signInFailure} from '../Redux/user/slice.js'
import OAuth from '../components/OAuth.jsx'

const Signin = () => {

const [formData, setFormData] = useState({});
const {loading, error: error} = useSelector((state) => state.user)
const dispatch = useDispatch();

const navigate = useNavigate();

// handle input changes
// update formData state with input values
const handleChange = (e)=>{
e.preventDefault()

// trim the input value to remove leading and trailing spaces
setFormData({...formData, [e.target.id]: e.target.value.trim('')})
}

const handleSubmit = async (e)=>{
e.preventDefault()
if(!formData.username || !formData.password){
  return dispatch(signInFailure('please fill all fields'))
}

try{

  dispatch(signInStart());
  
  // send a POST request to the signup endpoint
  // with the form data as JSON
  const res= await fetch('/api/auth/signin',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const data = await res.json();
console.log(data)

if(data.success == false){
  return dispatch(signInFailure(data.message))
}

if(res.ok){
  dispatch(signInSuccess(data))
 return navigate('/Dashboard')
}

}catch(error){
  dispatch(signInFailure(error.message));
  console.log(error)
 }

}
 
  return (
    <section className='flex flex-col items-center  justify-center gap-10 p-5 min-h-screen lg:px-10'>
      <div className='flex flex-col items-center justify-center'>
        <div className='mb-5 w-[8rem] h-[8rem] md:w-[12rem] md:h-[12rem]  '>  <img className='h-full w-full object-contain' src={logo} alt="delsu logo" /></div> 
        <h1 className='font-bold font-sans text-3xl mt-5 mb-5 self-center text-center w-[300px] md:w-full  md:text-4xl'>Welcome to Delsu Distance Learning CMS </h1>
      </div>

 
      <div className='w-[20rem]  md:w-[25rem] flex flex-col items center'>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <div>
            <Label value='Your Username' />
            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
          </div>
         
          <div>
            <Label value='Your password' />
            <TextInput type='password' placeholder='password' id='password' onChange={handleChange} />
          </div>

          <Button type='submit' disabled={loading}>
            { loading ? (<><Spinner size='sm'/> <span className='pl-3'> Loading.... </span> </> ) : ('Sign In')}
          </Button>

          <OAuth />
        </form>

        <div className='flex gap-2 text-sm mt-2 items-center justify-center'>

          <span className='font-medium'> Don't Have an account?</span>
          <Link to='/signup' className='text-blue-800' > 
        Sign up  
          </Link>

        </div>

        {
          error && <div>
            <Alert color="failure" className='mt-5'>{error}</Alert>
          </div>
        }
      </div>
      
      </section>
  )
}

export default Signin
