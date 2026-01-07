import React, { useEffect, useState } from "react";
import PortalCTA from '../components/PortalCTA';
import inter from "../assets/images/interhouse.jpg";

const InterhouseSports = () => {
  const [interhouse, setInterhouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterhouse = async () => {
      try {
        const res = await fetch('/api/settings/interhouse');
        const data = await res.json();
        if (data && data.length > 0) {
          setInterhouse(data[0]);
        }
      } catch (error) {
        console.error('Error fetching interhouse data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterhouse();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!interhouse) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">No interhouse sports information available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div
        className="w-full h-72 bg-cover bg-center flex items-center justify-center text-white"
        style={{ 
          backgroundImage: interhouse.imageone 
            ? `url(/uploads/${interhouse.imageone})` 
            : `url(${inter})` 
        }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-2">{interhouse.title}</h1>
          <p className="text-lg max-w-xl text-center">
            {interhouse.subtitle}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-4xl p-6 mt-10">
        <div 
          className="text-lg leading-relaxed text-center text-gray-700"
          dangerouslySetInnerHTML={{ __html: interhouse.intro || 'No description available' }}
        />
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mt-12 p-6 mb-10">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Event Gallery</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {interhouse.imagetwo && (
            <img
              src={`/uploads/${interhouse.imagetwo}`}
              alt="Sports event"
              className="w-full h-56 object-cover rounded-lg shadow-sm hover:shadow-md transition"
            />
          )}
          {interhouse.imagethere && (
            <img
              src={`/uploads/${interhouse.imagethere}`}
              alt="Sports event"
              className="w-full h-56 object-cover rounded-lg shadow-sm hover:shadow-md transition"
            />
          )}
          {interhouse.imagefour && (
            <img
              src={`/uploads/${interhouse.imagefour}`}
              alt="Sports event"
              className="w-full h-56 object-cover rounded-lg shadow-sm hover:shadow-md transition"
            />
          )}
          {interhouse.imagefive && (
            <img
              src={`/uploads/${interhouse.imagefive}`}
              alt="Sports event"
              className="w-full h-56 object-cover rounded-lg shadow-sm hover:shadow-md transition"
            />
          )}
          {interhouse.imagesix && (
            <img
              src={`/uploads/${interhouse.imagesix}`}
              alt="Sports event"
              className="w-full h-56 object-cover rounded-lg shadow-sm hover:shadow-md transition"
            />
          )}
        </div>
      </div>
      <PortalCTA />
    </div>
  );
};

export default InterhouseSports;
