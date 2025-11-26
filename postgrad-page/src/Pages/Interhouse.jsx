import React from "react";

const InterhouseSports = () => {
  const houses = [
    { name: "Red House", score: 120, highlight: "Won the 100m relay and tug of war." },
    { name: "Blue House", score: 110, highlight: "Dominated field events with precision and teamwork." },
    { name: "Green House", score: 95, highlight: "Showed exceptional spirit in the march past." },
    { name: "Yellow House", score: 80, highlight: "Excelled in cultural display and cheerleading." },
  ];

  const gallery = [
    "/images/relay.jpg",
    "/images/longjump.jpg",
    "/images/cheer.jpg",
    "/images/team.jpg",
    "/images/march.jpg",
    "/images/awards.jpg",
  ];

  const winner = houses.sort((a, b) => b.score - a.score)[0];

  return (
    <div className="flex flex-col items-center bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div
        className="w-full h-72 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/sports-banner.jpg')" }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-2">Annual Interhouse Sports</h1>
          <p className="text-lg max-w-xl text-center">
            Celebrating unity, discipline, and healthy competition at our school.
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-4xl p-6 mt-10">
        <p className="text-lg leading-relaxed text-center text-gray-700">
          The annual Interhouse Sports competition brought together students from every corner of our
          campus in a spirit of teamwork, excitement, and friendly rivalry. The event featured a variety of
          track and field activities, cultural displays, and cheering competitions that highlighted both athleticism
          and creativity.
        </p>
      </div>

      {/* Highlights */}
      <div className="max-w-5xl grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 p-6">
        {houses.map((house, index) => (
          <div
            key={index}
            className="bg-white shadow-md border rounded-lg p-4 text-center hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-green-700">{house.name}</h3>
            <p className="text-gray-600 mt-2">{house.highlight}</p>
            <p className="text-2xl font-semibold text-yellow-600 mt-4">{house.score} pts</p>
          </div>
        ))}
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mt-12 p-6">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Event Gallery</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Sports event"
              className="w-full h-56 object-cover rounded-lg shadow-sm hover:shadow-md transition"
            />
          ))}
        </div>
      </div>

      {/* Winner Section */}
      <div className="max-w-4xl mt-14 mb-10 text-center">
        <h2 className="text-3xl font-bold text-green-800">🏆 {winner.name} Wins!</h2>
        <p className="text-gray-600 mt-2">
          Congratulations to {winner.name} for emerging as overall champions of this year’s Interhouse Sports
          with {winner.score} points. Every participant gave their best, proving that teamwork and determination
          are the true victories.
        </p>
      </div>

      {/* Closing Message */}
      <div className="bg-green-700 text-white w-full py-10 text-center">
        <h3 className="text-2xl font-semibold">See You Next Year!</h3>
        <p className="max-w-2xl mx-auto mt-2 text-gray-100">
          The Interhouse Sports remains one of the most exciting and unifying events of our school calendar.
          Thank you to all staff, students, and parents who made it a success.
        </p>
      </div>
    </div>
  );
};

export default InterhouseSports;
