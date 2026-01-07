import { Alert, Button, Label, Textarea, TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react';

const DashAppForm = () => {
  // State for Application Stages
  const [stages, setStages] = useState({
    stageOne: '',
    stageTwo: '',
    stageThree: '',
    stageFour: ''
  });

  // State for Application Documents
  const [document, setDocument] = useState('');
  const [documents, setDocuments] = useState([]);

  // State for Application Timeline
  const [timeline, setTimeline] = useState({
    title: '',
    time: ''
  });
  const [timelines, setTimelines] = useState([]);

  // UI States
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch existing data on component mount
  useEffect(() => {
    fetchStages();
    fetchDocuments();
    fetchTimelines();
  }, []);

  // ========== FETCH FUNCTIONS ==========
  const fetchStages = async () => {
    try {
      const response = await fetch('/api/application/stages');
      if (!response.ok) throw new Error('Failed to fetch stages');
      const data = await response.json();
      
      // Populate stages from database
      if (data.length > 0) {
        const stagesObj = {};
        data.forEach((stage, index) => {
          stagesObj[`stage${['One', 'Two', 'Three', 'Four'][index]}`] = stage.description;
        });
        setStages(stagesObj);
      }
    } catch (error) {
      console.error('Error fetching stages:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/application/documents');
      if (!response.ok) throw new Error('Failed to fetch documents');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const fetchTimelines = async () => {
    try {
      const response = await fetch('/api/application/timelines');
      if (!response.ok) throw new Error('Failed to fetch timelines');
      const data = await response.json();
      setTimelines(data);
    } catch (error) {
      console.error('Error fetching timelines:', error);
    }
  };

  // ========== SAVE FUNCTIONS ==========
  const handleSaveStages = async () => {
    try {
      setLoading(true);
      setErrMsg('');
      
      const response = await fetch('/api/application/stages/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(stages)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrMsg(errorData.message || 'Failed to save stages');
        return;
      }

      setSuccessMsg('Application stages saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      await fetchStages();
    } catch (error) {
      setErrMsg(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDocument = async () => {
    if (!document.trim()) {
      setErrMsg('Please enter a document name');
      return;
    }

    try {
      setLoading(true);
      setErrMsg('');
      
      const response = await fetch('/api/application/documents/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ document_name: document })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrMsg(errorData.message || 'Failed to save document');
        return;
      }

      setSuccessMsg('Document saved successfully!');
      setDocument('');
      setTimeout(() => setSuccessMsg(''), 3000);
      await fetchDocuments();
    } catch (error) {
      setErrMsg(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTimeline = async () => {
    if (!timeline.title.trim() || !timeline.time.trim()) {
      setErrMsg('Please fill in both title and time');
      return;
    }

    try {
      setLoading(true);
      setErrMsg('');
      
      const response = await fetch('/api/application/timelines/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(timeline)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrMsg(errorData.message || 'Failed to save timeline');
        return;
      }

      setSuccessMsg('Timeline saved successfully!');
      setTimeline({ title: '', time: '' });
      setTimeout(() => setSuccessMsg(''), 3000);
      await fetchTimelines();
    } catch (error) {
      setErrMsg(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // ========== DELETE FUNCTIONS ==========
  const handleDeleteDocument = async (id) => {
    try {
      const response = await fetch(`/api/application/documents/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete document');
      
      setSuccessMsg('Document deleted successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      await fetchDocuments();
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  const handleDeleteTimeline = async (id) => {
    try {
      const response = await fetch(`/api/application/timelines/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete timeline');
      
      setSuccessMsg('Timeline deleted successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      await fetchTimelines();
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  return (
    <div className='px-auto mx-auto grid gap-4 max-w-7xl p-12'>
      <div className='max-w-7xl text-black text-3xl font-bold text-center mb-5'>
        Application Info
      </div>

      {errMsg && <Alert color="failure" onDismiss={() => setErrMsg('')}>{errMsg}</Alert>}
      {successMsg && <Alert color="success" onDismiss={() => setSuccessMsg('')}>{successMsg}</Alert>}

      <div>
        <h1 className='font-semibold text-xl mb-4'>Application Stages</h1>
        <section className='max-w-7xl grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5'>
          <div className='grid gap-3'>
            <Label htmlFor='stageOne'>Stage One</Label>
            <Textarea
              id='stageOne'
              value={stages.stageOne}
              onChange={(e) => setStages({ ...stages, stageOne: e.target.value })}
              placeholder='Enter Stage One Info'
              rows={6}
            />
          </div>

          <div className='grid gap-3'>
            <Label htmlFor='stageTwo'>Stage Two</Label>
            <Textarea
              id='stageTwo'
              value={stages.stageTwo}
              onChange={(e) => setStages({ ...stages, stageTwo: e.target.value })}
              placeholder='Enter Stage Two Info'
              rows={6}
            />
          </div>

          <div className='grid gap-3'>
            <Label htmlFor='stageThree'>Stage Three</Label>
            <Textarea
              id='stageThree'
              value={stages.stageThree}
              onChange={(e) => setStages({ ...stages, stageThree: e.target.value })}
              placeholder='Enter Stage Three Info'
              rows={6}
            />
          </div>

          <div className='grid gap-3'>
            <Label htmlFor='stageFour'>Stage Four</Label>
            <Textarea
              id='stageFour'
              value={stages.stageFour}
              onChange={(e) => setStages({ ...stages, stageFour: e.target.value })}
              placeholder='Enter Stage Four Info'
              rows={6}
            />
          </div>

          <Button
            className='mt-4 w-full col-span-full'
            onClick={handleSaveStages}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Stages'}
          </Button>
        </section>

        <section className='grid md:grid-cols-2 gap-5 mt-12'>
          {/* Application Documents */}
          <div>
            <div className='font-semibold mb-5 text-black text-xl'>Application Documents</div>
            <div className='grid gap-3'>
              <Label htmlFor='documents'>Required Documents</Label>
              <TextInput
                id='documents'
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder='Enter Required Document Name'
              />
            </div>
            <Button
              className='mt-4 w-full'
              onClick={handleSaveDocument}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Add Document'}
            </Button>

            {/* Display Documents List */}
            {documents.length > 0 && (
              <div className='mt-6 space-y-2'>
                <h3 className='font-semibold'>Current Documents:</h3>
                {documents.map((doc) => (
                  <div key={doc.id} className='flex justify-between items-center bg-gray-100 p-3 rounded'>
                    <span>{doc.document_name}</span>
                    <Button
                      size='xs'
                      color='failure'
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Application Timeline */}
          <div>
            <div className='font-semibold mb-5 text-black text-xl'>Application Timeline</div>
            <div className='grid gap-3'>
              <Label htmlFor='timelineTitle'>Enter Title</Label>
              <TextInput
                id='timelineTitle'
                value={timeline.title}
                onChange={(e) => setTimeline({ ...timeline, title: e.target.value })}
                placeholder='Enter Timeline Title'
              />
              <Label htmlFor='timelineTime'>Enter Time</Label>
              <TextInput
                id='timelineTime'
                value={timeline.time}
                onChange={(e) => setTimeline({ ...timeline, time: e.target.value })}
                placeholder='Enter Time Info (e.g., January 2024)'
              />
            </div>
            <Button
              className='mt-4 w-full'
              onClick={handleSaveTimeline}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Add Timeline'}
            </Button>

            {/* Display Timeline List */}
            {timelines.length > 0 && (
              <div className='mt-6 space-y-2'>
                <h3 className='font-semibold'>Current Timeline:</h3>
                {timelines.map((tl) => (
                  <div key={tl.id} className='flex justify-between items-center bg-gray-100 p-3 rounded'>
                    <div>
                      <div className='font-semibold'>{tl.title}</div>
                      <div className='text-sm text-gray-600'>{tl.time}</div>
                    </div>
                    <Button
                      size='xs'
                      color='failure'
                      onClick={() => handleDeleteTimeline(tl.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashAppForm;