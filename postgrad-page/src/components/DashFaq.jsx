import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalBody, ModalHeader, TextInput, Textarea, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Alert } from 'flowbite-react'

const DashFaq = () => {
  const [faqs, setFaqs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentFaqId, setCurrentFaqId] = useState(null)
  const [faqData, setFaqData] = useState({ question: '', answer: '' })
  const [succMsg, setSuccMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faq/getfaq?limit=100')
      const result = await res.json()
      if (res.ok) {
        setFaqs(result.data)
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setIsEditing(false)
    setCurrentFaqId(null)
    setFaqData({ question: '', answer: '' })
    setErrMsg('')
    setSuccMsg('')
  }

  const handleSubmit = async () => {
    try {
      const url = isEditing 
        ? `/api/faq/updatefaq/${currentFaqId}` 
        : `/api/faq/createfaq`
      
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(faqData)
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          setErrMsg('Authentication required. Please login as admin.')
        } else {
          setErrMsg(data.message || 'Failed to save FAQ')
        }
        return
      }

      setSuccMsg(`FAQ ${isEditing ? 'updated' : 'created'} successfully!`)
      setTimeout(() => {
        handleCloseModal()
        fetchFaqs()
      }, 2000)
    } catch (error) {
      setErrMsg('Error saving FAQ: ' + error.message)
      console.error('Error saving FAQ:', error)
    }
  }

  const handleEdit = (faq) => {
    setIsEditing(true)
    setCurrentFaqId(faq.id)
    setFaqData({ question: faq.question, answer: faq.answer })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const res = await fetch(`/api/faq/deletefaq/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok) {
        fetchFaqs()
      } else {
        if (res.status === 401) {
          alert('Authentication required. Please login as admin.')
        } else {
          alert(data.message || 'Failed to delete FAQ')
        }
      }
    } catch (error) {
      alert('Error deleting FAQ: ' + error.message)
      console.error('Error deleting FAQ:', error)
    }
  }

  return (
    <div className='mx-auto max-w-7xl py-15'>
      <h1 className='text-2xl my-5 font-bold text-center'>Manage FAQs</h1>

      <Button onClick={() => setShowModal(true)}>Add New FAQ</Button>

      <div className='mt-8 overflow-x-auto'>
        {loading ? (
          <p className='text-center'>Loading FAQs...</p>
        ) : faqs.length === 0 ? (
          <p className='text-center text-gray-500'>No FAQs found</p>
        ) : (
          <Table className=''>
            <TableHead className='flex w-full'>
              <TableHeadCell>Question</TableHeadCell>
              <TableHeadCell>Answer</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {faqs.map((faq) => (
                <TableRow key={faq.id} className='bg-white'>
                  <TableCell className='font-medium'>{faq.question}</TableCell>
                  <TableCell className='max-w-md truncate'>{faq.answer}</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button size='xs' onClick={() => handleEdit(faq)}>
                        Edit
                      </Button>
                      <Button size='xs' color='failure' onClick={() => handleDelete(faq.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Modal show={showModal} onClose={handleCloseModal}>
        <ModalHeader>{isEditing ? 'Edit FAQ' : 'Add New FAQ'}</ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-4'>
            {succMsg && <Alert color='success'>{succMsg}</Alert>}
            {errMsg && <Alert color='failure'>{errMsg}</Alert>}

            <div>
              <label className='block mb-2 text-sm font-medium'>Question</label>
              <TextInput
                type='text'
                placeholder='Enter question'
                value={faqData.question}
                onChange={(e) => setFaqData({ ...faqData, question: e.target.value })}
                required
              />
            </div>

            <div>
              <label className='block mb-2 text-sm font-medium'>Answer</label>
              <Textarea
                placeholder='Enter answer'
                value={faqData.answer}
                onChange={(e) => setFaqData({ ...faqData, answer: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className='flex gap-2 justify-end'>
              <Button color='gray' onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DashFaq
