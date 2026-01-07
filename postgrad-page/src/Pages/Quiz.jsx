import React, { useEffect, useState } from "react";
import PortalCTA from '../components/PortalCTA';

const Quiz = () => {
  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch('/api/settings/quiz')
        const data = await res.json()
        if (res.ok) {
          setQuizData(data)
        } else {
          console.log('Cannot get quiz data')
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [])

  // Build gallery array from database images
  const gallery = quizData ? [
    quizData.imageone,
    quizData.imagetwo,
    quizData.imagethere,
    quizData.imagefour,
    quizData.imagefive,
    quizData.imagesix
  ].filter(img => img) : []

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading quiz information...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div
        className="w-full h-72 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: gallery[0] ? `url('/uploads/${gallery[0]}')` : "url('/images/quiz-banner.jpg')" }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-2">{quizData?.title || 'Annual Quiz Competition'}</h1>
          <p className="text-lg max-w-xl text-center">
            {quizData?.subtitle || 'Encouraging brilliance, teamwork, and a hunger for knowledge.'}
          </p>
        </div>
      </div>

      {/* Intro */}
      {quizData?.intro && (
        <div className="max-w-4xl p-6 mt-10">
          <div className="text-lg leading-relaxed text-center text-gray-700" dangerouslySetInnerHTML={{__html: quizData.intro}}></div>
        </div>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className="max-w-6xl mt-14 p-6 mb-10">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Event Gallery</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, index) => (
              <img
                key={index}
                src={`/uploads/${img}`}
                alt={`Quiz event ${index + 1}`}
                className="w-full h-56 object-cover rounded-lg shadow-sm hover:shadow-md transition"
              />
            ))}
          </div>
        </div>
      )}
      <PortalCTA />
    </div>
  );
};

export default Quiz;

