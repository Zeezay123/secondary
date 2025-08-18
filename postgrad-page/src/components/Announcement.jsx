import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

 

const Announcement = () => {

const [annData, setAnndata] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/announce/');
        if (!res.ok) {
          console.log('cannot fetch data');
          return;
        }

        const data = await res.json();
        setAnndata(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);




  return (
   <section className="bg-white py-12 px-6">
           <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
            {annData?.title || 'loading'}
           </h2>
   
           <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg shadow p-6">
         <div className="text-center font-medium font-sans text-sm/10" dangerouslySetInnerHTML={{ __html: annData.content }} />
           </div>
   
           {/* CTA Button */}
           <div className="flex justify-center mt-6">
             <a
               href="https://portal.delsu.edu.ng"
               target="_blank"
               rel="noopener noreferrer"
               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold transition"
             >
               Apply Now
             </a>
           </div>
         </section>
  )
}

export default Announcement