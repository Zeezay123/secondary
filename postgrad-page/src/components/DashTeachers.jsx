import {
  Alert,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
  TextInput,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Popover, ChevronLeftIcon, ChevronRightIcon 
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", image: "" });
  const [file, setFile] = useState("");

    const [succMsg, setSuccMsg] = React.useState("");
    const [errMsg, setErrMsg] = React.useState("");
    const [preview, setpreview] = React.useState("");
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [fileProg, setFileProg] = React.useState(0);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [teacherToDelete, setTeacherToDelete] = React.useState(null);
    const [limit, setLimit] = useState(10)
     const [pagenum, setPageNum] = useState(1)
     const [tRows, setTRows] = useState('')


      const startIndex = (pagenum - 1) * limit 

const totalPage = Math.ceil( tRows / limit )      
  useEffect(() => {
    fetchTeachers();
  }, [limit, pagenum]);

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`/api/teachers?startIndex=${startIndex}&limit=${limit}`);
      const data = await res.json();
      
      if (data.data) {
        setTeachers(data.data);
      }
      
      if (data.total !== undefined) {
        setTRows(data.total);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setErrMsg('Failed to fetch teachers');
    }
  };

  const uploadImage = async () => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await axios.post("/api/uploads", fd);
    setForm({ ...form, image: res.data });
  };

  const handleSubmit = async () => {
    await fetch("/api/teachers/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", role: "", image: "" });
    fetchTeachers();
  };

  const handleDelete = async () => {
    if (!teacherToDelete) return;
    
    await fetch(`/api/teachers/${teacherToDelete}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    fetchTeachers();
    setDeleteModal(false);
    setTeacherToDelete(null);
  };


  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Teachers</h1>

      <div className="flex flex-col gap-4 mb-8">
        <div>
          <Label>Name</Label>
          <TextInput
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <Label>Role</Label>
          <TextInput
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <FileInput onChange={(e) => setFile(e.target.files[0])} />
          <Button onClick={uploadImage}>Upload Image</Button>
        </div>

        <Button onClick={handleSubmit}>Add Teacher</Button>
      </div>

      {/* <div className="grid grid-cols-3 gap-6">
        {teachers.map((t) => (
          <div key={t.id} className="border p-4 rounded">
            <img src={`uploads/${t.image}`} alt="" />
            <h3 className="font-bold">{t.name}</h3>
            <p>{t.role}</p>
          </div>
        ))}
      </div> */}


       <Table hoverable className="mt-10">
              <TableHead className="flex">
                <TableHeadCell>id</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Role</TableHeadCell>
                <TableHeadCell>Image</TableHeadCell>
              </TableHead>
      
              <TableBody>
                {teachers.length > 0? (
                  teachers.map((yb) => (
                    <TableRow key={yb.id}>
                      <TableCell>{yb.id}</TableCell>
                      <TableCell>{yb.name}</TableCell>
                      <TableCell>{yb.role}</TableCell>
                      <TableCell>
                        {" "}
                        <img src={`uploads/${yb.image}`} alt="" />{" "}
                      </TableCell>
    
                      <TableCell
                        className="text-red-600 font-semibold cursor-pointer"
                        onClick={() => {
                          setTeacherToDelete(yb.id);
                          setDeleteModal(true);
                        }}
                      >
                        Delete
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="flex justify-center items-center p-3">
                    <p className=" flex font-bold justify-center items-center text-center">
                      {" "}
                      No Data Available
                    </p>{" "}
                  </TableRow>
                )}
              </TableBody>
              <div className='flex  justify-between mt-5 items-center'> 
                        
                          <div className='text-sm text-gray-600 font-[inter]' > Number of Teachers {tRows} </div>
              
                         <div className='flex gap-10 items-center'>
                         
              
                          <select className='border-[1px] border-slate-600 rounded w-fit px-1 focus:outline-0' value={limit} onChange={(e)=>{setLimit(e.target.value)
                              setPageNum(1)}
                          }>
                           <option value={5}> 5 </option>
                           <option value={10}> 10 </option>
                           <option value={15}> 15 </option>
                           <option value={20}> 20</option>
                           <option value={50}> 50</option>
                           <option value={75}> 75</option>
                           <option value={100}> 100</option>
                          </select>
               <div className='font-[inter] text-black text-sm font-semibold'> Page {pagenum} of {totalPage}</div>
                        <div className=' flex items-center justify-center gap-2'> 
                    <button className={`flex items-center justify-center p-1 border-2 ${pagenum === 1 ?' border-slate-100 text-slate-300':'border-blue-800 text-blue-800'} rounded text-xs`} disabled={pagenum === 1} onClick={()=>setPageNum((p)=> Math.max(p-1,1))}> <ChevronLeftIcon /> </button> 
                    <button className={`flex items-center justify-center p-1 border-2 ${pagenum === totalPage ?' border-slate-100 text-slate-300':'border-blue-800 text-blue-800'} rounded text-xs`} disabled={pagenum === totalPage} onClick={()=>setPageNum((p)=>Math.min(p+1,totalPage))}><ChevronRightIcon/> </button>
                  </div>     </div>   
                        </div>     
            </Table>

      {/* Delete Confirmation Modal */}
      <Modal
        show={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setTeacherToDelete(null);
        }}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this teacher?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleDelete}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setDeleteModal(false);
                  setTeacherToDelete(null);
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      
    </div>
  );
};

export default DashTeachers;
