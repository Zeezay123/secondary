import React from 'react'
import SecondHero from '../components/SecondHero'
import CallToAction from '../components/CallToAction'
import image from '../assets/images/school4.jpg'

const Principal = () => {
  return (
    <section className="grid grid-rows-1">

<SecondHero title='Leadership' content='Led by Director of Education John Todd, our respected leadership team bring together a wealth of educational experience.'/>
  



<div className="grid grid-cols-2 border-t-4 border-t-blue-950  mx-15 mt-20">
<div className='mt-5 w-[35rem] h-[30rem]  rounded-3xl object-cover'> 
<img src={image} alt="" className='w-full h-full object-cover rounded-3xl' />
</div>

<div className='w-'> 
  <h2 className='font-[inter] mt-5 font-bold text-sm'>Principal/DELSU Secondary School</h2>
  <h1 className="font-[inter] font-semibold text-3xl py-5 text-blue-950 ">Dr. Nathan Something</h1>
   
<div className="flex flex-col items-center justify-center"> <p className=" text-justify font-medium text-sm/loose">
 Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
      Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
      Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
      Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
      Vision: Charterhouse Lagos aspires to be Nigeria’s foremost educational institution,
  known for academic excellence and all-around student development.
   We are committed to offering an unmatched educational experience, 
   nurturing well-rounded individuals poised for global leadership.
    Our goal is to shape proactive contributors, ready to make a significant
     impact in a better, more connected world.
</p>
  </div>


</div>
  </div>





  
  <CallToAction/> 

  </section>
  )
}

export default Principal