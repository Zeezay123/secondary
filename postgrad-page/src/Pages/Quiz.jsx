import React from "react";

const Quiz = () => {
  const categories = [
    { title: "Science & Technology", desc: "Challenging students on innovation and discoveries." },
    { title: "Literature & Arts", desc: "Exploring poetry, authors, and classic works." },
    { title: "History & Politics", desc: "Diving into events that shaped the world." },
    { title: "Current Affairs", desc: "Testing awareness of the modern world and key issues." },
  ];

  const results = [
    { name: "Blue House", score: 85, remark: "Consistent accuracy and strong teamwork." },
    { name: "Red House", score: 80, remark: "Impressive comeback in final rounds." },
    { name: "Green House", score: 76, remark: "Great enthusiasm and participation spirit." },
  ];

  const gallery = [
    "/images/quiz1.jpg",
    "/images/quiz2.jpg",
    "/images/quiz3.jpg",
    "/images/quiz4.jpg",
    "/images/quiz5.jpg",
  ];

  const winner = results.sort((a, b) => b.score - a.score)[0];

  return (
    <div className="flex flex-col items-center bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div
        className="w-full h-72 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/quiz-banner.jpg')" }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-2">Annual Quiz Competition</h1>
          <p className="text-lg max-w-xl text-center">
            Encouraging brilliance, teamwork, and a hunger for knowledge.
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-4xl p-6 mt-10">
        <p className="text-lg leading-relaxed text-center text-gray-700">
          The Interhouse Quiz Competition was a thrilling intellectual challenge that brought together
          our brightest minds across all houses. Each team displayed impressive confidence and quick
          thinking through rounds covering science, literature, current affairs, and general knowledge.
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-5xl grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 p-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white shadow-md border rounded-lg p-4 text-center hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-blue-700">{cat.title}</h3>
            <p className="text-gray-600 mt-2">{cat.desc}</p>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="max-w-4xl mt-12 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">🏆 Leaderboard</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {results.map((res, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-blue-700">{res.name}</h3>
              <p className="text-2xl font-semibold text-yellow-600 mt-2">{res.score} pts</p>
              <p className="text-gray-600 mt-1">{res.remark}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-green-800">
            Congratulations, {winner.name}!
          </h2>
          <p className="text-gray-600 mt-2">
            {winner.name} emerged as the overall winner with {winner.score} points, thanks to their
            remarkable teamwork and sharp intellect.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mt-14 p-6">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Event Gallery</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Quiz event"
              className="w-full h-56 object-cover rounded-lg shadow-sm hover:shadow-md transition"
            />
          ))}
        </div>
      </div>

      {/* Closing Message */}
      <div className="bg-blue-700 text-white w-full py-10 text-center mt-10">
        <h3 className="text-2xl font-semibold">Brains Over Brawn</h3>
        <p className="max-w-2xl mx-auto mt-2 text-gray-100">
          The Annual Quiz Competition wasn’t just about winning — it was about curiosity,
          collaboration, and confidence. Congratulations to every participant for showing that
          learning can be as thrilling as any race.
        </p>
      </div>
    </div>
  );
};

export default Quiz;
