import express from 'express'
import { createContact, getContacts, getContactById, updateContactStatus, deleteContact } from '../controllers/contact.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

// Create contact message (public)
router.post('/create', createContact)

// Get all contacts (admin only)
router.get('/getcontacts', verifyToken, getContacts)
router.get('/getcontacts/:id', verifyToken, getContactById)

// Update contact status (admin only)
router.put('/updatestatus/:id', verifyToken, updateContactStatus)

// Delete contact (admin only)
router.delete('/delete/:id', verifyToken, deleteContact)

export default router
