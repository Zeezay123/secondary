import { Button, FileInput, Label, Select, Textarea, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { PaystackButton } from 'react-paystack'
import girl from '../assets/girls2.png'
import books from '../assets/books.png'
import SecondHero from '../components/SecondHero'
import { useEffect } from 'react'
import { set } from 'mongoose'
import { cache } from 'react'
import axios from 'axios'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCheck } from 'react-icons/fa6';



const ApplicationForm = ({reference, amount}) => {
   
  const [files, setFiles] = useState()
  const [previews, setPreviews] = useState()
    const [states, setStates] = useState([])
    const [lga, setLga] = useState([])
    const [selectedState, setSelectedState] =useState('Abia') 
    const [selectedLga, setSelectedLga] =useState('') 
    // const [amount, setAmount] =  useState(10000)
//     const [idx, setIdx] = useState(null)
// const [tags, setTags] = useState([])
// const TagRef = useRef({})
const [parent, setParent] = useState({firstname:'', othername:'', lastname:'', email:'', phone:'', state:'', lga:'', relationship:''})
const [children, setChildren] = useState({
  referenceID:reference,
  PreviousSchoolName:'',
  LastClassInPreviousSchool:'',
  ReasonForLeaving:'',
  DateOfTransferCertificate:'',
  FirstName:'',
  MiddleName:'',
  LastName:'',
  Gender:'',
  DateOfBirth:'',
  Nationality:'',
  OtherNationality:'',
  StateOfOrigin:'',
  LGA:'',
  Religion:'',
  ParentName:'',
  ContactAddress:'',
  PhoneNumber:'',
  AlternativePhoneNumber:'',
  Email:'',
  ProfilePicture:'',
  applicationNumber:'',
  Password:'',
  Genotype:'',
  Health:'',
  PositionInFamily:'',
  deleted:0,
  sessionID:''


})
const [sesh, seshset] = useState('')

const newAmount = amount



useEffect(()=>{

      const fetchPay = async()=>{

        const res = await fetch(`/api/payment/`)
      }

 

      getSession()

},[])


     const getSession = async()=>{

        try{
        const res = await fetch('/api/form/getSessions', {
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          } 
        })

        const data = await res.json()
        if(!res.ok){
          console.log('error fetching session')
          return
        }

        seshset(data)
        console.log(data)
      }catch(error){
        console.log(error)
      }


}
  
useEffect(()=>{

    const fetchStates = async ()=>{
      const res = await fetch(`https://nga-states-lga.onrender.com/fetch`)
      const data = await res.json()

      if(!res.ok){
        console.log(res) 
        return
      }
      try {
        
        setStates(data)
      } catch (error) {
        console.log(error)
      }
    }
  fetchStates()
  },[])

  useEffect(()=>{

    const fetchLga = async ()=>{
      const res = await fetch(`https://nga-states-lga.onrender.com/?state=${selectedState}`)
      const data = await res.json()

      if(!res.ok){
        console.log(res) 
        return
      }

      setLga(data)
    }
  fetchLga()
  },[selectedState])
 

const handleSelectedState =(e)=>
{
 setSelectedState(e.target.value)
 setParent({...parent, state:e.target.value})
}

const handleSuccess =()=>{
    setPaid(true)
}


const handleSelectedLga =(e)=>{
  setSelectedLga(e.target.value)
  setParent({...parent, lga:e.target.value})
} 

// const removeEle =(index)=>{
//   // tags.splice(index,1)
//   setTags(tags.filter((data)=> data.id !== index))

// }




// useEffect(()=>{
//  const num =2 
// const newChildren = []  

// for(let i=0; i< childnum; i++){
//   const newChild ={
//     id:i+1,
//     firstname:'',
//     lastname:'',
//     othername:'',
//     gender:'',
//     class:'',
//     amount:newAmount
//   }
// newChildren.push(newChild)

// setChildren(children.push(newChild)) 
  
// }
// setChildren(newChildren)

// },[])



 const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create preview
    const preview = URL.createObjectURL(file);
    setPreviews(preview);
    
    // Upload file to backend
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: formData
      });
      
      if (!res.ok) {
        throw new Error('Failed to upload file');
      }
      
      const filename = await res.json();
      setChildren({...children, ProfilePicture: filename});
      alert('Profile picture uploaded successfully!');
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload profile picture. Please try again.');
    }
  };


