import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Alert, Badge, Textarea, Select } from 'flowbite-react'
import { HiMail, HiUser, HiClock } from 'react-icons/hi'

const DashContact = () => {
  const [contacts, setContacts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [succMsg, setSuccMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [filter])

  const fetchContacts = async () => {
    try {
      const url = filter === 'all' 
        ? '/api/contact/getcontacts?limit=100' 
        : `/api/contact/getcontacts?limit=100&status=${filter}`
      
      const res = await fetch(url, {
        credentials: 'include'
      })
      const result = await res.json()
      
      if (res.ok) {
        setContacts(result.data)
      } else {
        console.error('Failed to fetch contacts')
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewContact = (contact) => {
    setSelectedContact(contact)
    setShowModal(true)
    
    // Mark as read if it's unread
    if (contact.status === 'unread') {
      updateStatus(contact.id, 'read')
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/contact/updatestatus/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status })
      })

      if (res.ok) {
        fetchContacts()
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({ ...selectedContact, status })
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return

    try {
      const res = await fetch(`/api/contact/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (res.ok) {
        setSuccMsg('Message deleted successfully')
        fetchContacts()
        setTimeout(() => setSuccMsg(''), 3000)
      } else {
        setErrMsg('Failed to delete message')
        setTimeout(() => setErrMsg(''), 3000)
      }
    } catch (error) {
      setErrMsg('Error deleting message')
      console.error('Error deleting message:', error)
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      unread: 'failure',
      read: 'warning',
      replied: 'success'
    }
    return <Badge color={colors[status] || 'gray'}>{status}</Badge>
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className='mx-auto max-w-7xl py-15'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Contact Messages</h1>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} className='w-40'>
          <option value='all'>All Messages</option>
          <option value='unread'>Unread</option>
          <option value='read'>Read</option>
          <option value='replied'>Replied</option>
        </Select>
      </div>

      {succMsg && <Alert color='success' className='mb-4'>{succMsg}</Alert>}
      {errMsg && <Alert color='failure' className='mb-4'>{errMsg}</Alert>}

      <div className='mt-8 overflow-x-auto'>
        {loading ? (
          <p className='text-center'>Loading messages...</p>
        ) : contacts.length === 0 ? (
          <p className='text-center text-gray-500'>No messages found</p>
        ) : (
          <Table hoverable>
            <TableHead className='flex'>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Message Preview</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {contacts.map((contact) => (
                <TableRow 
                  key={contact.id} 
                  className={`bg-white ${contact.status === 'unread' ? 'font-semibold' : ''}`}
                >
                  <TableCell>{getStatusBadge(contact.status)}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <HiUser />
                      {contact.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <HiMail />
                      {contact.email}
                    </div>
                  </TableCell>
                  <TableCell className='max-w-xs truncate'>
                    {contact.message}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                      <HiClock />
                      {formatDate(contact.created_at)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button size='xs' onClick={() => handleViewContact(contact)}>
                        View
                      </Button>
                      <Button size='xs' color='failure' onClick={() => handleDelete(contact.id)}>
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

      <Modal show={showModal} onClose={() => setShowModal(false)} size='xl'>
        <ModalHeader>Contact Message</ModalHeader>
        <ModalBody>
          {selectedContact && (
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-500'>Status</p>
                  <div className='mt-1'>{getStatusBadge(selectedContact.status)}</div>
                </div>
                <div className='flex gap-2'>
                  <Button 
                    size='xs' 
                    color={selectedContact.status === 'replied' ? 'gray' : 'success'}
                    onClick={() => updateStatus(selectedContact.id, 'replied')}
                    disabled={selectedContact.status === 'replied'}
                  >
                    Mark as Replied
                  </Button>
                </div>
              </div>

              <div>
                <p className='text-sm text-gray-500'>Name</p>
                <p className='font-medium'>{selectedContact.name}</p>
              </div>

              <div>
                <p className='text-sm text-gray-500'>Email</p>
                <a 
                  href={`mailto:${selectedContact.email}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `mailto:${selectedContact.email}`;
                  }}
                  className='text-blue-600 hover:underline cursor-pointer'
                >
                  {selectedContact.email}
                </a>
              </div>

              <div>
                <p className='text-sm text-gray-500'>Date Received</p>
                <p>{formatDate(selectedContact.created_at)}</p>
              </div>

              <div>
                <p className='text-sm text-gray-500 mb-2'>Message</p>
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <p className='whitespace-pre-wrap'>{selectedContact.message}</p>
                </div>
              </div>

              <div className='flex gap-2 justify-end mt-4'>
                <Button 
                  color='gray' 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => window.location.href = `mailto:${selectedContact.email}`}
                >
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DashContact
