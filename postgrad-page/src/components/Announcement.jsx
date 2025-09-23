import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

 

const Announcement = () => {

const [annData, setAnndata] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/content/announcement');
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
   <section className="bg-white py-12 px-6 mt-20">
           <h2 className="text-2xl md:text-3xl  font-bold text-center text-blue-900 mb-8">
            {annData?.subtitle || 'loading'}
           </h2>
   
           <div className="max-w-6xl mx-auto border-[1px] border-slate-100 rounded-lg p-6">
         <div className="text-left font-normal font-sans text-sm/10 md:text-lg/loose" dangerouslySetInnerHTML={{ __html: annData.content }} />
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