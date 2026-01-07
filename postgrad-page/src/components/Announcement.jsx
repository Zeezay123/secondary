import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import imageOne from '../assets/schoolAn.jpg'
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";


 

const Announcement = () => {

const [annData, setAnndata] = useState(null);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/announce/getAnnounce?limit=1');
        if (!res.ok) {
          console.log('cannot fetch data');
          return;
        }

        const response = await res.json();
        if (response.data && response.data.length > 0) {
          setAnndata(response.data[0]);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <section className="mx-auto max-w-7xl py-15 border-2 border-dashed border-purple-900 rounded md:rounded-4xl">
        <div className="flex justify-center items-center h-96">
          <div className="text-xl">Loading announcement...</div>
        </div>
      </section>
    );
  }

  if (!annData) {
    return (
      <section className="mx-auto max-w-7xl py-15 border-2 border-dashed border-purple-900 rounded md:rounded-4xl">
        <div className="flex justify-center items-center h-96">
          <div className="text-xl">No announcements available</div>
        </div>
      </section>
    );
  }




  return (
   <section className="mx-auto max-w-7xl py-15 border-2 border-dashed  border-purple-900 rounded md:rounded-4xl">

    <marquee scrollamount="5" className='flex items-center justify-center h-10 bg-blue-300'>
       <div className="flex gap-20 "> <h2 className="text-xl font-semibold "> Annoucement !  </h2>
        <h2 className="text-xl font-semibold "> Annoucement !  </h2>
        <h2 className="text-xl font-semibold "> Annoucement !  </h2>
        <h2 className="text-xl font-semibold "> Annoucement !  </h2> 
        <h2 className="text-xl font-semibold "> Annoucement !  </h2> 
        <h2 className="text-xl font-semibold "> Annoucement !  </h2> 
        <h2 className="text-xl font-semibold "> Annoucement !  </h2> 
        </div>  </marquee>

      <div className="grid md:grid-cols-2 gap-2 my-10 justify-center items-center mx-auto md:px-15">
       <div >
        <img 
          src={annData.image ? `/uploads/${annData.image}` : imageOne} 
          alt={annData.title} 
          className="h-[700px] w-full object-cover" 
        />
       </div>

       <div className="flex flex-col gap-10 ">
          <h1 className=" font-semibold md:text-4xl text-center ">{annData.title}</h1>
          <div 
            className="text-center"
            dangerouslySetInnerHTML={{ __html: annData.content }}
          />

          <div className="flex flex-wrap gap-5 justify-center items-center"> 
            <Link to="/apply"> <Button>Apply Now</Button> </Link> 
            <Link to="/results"> <Button>See Results</Button> </Link>
          </div>
       </div>
      </div>
         </section>
  )
}

export default Announcement