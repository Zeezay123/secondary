import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";

const DepartmentSection = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/departments/getdepart");
        if (!res.ok) throw new Error("Failed to fetch departments");
        const data = await res.json();

        // Only keep first 4
        setDepartments(data.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading departments...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-12">
      {/* <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Our Departments</h2>
        <p className="text-gray-600 mt-2">
          Explore our various departments and their programmes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            imgSrc={`uploads/${dept.departimage}` || "https://via.placeholder.com/400x250"}
            className="hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold">{dept.name}</h3>
            <p className="text-sm text-gray-500">{dept.faculty?.name}</p>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {dept.content || "No description available."}
            </p>
            <a
              href={`/programmes/${dept.id}`}
              className="mt-4 inline-block text-blue-600 hover:underline font-medium"
            >
              View Programmes →
            </a>
          </Card>
        ))}
      </div> */}


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="border-slate-100  border-[1px] rounded-lg p-5 hover:bg-blue-100 hover:shadow"
          >
            <div className="w-15 h-15 object-cover rounded-full border-2 border-blue-500"> <img src={`uploads/${dept.departimage}` || "https://via.placeholder.com/400x250"} alt="" className="w-full h-full object-cover rounded-full" /></div>
            <h3 className="text-xl font-semibold">{dept.name}</h3>
            <p className="text-sm text-gray-500">{dept.faculty?.name}</p>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {dept.content || "No description available."}
            </p>
            <a
              href={`/programmes/${dept.id}`}
              className="mt-4 inline-block text-blue-600 hover:underline font-medium"
            >
              View Programmes →
            </a>
          </div>
        ))}

        </div>



      <div className="text-center mt-10">
        <a
          href="/programmes"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          View All Programmes
        </a>
      </div>
    </section>
  );
};

export default DepartmentSection;
