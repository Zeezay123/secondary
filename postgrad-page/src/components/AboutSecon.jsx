import React from 'react'
import image from '../assets/images/school4.jpg'

const AboutSecon = () => {

const data = {
    content: `Welcome to the website of University of Lagos Staff School Akoka Lagos.
     The School, located within the Akoka Campus was established on the 10th of October, 1966. 
     Being a community school, it was initially founded with the objective of providing primary 
     school education for the children of staff of the University. The Annex of the school at Idi-Araba
      was founded on 18th January, 1983 and the objective of its establishment like the main School was 
      to cater for primary education needs of children of staff in College of Medicine (CMUL) and Lagos
       University Teaching Hospital (LUTH). With expansion in the facilities of the school and the need to 
       be socially responsible, children of non-staff are given the privilege of admission opportunity. In 
       both the main School and the Annex, there are Nursery sections, that are well equipped and manned by
        qualified and experienced professionals trained in early childhood education.`,
        name: 'Mr. Agohogoh',
        post: 'Principal',
        mission:'',
        vission:'',
        phil:''

}

  return (
    
     <main className='flex flex-col items-center m-2 md:m-5'> 

    {/* <marquee behavior="" direction="left" 
    className='bg-blue-700 h-12  font-medium items-center flex w-full text-white '>
        Click <span className='font-bold underline underline-offset-2'> here </span>to register for the new academic session </marquee> */}

    <section className=' max-w-full h-[80vh] md:max-h-[70vh]
    rounded-3xl  flex flex-col p-1 md:px-5 md:mx-3  md:flex-row md:mt-25 '>
     
     
      <div className='flex flex-col w-full md:w-50% p-2 md:p-15'>

    

    <p className='w-full md:w-[90%] mt-5 font-[inter] text-sm md:text-lg/relaxed text-justify'>
        {data.content}
    </p>

    <p className='mt-5 font-[inter] text-lg font-bold text-black'>{data.name} </p>
    <p className='text-sm mb-2 font-[inter] font-normal' >{data.post}</p>
    </div>   


     <div className='w-45% hidden md:flex '>

  
        <div className='w-[500px] h-[500px] object-cover rounded-3xl shadow'>
            <img src={image} alt="" className='w-full h-full rounded-3xl'/>
        </div>
       </div>
   


    </section>
     </main>
  )
}

export default AboutSecon