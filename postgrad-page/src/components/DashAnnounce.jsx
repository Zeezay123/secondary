import { Button, TextInput, Alert } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const DashAnnounce = () => {
  const [annData, setAnndata] = useState({ title: '', content: '' });
  const [alert, setAlert] = useState({ type: '', message: '' }); // For notifications

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/announce/');
        if (!res.ok) {
          console.log('cannot fetch data');
          return;
        }

        const data = await res.json();
        setAnndata(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/announce/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(annData),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({ type: 'failure', message: data.message || 'Submission failed' });
        return;
      }

      setAlert({ type: 'success', message: 'Announcement updated successfully!' });
    } catch (error) {
      setAlert({ type: 'failure', message: error.message });
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Announcement Post</h1>

      {alert.message && (
        <Alert
          color={alert.type === 'success' ? 'success' : 'failure'}
          onDismiss={() => setAlert({ type: '', message: '' })}
          className="mb-4"
        >
          {alert.message}
        </Alert>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          value={annData.title}
          onChange={(e) => setAnndata({ ...annData, title: e.target.value })}
        />

        <ReactQuill
          theme="snow"
          placeholder="Write Announcement"
          className="h-72 mb-5"
          value={annData.content}
          onChange={(value) => setAnndata({ ...annData, content: value })}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default DashAnnounce;
