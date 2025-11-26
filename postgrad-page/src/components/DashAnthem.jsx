import { Alert, Button, FileInput, Label, Textarea, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'
import 'react-circular-progressbar/dist/styles.css';


const DashAnthem = () => {
  const [inter, setInter] = useState({
    school: '',
    anthem: '',
    pledge: '',

  });

  

  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  

  const handleCreate = async () => {
    try {
      const response = await fetch(`/api/settings/createanthem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(inter)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrMsg(errorData.message || 'Failed to create interhouse');
        return;
      }

      const data = await response.json();
      setSuccessMsg('Anthem created successfully!');
      setErrMsg('');
    } catch (error) {
      setErrMsg(error.message || 'An error occurred');
    }
  };

  



  return (
    <div className="flex flex-col gap-3 mx-auto max-w-7xl py-12 w-3xl">
      <div className="font-bold text-black text-4xl mb-7 mx-auto">
        Enter Anthem 
      </div>

      {errMsg && <Alert color="failure">{errMsg}</Alert>}
      {successMsg && <Alert color="success">{successMsg}</Alert>}

      {/* Title Field */}
      <div className="w-full flex flex-col gap-3">
        <Label htmlFor="title">School Anthem</Label>
        <ReactQuill theme='snow'
          value={inter.school}
          onChange={(value) => setInter({ ...inter, school: value })}
          placeholder="Enter School Anthem"
        />
      </div>

      {/* Subtitle Field */}
      <div className="w-full flex flex-col gap-3">
        <Label htmlFor="subtitle">National Anthem</Label>
        <ReactQuill theme='snow'
          id="subtitle"
          value={inter.anthem}
          onChange={(value) => setInter({ ...inter, anthem:value})}
          placeholder="Enter national anthem"
        />
      </div>

      {/* Introduction Field */}
      <div className="w-full flex flex-col gap-3">
        <Label htmlFor="intro">National Pledge</Label>
        <ReactQuill theme='snow'
          id="intro"
          value={inter.pledge}
          onChange={(value) => setInter({ ...inter, pledge:value })}
          placeholder="Enter National Pledge"
         
        />
      </div>

   
      <div className="flex gap-3 mt-6">
        <Button onClick={handleCreate}  className="flex-1">
          Create Interhouse
        </Button>
        {/* <Button onClick={resetForm} color="gray">
          Reset
        </Button> */}
      </div>
    </div>
  );
};

export default DashAnthem;