const handleSubmit= async()=>{
  // Validate required fields
  if (!children.FirstName || !children.LastName || !children.DateOfBirth || !children.Email) {
    return alert('Please fill all required fields')
  }

  const newPassword = children.LastName.toLowerCase() + children.DateOfBirth.split('-').join('')
  
  const formData = {
    ...children,
    referenceID: reference,
    Password: newPassword,
    sessionID: 1,
    ParentData: parent // Include parent information
  }
  
try{

const res = await fetch(`/api/form/create`,{
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)

  })

  if(!res.ok){
    const error = await res.json()
    return alert(error.message || 'Error submitting form')
  }

  const data = await res.json()
  
  alert(`Application form submitted successfully! Your application number is: ${data.applicationNumber}`)
  
  // Reset form
  setChildren({
    referenceID:'',
    PreviousSchoolName:'',
    LastClassInPreviousSchool:'',
    ReasonForLeaving:'',
    DateOfTransferCertificate:'',
    FirstName:'',
    MiddleName:'',
    LastName:'',
    Gender:'',
    DateOfBirth:'',
    Nationality:'',
    OtherNationality:'',
    StateOfOrigin:'',
    LGA:'',
    Religion:'',
    ParentName:'',
    ContactAddress:'',
    PhoneNumber:'',
    AlternativePhoneNumber:'',
    Email:'',
    ProfilePicture:'',
    applicationNumber:'',
    Password:'',
    Genotype:'',
    Health:'',
    PositionInFamily:'',
    deleted:0,
    sessionID:''
  })
  setParent({firstname:'', othername:'', lastname:'', email:'', phone:'', state:'', lga:'', relationship:''})
  setPreviews(null)

}catch(error){ 
  alert('Error submitting form: ' + error.message)
  console.log(error.message)
}

  
  
}

 return (
    <section className='w-full'> 
      <div> 
    <h1 className='font-[inter] font-bold text-2xl p-5 text-black text-center'> Fill Parent Details </h1> 
    </div>
    
    <div className='max-w-4xl mx-auto  bg-slate-100  rounded-lg'>
   


   <div className='grid grid-cols-2  px-8 mx-auto gap-5 mb-5 py-10  '>
    
       <div>  <Label className='text-sm' htmlFor='firstname'> First name</Label>
       <TextInput 
       id='fullname'
       type='text'
       placeholder='firstname'
       value={parent.firstname}
       onChange={(e)=>setParent({...parent, firstname:e.target.value})}
       />
        </div>

       <div>  <Label className='text-sm' htmlFor='othername'> Other name</Label>
       <TextInput 
       id='othername'
       type='text'
       placeholder='othername'
        value={parent.othername}
       onChange={(e)=>setParent({...parent, othername:e.target.value})}
       />
        </div>

         <div>  <Label className='text-sm' htmlFor='lastname'> Last name</Label>
       <TextInput 
       id='lastname'
       type='text'
       placeholder='lastname'
      value={parent.lastname}
       onChange={(e)=>setParent({...parent, lastname:e.target.value})}
       />
        </div>

      <div>  <Label htmlFor='email'> Email</Label>
       <TextInput
       id='email'
       type='email'
       placeholder='example@email.com'
       required
       value={parent.email}
       onChange={(e)=>setParent({...parent, email:e.target.value})}
       />
        </div>

        <div>  <Label htmlFor='phone'> Phone Number</Label>
       <TextInput
       id='phone'
       type='number'
       placeholder='0803558978892'
         value={parent.phone}
       onChange={(e)=>setParent({...parent, phone:e.target.value})}
       />
        </div>

         <div>  <Label> State</Label>
       <Select onChange={(e)=>handleSelectedState(e)}>
         <option value=''>Select State</option>
        {states.map((data,index)=>(
          <option key={index} value={data} > {data}</option>
        ))}
       </Select>
        </div>

        <div>  <Label> LGA</Label>
       <Select onChange={(e)=>handleSelectedLga(e)}>
          <option value=''>Select LGA</option>
        {lga.map((data,index)=>(
          <option key={index} value={data} > {data}</option>
        ))}
       </Select>
        </div>

<div>  <Label> I am a </Label>
       <Select 
       onChange={(e)=>setParent({...parent, relationship:e.target.value})}>
        <option value="">Select Relationship</option>
        <option value="parent">Parent</option>
        <option value="guardian">Guardian</option>

       </Select>
        </div>

   </div>



      </div>
 

 <div> 
    <h1 className='font-[inter] font-bold text-2xl p-5 text-black text-center'> { `Student Details`} </h1> 
    </div>



<div  className='mx-auto max-w-4xl'>
  <h2 className='font-semibold text-xl'> Personal Details</h2>
 
  <div className='max-w-4xl mx-auto bg-slate-100  rounded-lg mt-10 px-8 py-10 mb-10 '> 

 
    
    <div className='grid grid-cols-2 items-center justify-center min-w-[800px] px-8  gap-5 mx-auto'>


       <div>  <Label className='text-sm' htmlFor='firstname'> First name</Label>
       <TextInput 
       id='firstname'
       type='text'
       placeholder='firstname'
       value={children.FirstName}
       onChange={(e)=>setChildren({...children, FirstName:e.target.value})}
       />
       
        </div>

       <div>  <Label className='text-sm' htmlFor='middlename'> Middle name</Label>
       <TextInput 
       id='middlename'
       type='text'
       placeholder='Middlename'
       value={children.MiddleName}
       onChange={(e)=>setChildren({...children, MiddleName:e.target.value})}
       />
        </div>

         <div>  <Label className='text-sm' htmlFor='lastname'> Last name</Label>
       <TextInput 
       id='lastname'
       type='text'
       placeholder='lastname'
       value={children.LastName}
       onChange={(e)=>setChildren({...children, LastName:e.target.value})}
       />
        </div>


  <div className=''> 
        <Label htmlFor={`Gender`}> Gender</Label>
       <Select 
       id={`gender`}
       value={children.Gender}
       
       onChange={(e)=>setChildren({...children, Gender:e.target.value})} > 
        <option value=''>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
       </Select>

      
        </div>
        
      
      <div>  <Label className='text-sm' htmlFor='prevScl'> Previous School Name</Label>
       <TextInput 
       id='prevScl'
       type='text'
       placeholder='previous school name'
       value={children.PreviousSchoolName}
       onChange={(e)=>setChildren({...children, PreviousSchoolName:e.target.value})}
       />
        </div>
        


        
  <div className=''> 
        <Label htmlFor={`lastClass`}> Last class in previous school</Label>
       <Select
       id='lastClass'
       value={children.LastClassInPreviousSchool}
       onChange={(e)=>setChildren({...children, LastClassInPreviousSchool:e.target.value})}
       > 
        <option value=''>Select Last Class</option>
        <option value="jss1">Junior Secondary School 1</option>
        <option value="jss2">Junior Secondary School 2</option>
        <option value="ss1">Senior Secondary School 1</option>
        <option value="ss2">Senior Secondary School 2</option>
       </Select>

      
        </div>


        <div className='col-span-2'>  <Label className='text-sm' htmlFor='reason'> Reason for Leaving School</Label>
       <Textarea 
      
       rows={4}
       id='reason'
       type='text'
       placeholder='reason for leaving'
       value={children.ReasonForLeaving}
       onChange={(e)=>setChildren({...children, ReasonForLeaving:e.target.value})}
       />
        </div>

        <div>  <Label className='text-sm' htmlFor='dateofcert'> Date of Transfer Certificate</Label>
       <TextInput 
       id='dateofcert'
       type='Date'
       placeholder='date of transfer certificate'
       value={children.DateOfTransferCertificate}
       onChange={(e)=>setChildren({...children, DateOfTransferCertificate:e.target.value})}
       />
        </div>
     
        <div>  <Label className='text-sm' htmlFor='dateofbirth'> Date of Birth</Label>
       <TextInput 
       id='dateofbirth'
       type='Date'
       placeholder='date of birth'
       value={children.DateOfBirth}
       onChange={(e)=>setChildren({...children, DateOfBirth:e.target.value})}
       />
        </div>
        
         <div>  <Label className='text-sm' htmlFor='nationality'> Nationality</Label>
       <TextInput 
       id='nationality'
       type='text'
       placeholder='what is your nationality'
       value={children.Nationality}
       onChange={(e)=>setChildren({...children, Nationality:e.target.value})}
       />
</div>

        <div>  <Label className='text-sm' htmlFor='origin'> State of Origin</Label>
       <TextInput 
       id='origin'
       type='text'
       placeholder='what is your nationality'
       value={children.StateOfOrigin}
       onChange={(e)=>setChildren({...children, StateOfOrigin:e.target.value})}
       />
</div>
       
        <div>  <Label className='text-sm' htmlFor='lga'> LGA of origin</Label>
       <TextInput 
       id='lga'
       type='text'
       placeholder='what is your nationality'
       value={children.LGA}
       onChange={(e)=>setChildren({...children, LGA:e.target.value})}
       />
</div>

   <div>  <Label className='text-sm' htmlFor='Religion'> Religion</Label>
       <TextInput 
       id='Religion'
       type='text'
       placeholder='what is your religion'
       value={children.Religion}
       onChange={(e)=>setChildren({...children, Religion:e.target.value})}
       />
</div>

   <div>  <Label className='text-sm' htmlFor='Genotype'> Genotype</Label>
       <Select 
       id='Genotype'
       value={children.Genotype}
       onChange={(e)=>setChildren({...children, Genotype:e.target.value})}
       >
        <option value=''>Select Genotype</option>
        <option value='AA'>AA</option>
        <option value='AS'>AS</option>
        <option value='AC'>AC</option>
        <option value='SS'>SS</option>
        <option value='SC'>SC</option>
       </Select>
</div>

   <div className='col-span-2'>  <Label className='text-sm' htmlFor='Health'> Health Status/Medical Condition</Label>
       <Textarea 
       id='Health'
       rows={3}
       placeholder='Any medical conditions or allergies'
       value={children.Health}
       onChange={(e)=>setChildren({...children, Health:e.target.value})}
       />
</div>

   <div>  <Label className='text-sm' htmlFor='OtherNationality'> Other Nationality (if applicable)</Label>
       <TextInput 
       id='OtherNationality'
       type='text'
       placeholder='other nationality'
       value={children.OtherNationality}
       onChange={(e)=>setChildren({...children, OtherNationality:e.target.value})}
       />
</div>

   <div>  <Label className='text-sm' htmlFor='Parentname'> Name of Parent</Label>
       <TextInput 
       id='parentName'
       type='text'
       placeholder='what is your nationality'
       value={children.ParentName}
       onChange={(e)=>setChildren({...children, ParentName:e.target.value})}
       />
</div>

   <div>  <Label className='text-sm' htmlFor='ContactAddress'> Contact Addrsss</Label>
       <TextInput 
       id='contanctAddress'
       type='text'
       placeholder='enter your contact address'
       value={children.ContactAddress}
       onChange={(e)=>setChildren({...children, ContactAddress:e.target.value})}
       />
</div>

   <div>  <Label className='text-sm' htmlFor='phoneNum'> Phone Number</Label>
       <TextInput 
       id='phonenum'
       type='number'
       placeholder='enter your phone number'
       value={children.PhoneNumber}
       onChange={(e)=>setChildren({...children, PhoneNumber:e.target.value})}
       />
</div>

   <div>  <Label className='text-sm' htmlFor='AltphoneNum'> Alt. Phone Number</Label>
       <TextInput 
       id='Altphonenum'
       type='number'
       placeholder='enter alternate phone number'
       value={children.AlternativePhoneNumber}
       onChange={(e)=>setChildren({...children, AlternativePhoneNumber:e.target.value})}
       />
</div>




   <div>  <Label className='text-sm' htmlFor='email'> Email</Label>
       <TextInput 
       id='email'
       type='text'
       placeholder='enter your email address'
       value={children.Email}
       onChange={(e)=>setChildren({...children, Email:e.target.value})}
       />
</div>

   <div>  <Label className='text-sm' htmlFor='PositionInFamily'> Position in Family</Label>
       <TextInput 
       id='positioninfamily'
       type='number'
       placeholder='enter your position in family'
       value={children.PositionInFamily}
       onChange={(e)=>setChildren({...children, PositionInFamily:e.target.value})}
       />
</div>


   <div className='col-span-2'>  <Label className='text-sm' htmlFor='profilepicture'> Upload profile picture</Label>
       
      <div className='flex gap-4 items-center'>  
        <FileInput 
         id='profilepicture'
         type='file'
         accept='image/*'
         onChange={(e)=>handleFileChange(e) }
        />
        {previews && (
          <img src={previews} alt='Preview' className='h-20 w-20 object-cover rounded' />
        )}
      </div>  
       
</div>



  <div className=''> 
        <Label htmlFor={`Gender`}> Session Applying For</Label>
       <Select 
       id={`gender`}
       value={children.sessionID}
       
       onChange={(e)=>setChildren({...children, sessionID:e.target.value})} > 
        {/* <option value="Male">Male</option>
        <option value="Female">Female</option> */}
         <option value=''>Select Session</option>
        {sesh && sesh.map((data, index)=>(
          <option key={index} value={data.id}> {data.SessionName} </option>
        ))}
       </Select>

      
        </div>


</div>
</div>

</div>
 


     
     <div className='max-w-4xl mx-auto' >  <Button className='w-full mb-12' onClick={handleSubmit}>Submit</Button> </div> 
    </section>
  )
}

export default ApplicationForm  