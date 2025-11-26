import { Alert, Button, FileInput, Label, Textarea, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCheck } from 'react-icons/fa6';

const DashQuiz = () => {
  const [inter, setInter] = useState({
    title: '',
    subtitle: '',
    intro: '',
    imageOne: '',
    imageTwo: '',
    imageThree: '',
    imageFour: '',
    imageFive: '',
    imageSix: ''
  });

  const [files, setFiles] = useState({
    imageOne: null,
    imageTwo: null,
    imageThree: null,
    imageFour: null,
    imageFive: null,
    imageSix: null
  });

  const [previews, setPreviews] = useState({
    imageOne: '',
    imageTwo: '',
    imageThree: '',
    imageFour: '',
    imageFive: '',
    imageSix: ''
  });

  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const allowedExtensions = ['jpg', 'png', 'jpeg'];

  const handleCreate = async () => {
    try {
      const response = await fetch(`/api/settings/updatequiz`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(inter)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrMsg(errorData.message || 'Failed to create Quiz');
        return;
      }

      const data = await response.json();
      setSuccessMsg('Quiz created successfully!');
      setErrMsg('');
    } catch (error) {
      setErrMsg(error.message || 'An error occurred');
    }
  };

  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const ext = fileName.split('.').pop();

    if (allowedExtensions.includes(ext)) {
      setFiles(prev => ({ ...prev, [imageKey]: file }));
      const preview = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [imageKey]: preview }));
      setErrMsg('');
    } else {
      setErrMsg('Upload JPG or PNG images only');
    }
  };

  const upload = async (imageKey) => {
    const file = files[imageKey];
    if (!file) {
      setErrMsg('Please select a file first');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post(`/api/uploads/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        }
      });

      const data = res.data;
      setInter(prev => ({ ...prev, [imageKey]: data }));
      setSuccessMsg(`${imageKey} uploaded successfully!`);
      setErrMsg('');
    } catch (error) {
      console.log(error);
      setErrMsg(error.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const imageFields = [
    { key: 'imageOne', label: 'Image One' },
    { key: 'imageTwo', label: 'Image Two' },
    { key: 'imageThree', label: 'Image Three' },
    { key: 'imageFour', label: 'Image Four' },
    { key: 'imageFive', label: 'Image Five' },
    { key: 'imageSix', label: 'Image Six' }
  ];



  return (
    <div className="flex flex-col gap-3 mx-auto max-w-7xl py-12 w-3xl">
      <div className="font-bold text-black text-4xl mb-7 mx-auto">
        Enter Quiz Information
      </div>

      {errMsg && <Alert color="failure">{errMsg}</Alert>}
      {successMsg && <Alert color="success">{successMsg}</Alert>}

      {/* Upload Progress Indicator */}
      {isUploading && (
        <div className="w-20 h-20 mx-auto">
          <CircularProgressbar
            value={uploadProgress}
            text={`${uploadProgress}%`}
          />
        </div>
      )}

      {/* Title Field */}
      <div className="w-full flex flex-col gap-3">
        <Label htmlFor="title">Title</Label>
        <TextInput
          id="title"
          value={inter.title}
          onChange={(e) => setInter({ ...inter, title: e.target.value })}
          placeholder="Enter title"
        />
      </div>

      {/* Subtitle Field */}
      <div className="w-full flex flex-col gap-3">
        <Label htmlFor="subtitle">Sub Title</Label>
        <Textarea
          id="subtitle"
          value={inter.subtitle}
          onChange={(e) => setInter({ ...inter, subtitle: e.target.value })}
          placeholder="Enter subtitle"
          rows={3}
        />
      </div>

      {/* Introduction Field */}
      <div className="w-full flex flex-col gap-3">
        <Label htmlFor="intro">Introduction</Label>
        <Textarea
          id="intro"
          value={inter.intro}
          onChange={(e) => setInter({ ...inter, intro: e.target.value })}
          placeholder="Enter introduction"
          rows={5}
        />
      </div>

      {/* Image Upload Fields */}
      {imageFields.map(({ key, label }) => (
        <div key={key} className="w-full flex flex-col gap-3">
          <Label htmlFor={key}>{label}</Label>
          <div className="flex gap-2 items-center">
            <FileInput
              id={key}
              name="image"
              accept="image/*"
              onChange={(e) => handleFileChange(e, key)}
              className="flex-1"
            />
            <Button
              onClick={() => upload(key)}
              disabled={!files[key] || isUploading}
              color="blue"
            >
              Upload
            </Button>
          </div>
          {previews[key] && (
            <div className="mt-2">
              <img
                src={previews[key]}
                alt={`${label} preview`}
                className="max-w-xs rounded-lg shadow-md"
              />
              {inter[key] && (
                <p className="text-green-600 text-sm mt-1"><FaCheck/> Uploaded</p>
              )}
            </div>
          )}
        </div>
      ))}

   
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

export default DashQuiz;