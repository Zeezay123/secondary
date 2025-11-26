import React from 'react'
import SecondHero from '../components/SecondHero'
import Divider from '../components/Divider'
import excur from '../../src/assets/images/excursion.jpg'


const culture = () => {
 const travels = [
    {
        image:excur,
        title:'JSS 1 2024 Excursion',
        sub:'River Niger',
        content:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
         'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use 
        Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.`
    },

     {
        image:excur,
        title:'JSS 1 2024 Excursion',
        sub:'River Niger',
        content:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
         'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use 
        Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.`
    } ,
    {
        image:excur,
        title:'JSS 1 2024 Excursion',
        sub:'River Niger',
        content:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
         'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use 
        Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.`
    },
     {
        image:excur,
        title:'JSS 1 2024 Excursion',
        sub:'River Niger',
        content:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using
         'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use 
        Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.`
    }
 ]

  return (
    <section className='grid grid-rows-1 px-auto'>
        
        <SecondHero title='Our Field Trips'/>

        <Divider/>
         <div className='grid grid-rows-1 px-auto gap-10 '>

            {travels.map((data, index)=>(
                <div key={index} className='grid grid-cols-2 px-30 my-5 relative ' > 
                 <div className='w-[500px] h-96 object-cover
              
                
                 '> <img className='w-full h-full rounded' src={data.image} alt="" /> </div>
                 
                 <div className='flex flex-col justify-between border-t border-blue-700 border-b-6 py-5'> 
                    <div><h1 className='text-lg '>{data.title} </h1></div>

                    <div className='flex flex-col gap-5'>
                        <h2 className='text-4xl font-bold'>{data.sub}</h2>
                        <p className='text-justify text-sm'>{data.content}</p>
                    </div>
                 </div>
                 
                  </div>
            ))}

         </div>

        </section>
  )
}

export default culture