import { Table, Label, TextInput, FileInput, Textarea, TableBody, TableHead, TableHeadCell, TableCell, TableRow, Button, Modal, ModalHeader, ModalBody, Alert } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaCheck } from 'react-icons/fa6';

const DashCultUpdate = () => {
  const [excurData, setExcurData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedExcurId, setSelectedExcurId] = useState(null);
  
  const [inter, setInter] = useState({
    title: '',
    subtitle: '',
    intro: '',
    imageOne: '',
  });

  const [files, setFiles] = useState({
    imageOne: null,
  });

  const [previews, setPreviews] = useState({
    imageOne: '',
  });

  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const allowedExtensions = ['jpg', 'png', 'jpeg'];

  // Fetch excursion data
  useEffect(() => { 
    fetchExcurData();
  }, []);

  const fetchExcurData = async () => {
    try {
      const response = await fetch('/api/settings/cult', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch excursion data');
      }   
      const data = await response.json();
      setExcurData(data);
    } catch (error) {
      console.error('Error fetching excursion data:', error);
      setErrMsg('Failed to load excursion data');
    }
  };

  // Open modal and populate form with selected excursion data
  const handleOpenModal = (excur) => {
    setSelectedExcurId(excur._id || excur.id);
    setInter({
      title: excur.title || '',
      subtitle: excur.subtitle || '',
      intro: excur.intro || '',
      imageOne: excur.imageone || '',
    });
    setPreviews({
      imageOne: excur.imageone ? `/uploads/${excur.imageone}` : '',
    });
    setShowModal(true);
    setErrMsg('');
    setSuccessMsg('');
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExcurId(null);
    setInter({
      title: '',
      subtitle: '',
      intro: '',
      imageOne: '',
    });
    setFiles({
      imageOne: null,
    });
    setPreviews({
      imageOne: '',
    });
    setErrMsg('');
    setSuccessMsg('');
  };

  // Update excursion
  const handleUpdate = async () => {
    if (!selectedExcurId) {
      setErrMsg('No excursion selected');
      return;
    }

    try {
      const response = await fetch(`/api/settings/updatecult/${selectedExcurId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(inter)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrMsg(errorData.message || 'Failed to update excursion');
        return;
      }

      const data = await response.json();
      setSuccessMsg('Excursion updated successfully!');
      setErrMsg('');
      
      // Refresh the table data
      await fetchExcurData();
      
      // Close modal after 2 seconds
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      setErrMsg(error.message || 'An error occurred');
    }
  };

  // Handle file change
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

  // Upload image
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
    { key: 'imageOne', label: 'Image One' }
  ];

  return (
    <div className='mx-auto table-auto overflow-x-scroll p-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
      <div className="font-bold text-black text-4xl mb-7 mx-auto">
        Excursion Data
      </div>
      
      {excurData ? (
        <div className='mx-auto'>
          <Table className='shadow-md w-fit mx-auto border border-amber-50 rounded-2xl ' hoverable>
            <TableHead className='flex'>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Subtitle</TableHeadCell>
              <TableHeadCell>Intro</TableHeadCell>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>

            <TableBody className='divide-y divide-gray-500'>
              {excurData.map((excur) => (
                <TableRow key={excur._id || excur.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell className='font-medium'>{excur.title}</TableCell>
                  <TableCell>{excur.subtitle}</TableCell>
                  <TableCell className='max-w-xs truncate'>{excur.intro}</TableCell>
                  <TableCell>
                    {excur.imageone && (
                      <img 
                        src={`/uploads/${excur.imageone}`}  
                        alt="Excursion"
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => handleOpenModal(excur)}
                      color="blue"
                      size="sm"
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading excursion data...</p>
      )}

      {/* Update Modal */}
      <Modal show={showModal} onClose={handleCloseModal} size="xl">
        <ModalHeader>Update Excursion</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
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
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <TextInput
                id="title"
                value={inter.title}
                onChange={(e) => setInter({ ...inter, title: e.target.value })}
                placeholder="Enter title"
              />
            </div>

            {/* Subtitle Field */}
            <div className="w-full flex flex-col gap-2">
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
            <div className="w-full flex flex-col gap-2">
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
              <div key={key} className="w-full flex flex-col gap-2">
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
                    size="sm"
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
                      <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                        <FaCheck /> Uploaded
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <Button color="gray" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button color="blue" onClick={handleUpdate}>
                Update Excursion
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DashCultUpdate;