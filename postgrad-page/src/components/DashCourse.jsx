import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button, TextInput, Label, Select, Modal,ModalBody,ModalFooter, ModalHeader, FileInput, Alert } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const DashCourse = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form States
  const [facultyCode, setFacultyCode] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [departmentFaculty, setDepartmentFaculty] = useState('');
  const [departmentImage, setDepartmentImage] = useState('');
  const [departContent, setDepartContent] = useState('')
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseCredits, setCourseCredits] = useState('3');
  const [courseSemester, setCourseSemester] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDepartment, setCourseDepartment] = useState('');
  const [courseFaculty, setCourseFaculty] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [errMessage, setErrMessage] = useState(null)
  const [uploadProgress, setUploadProgress] = useState('')

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [editType, setEditType] = useState('');
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setError('');
      console.log('Fetching all data...');
      
      const [courseRes, deptRes, facultyRes] = await Promise.all([
        fetch('/api/course/getcourse'),
        fetch('/api/departments/getdepart'),
        fetch('/api/faculty/getfaculty'),
      ]);

      console.log('Response statuses:', {
        course: courseRes.status,
        dept: deptRes.status,
        faculty: facultyRes.status
      });

      // Check if all responses are ok
      if (!courseRes.ok || !deptRes.ok || !facultyRes.ok) {
        throw new Error('One or more API calls failed');
      }

      const [courseData, deptData, facultyData] = await Promise.all([
        courseRes.json(),
        deptRes.json(),
        facultyRes.json(),
      ]);

      console.log('Fetched data:', { courseData, deptData, facultyData });

      setCourses(Array.isArray(courseData) ? courseData : []);
      setDepartments(Array.isArray(deptData) ? deptData : []);
      setFaculties(Array.isArray(facultyData) ? facultyData : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
      setCourses([]);
      setDepartments([]);
      setFaculties([]);
      setLoading(false);
    }
  };

  const getDepartmentName = (department) => {
    // If department is populated (has name property), return the name
    if (department && typeof department === 'object' && department.name) {
      return department.name;
    }
    // If department is just an ObjectId, find it in the departments array
    if (typeof department === 'string') {
      const dept = departments.find((d) => d._id === department);
      return dept ? dept.name : 'N/A';
    }
    return 'N/A';
  };

  const getFacultyName = (faculty) => {
    // If faculty is populated (has name property), return the name
    if (faculty && typeof faculty === 'object' && faculty.name) {
      return faculty.name;
    }
    // If faculty is just an ObjectId, find it in the faculties array
    if (typeof faculty === 'string') {
      const fac = faculties.find((f) => f._id === faculty);
      return fac ? fac.name : 'N/A';
    }
    return 'N/A';
  };

  // CREATE

  const handleImage = async (e)=>{
   const file = e.target.files[0]
   if (file) {
     setImageFile(file)
   }
  }

 const uploadImage = async() =>{
  const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

  try {
    if(!imageFile){
      setErrMessage('Please select an image')
      return
    }

    setErrMessage(null)
    
    // Create FormData inside the function after file is selected
    const imageData = new FormData()
    imageData.append('file', imageFile)
    imageData.append('upload_preset', 'codelWebImagesPreset')
    
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,imageData,
      {
        onUploadProgress: (progressEvent)=>{
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percent)
        }
      }
    )

    const url = res.data.secure_url

    console.log(url)
    setDepartmentImage(url)

    setErrMessage(null)
    setUploadProgress(null)
  } catch (error) {
    setErrMessage('Error uploading image')
    console.log(error.message)
    setUploadProgress(null)
  }
 }

  const handleCreate = async (url, data) => {
    try {
      console.log('Creating:', url, data);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create');
      }

      console.log('Created successfully:', result);
      alert('Created successfully!');
      fetchAllData();
    } catch (err) {
      console.error('Error creating:', err);
      alert(`Error: ${err.message}`);
    }
  };

  // DELETE
  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      let endpoint;
      switch (type) {
        case 'faculty':
          endpoint = `/api/faculty/deletefaculty/${id}/${currentUser._id}`;
          break;
        case 'departments':
          endpoint = `/api/departments/${id}`;
          break;
        case 'course':
          endpoint = `/api/course/${id}`;
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
      
      const response = await fetch(endpoint, { 
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete');
      }
      
      alert(`${type} deleted successfully!`);
      fetchAllData();
    } catch (err) {
      console.error('Error deleting:', err);
      alert(`Error deleting ${type}: ${err.message}`);
    }
  };

  // EDIT
  const openEditModal = (type, data) => {
    setEditType(type);
    setEditData({ ...data });
    setShowModal(true);
  };

  const handleEditSave = async () => {
    try {
      await fetch(`/api/${editType}/${editData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      setShowModal(false);
      fetchAllData();
    } catch (err) {
      console.error('Error updating:', err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  
  if (!currentUser || !currentUser.isAdmin) {
    return <div className="p-4 text-red-500">Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="p-4 space-y-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={() => setError('')} 
            className="float-right font-bold text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}
      {/* Forms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Faculty */}
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Create Faculty</h2>
          <Label>Faculty Name</Label>
          <TextInput 
            value={facultyName} 
            onChange={(e) => setFacultyName(e.target.value)} 
            placeholder="e.g., Faculty of Science"
          />
          <Button 
            className="mt-3" 
            onClick={() => {
              if (!facultyName) {
                alert('Please enter faculty name');
                return;
              }
              handleCreate('/api/faculty/create', { 
                name: facultyName
              });
              setFacultyName('');
            }}
          >
            Add Faculty
          </Button>
        </div>

        

        {/* Department */}
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Create Department</h2>
          <Label>Department Name</Label>
          <TextInput 
            value={departmentName} 
            onChange={(e) => setDepartmentName(e.target.value)} 
            placeholder="e.g., Computer Science"
          />
          <Label className="mt-3">Faculty</Label>
          <Select value={departmentFaculty} onChange={(e) => setDepartmentFaculty(e.target.value)}>
            <option value="">Select Faculty</option>
            {faculties.map((f) => <option key={f._id} value={f._id}>{f.name}</option>)}
          </Select>

          <Label className='mt-3'> Department Image </Label>
          
          <FileInput className='w-64 mb-3' type='file' accept='images/*' onChange={handleImage}/>
             <Button
             type='button'
             size='sm'
             outline
             onClick={uploadImage}
             disabled={uploadProgress  }
             >
              { uploadProgress ? <div className='w-16 h-16'> 

                <CircularProgressbar value={uploadProgress} text={`${uploadProgress || 0 }%`}/>

              </div>:
              'Upload image'
            }



              </Button>

              { errMessage && <Alert color="failure" >{errMessage} </Alert>}
              
              {departmentImage && (
                <img src={departmentImage} alt="Department preview" className="w-full h-32 object-cover mt-3 rounded" />
              )}

  <Label className="mt-3">Description (Optional)</Label>
          <TextInput 
            value={departContent} 
            onChange={(e) => setDepartContent(e.target.value)} 
            placeholder="Department description..."
          />

          <Button 
            className="mt-3" 
            onClick={() => {
              if (!departmentName || !departmentFaculty) {
                alert('Please fill all fields');
                return;
              }
              handleCreate('/api/departments/create', { 
                name: departmentName, 
                faculty: departmentFaculty, 
                departimage: departmentImage,
                content:departContent,
              });
              setDepartmentName('');
              setDepartmentFaculty('');
              setDepartmentImage('');
              setImageFile(null);
              setUploadProgress('');
              setErrMessage(null);
              console.log(departmentImage)
            }}
          >
            Add Department
          </Button>
        </div>

        {/* Course */}
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Create Course</h2>
          <Label>Course Name</Label>
          <TextInput 
            value={courseName} 
            onChange={(e) => setCourseName(e.target.value)} 
            placeholder="e.g., Introduction to Programming"
          />
          <Label className="mt-3">Course Code</Label>
          <TextInput 
            value={courseCode} 
            onChange={(e) => setCourseCode(e.target.value)} 
            placeholder="e.g., CSC101"
          />
          <Label className="mt-3">Credits</Label>
          <TextInput 
            type="number" 
            value={courseCredits} 
            onChange={(e) => setCourseCredits(e.target.value)} 
            min="1" 
            max="6"
          />
          <Label className="mt-3">Semester</Label>
          <Select value={courseSemester} onChange={(e) => setCourseSemester(e.target.value)}>
            <option value="">Select Semester</option>
            <option value="First">First Semester</option>
            <option value="Second">Second Semester</option>
            <option value="Both">Both Semesters</option>
          </Select>
          <Label className="mt-3">Department</Label>
          <Select value={courseDepartment} onChange={(e) => setCourseDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
          </Select>
          <Label className="mt-3">Faculty</Label>
          <Select value={courseFaculty} onChange={(e) => setCourseFaculty(e.target.value)}>
            <option value="">Select Faculty</option>
            {faculties.map((f) => <option key={f._id} value={f._id}>{f.name}</option>)}
          </Select>
          <Label className="mt-3">Description (Optional)</Label>
          <TextInput 
            value={courseDescription} 
            onChange={(e) => setCourseDescription(e.target.value)} 
            placeholder="Course description..."
          />
          <Button 
            className="mt-3" 
            onClick={() => {
              if (!courseName || !courseCode || !courseSemester || !courseDepartment || !courseFaculty) {
                alert('Please fill all required fields');
                return;
              }
              handleCreate('/api/course/create', { 
                name: courseName,
                code: courseCode,
                credits: parseInt(courseCredits),
                semester: courseSemester,
                description: courseDescription,
                department: courseDepartment, 
                faculty: courseFaculty 
              });
              setCourseName('');
              setCourseCode('');
              setCourseCredits('3');
              setCourseSemester('');
              setCourseDescription('');
              setCourseDepartment('');
              setCourseFaculty('');
            }}
          >
            Add Course
          </Button>
        </div>
      </div>

      {/* Faculty Table */}
      <div>
        <h2 className="text-lg font-bold mb-4">Faculties</h2>
        <Table hoverable={true}>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
            {faculties.map((f) => (
              <TableRow key={f._id}>
                <TableCell>{f.name}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="xs" onClick={() => openEditModal('faculty', f)}>Edit</Button>
                  <Button size="xs" color="failure" onClick={() => handleDelete('faculty', f._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Department Table */}
      <div>
        <h2 className="text-lg font-bold mb-4">Departments</h2>
        <Table hoverable={true}>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Faculty Name</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
            {departments.map((d) => (
              <TableRow key={d._id}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{getFacultyName(d.faculty)}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="xs" onClick={() => openEditModal('department', d)}>Edit</Button>
                  <Button size="xs" color="failure" onClick={() => handleDelete('departments', d._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Course Table */}
      <div>
        <h2 className="text-lg font-bold mb-4">Courses</h2>
        <Table hoverable={true}>
          <TableHead>
            <TableHeadCell>Course Code</TableHeadCell>
            <TableHeadCell>Course Name</TableHeadCell>
            <TableHeadCell>Credits</TableHeadCell>
            <TableHeadCell>Semester</TableHeadCell>
            <TableHeadCell>Department</TableHeadCell>
            <TableHeadCell>Faculty</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>{getDepartmentName(course.department)}</TableCell>
                <TableCell>{getFacultyName(course.faculty)}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="xs" onClick={() => openEditModal('course', course)}>Edit</Button>
                  <Button size="xs" color="failure" onClick={() => handleDelete('course', course._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Edit {editType}</ModalHeader>
        <ModalBody>
          {editData && Object.keys(editData).map((key) => (
            key !== '_id' && (
              <div key={key} className="mb-2">
                <Label>{key}</Label>
                <TextInput value={editData[key]} onChange={(e) => setEditData({ ...editData, [key]: e.target.value })} />
              </div>
            )
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleEditSave}>Save</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DashCourse;
