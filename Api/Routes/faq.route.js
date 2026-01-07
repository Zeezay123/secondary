import express from 'express'
import { createFaq, getFaq, getFaqById, updateFaq, deleteFaq } from '../controllers/faq.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

// Get all FAQs (public)
router.get('/getfaq', getFaq)
router.get('/getfaq/:id', getFaqById)

// Create new FAQ (admin only)
router.post('/createfaq', verifyToken, createFaq)

// Update FAQ (admin only)
router.put('/updatefaq/:id', verifyToken, updateFaq)

// Delete FAQ (admin only)
router.delete('/deletefaq/:id', verifyToken, deleteFaq)

export default router
