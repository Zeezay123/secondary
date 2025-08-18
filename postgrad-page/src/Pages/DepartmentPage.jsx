import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Spinner } from 'flowbite-react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Modal,ModalBody,ModalHeader, ModalFooter } from 'flowbite-react';


const DepartmentPage = () => {

     const {id} = useParams()
     const [loading, setLoading] = useState(false);
        const [err, setErr] = useState(false);
        const [post, setPost] = useState(null);
        const [department, setDepartment] = useState({})
        const [courses, setcourses] = useState({})

        const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

useEffect(()=>{

const fetchAllData = async ()=> {
    try {
        
     const res = await fetch(`/api/departments/getdepart/${id}`)
     const data = await res.json()

     console.log(data)

     if(!res.ok){
        setErr(true)
        setLoading(false)
        return;
     }

     setDepartment(data)
     setErr(false)
     setLoading(false)
    } catch (error) {
        console.log(error.message)
        setErr(true);
        setLoading(false)
    }
}

fetchAllData()

},[id])

if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (err || !department) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold">
        Failed to load department data.
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative w-full h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage: department.departimage
            ? `url(${department.departimage})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: department.departimage ? "transparent" : "#1E40AF", // Blue fallback
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-bold">{department.name}</h1>
          <p className="text-lg mt-2 font-medium">
            {department.faculty?.name}
          </p>
        </div>
      </section>

      {/* Department Content */}
      <section className="max-w-5xl mx-auto p-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          {department.content || "No description provided for this department."}
        </p>
      </section>

      {/* Courses Table */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Courses Offered</h2>
        {department.courses?.length > 0 ? (
          <Table striped={true} hoverable={true}>
            <TableHead>
              <TableHeadCell>Course Code</TableHeadCell>
              <TableHeadCell>Course Name</TableHeadCell>
              <TableHeadCell>Credits</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              {department.courses.map((course) => (
                <TableRow
                  key={course._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                  onClick={() => {
                    setSelectedCourse(course);
                    setOpenModal(true);
                  }}
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {course.code}
                  </TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500">No courses available.</p>
        )}
      </section>

      {/* Course Modal */}
      <Modal
        show={openModal}
        size="lg"
        popup={true}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader />
        <ModalBody>
          {selectedCourse && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{selectedCourse.name}</h3>
              <p className="text-gray-500">
                <strong>Code:</strong> {selectedCourse.code}
              </p>
              <p className="text-gray-500">
                <strong>Credits:</strong> {selectedCourse.credits}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {selectedCourse.description}
              </p>
              {selectedCourse.semester && (
                <p className="text-gray-500">
                  <strong>Semester:</strong> {selectedCourse.semester}
                </p>
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </main>
  );
}

export default DepartmentPage
