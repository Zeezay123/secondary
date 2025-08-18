import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess,signInFailure,signInStart  } from '../Redux/user/slice.js'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
     
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick= async ()=>{
        //use the app coming from firbase so google knows who's asking 
       
        const provider = new GoogleAuthProvider();
        // makes sure you get a goole account selection pop-up always 
        provider.setCustomParameters({ prompt: 'select_account'})
        try{
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            console.log(resultsFromGoogle)
           const res = await fetch('/api/auth/google',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
               name: resultsFromGoogle.user.displayName,
               email: resultsFromGoogle.user.email,
               googlePhotoUrl: resultsFromGoogle.user.photoURL
            }),
           }) 
        const data = await res.json()
        if (res.ok){
         dispatch(signInSuccess(data))
        return navigate('/')
        }
        }catch(error){
             console.log(error)
        }
    }

  return (
    <Button type='button' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className=' w-6 h-6 mr-2'/>
        Continue with Google </Button>
  )
}

export default OAuth 