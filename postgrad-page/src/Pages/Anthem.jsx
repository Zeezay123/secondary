import React from 'react'
import SecondHero from '../components/SecondHero'
import PortalCTA from '../components/PortalCTA'
import imaget from '../assets/part.jpg'
import Divider from '../components/Divider'


const Anthem = () => {
  return (
    <section className='w-full'>
    <SecondHero title='Our Anthems And Pledge'/> 

  <Divider/>
       <div className='mt-10 flex md:px-20 gap-10  justify-between  '>
           <div className='grid grid-rows-1 gap mx-auto px-auto justify-center items-center '>

            <div className=''> 
                <h1 className='font-[inter]  text-black text-5xl font-bold p-5'>School Anthem</h1>
                <p className='font-[inter] text-black text-sm p-5 w-[50%] justify-center text-[16px]'>We have just one moon and one golden sun
We have smiles of friendship for everyone
Though our tribes are so wide
And our tongues may divide
We are one school after all.</p>

<p className='font-[inter] text-black text-[16px] p-5 w-[50%]'>
<span className='font-semibold text-[16px]'>Chorus: </span> <br />
We are one school after all
We are one school after all
We are one school after all
We are one big school
</p>



<p className='font-[inter] text-black text-[16px] p-5 w-[50%]'>
<span className='font-semibold text-[16px]'>Chorus: </span> <br />
    We’re the children of Unilag Staff School
And our Teachers instruct us what to do
We all work hard in class
That is why we are pass
Unilag Staff School
</p>

<p className='font-[inter] text-black text-[16px] p-5 w-[50%]'>
<span className='font-semibold text-[16px]'>Chorus: </span> <br />

It’s a school of hope and a school of might
It’s a school of standards and of great heights
So much knowledge we share
And we all are aware
It’s school of Excellence.
</p>
            </div>

</div>


 <div className='grid grid-rows-1 gap-10'>

            <div className=''> 
                <h1 className='font-[inter]  text-black text-5xl font-bold p-5 '>National Anthem</h1>
                <p className='font-[inter] text-black text-sm p-5 w-[50%] justify-center text-[16px]'>We have just one moon and one golden sun
We have smiles of friendship for everyone
Though our tribes are so wide
And our tongues may divide
We are one school after all.</p>

<p className='font-[inter] text-black text-[16px] p-5 w-[50%]'>
<span className='font-semibold text-[16px]'>Chorus: </span> <br />
We are one school after all
We are one school after all
We are one school after all
We are one big school
</p>



<p className='font-[inter] text-black text-[16px] p-5 w-[50%]'>
<span className='font-semibold text-[16px]'>Chorus: </span> <br />
    We’re the children of Unilag Staff School
And our Teachers instruct us what to do
We all work hard in class
That is why we are pass
Unilag Staff School
</p>

<p className='font-[inter] text-black text-[16px] p-5 w-[50%]'>
<span className='font-semibold text-[16px]'>Chorus: </span> <br />

It’s a school of hope and a school of might
It’s a school of standards and of great heights
So much knowledge we share
And we all are aware
It’s school of Excellence.
</p>
            </div>







</div>
           </div>

           <div className='grid grid-rows-1 items-center md:mt-10 md:px-20'> 
       <h1 className='font-[inter]  text-black text-5xl font-bold p-5 text-justify '> National Pledge</h1>
            <p className='font-[inter] text-black text-justify text-[16px] p-5 w-[50%]' >
                I pledge to Nigeria my country
To be faithful, loyal and honest
To serve Nigeria with all my strength,
To defend her unity
And uphold her honour and glory
So help me God.
            </p>
           </div>

          <div className=' md:w-7xl  md:mt-20  max-h-64 flex flex-col justify-center items-center rounded-3xl bg-center mx-auto p-20 md:gap-5 gap-2'
          style={{backgroundImage:`url(${imaget})`}}
          >
          <h1 className='font-[inter] font-bold md:text-5xl  text-white'> Already a Part of DELSU Staff School? </h1>
          
          <p className='font-[inter] md:max-w-xl  text-wrap text-center text-white '> Login to your portal to get the latest update about you child/student, results, timetable, classes and many more features</p>
          
          <div className='flex gap-5 items-center justify-center'
          
          >
            <div className='w-fit p-2 md:px-7 flex items-center justify-center font-[inter] font-medium bg-white text-black hover:bg-slate-100 rounded'> Teachers</div>
            <div className='w-fit p-2 md:px-7 flex items-center justify-center font-[inter] font-medium border-white border-2 text-white rounded'>Students</div>
          </div>
          </div> 
          <PortalCTA />
        </section>
  )
}

export default Anthem