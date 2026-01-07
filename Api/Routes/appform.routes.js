import express from 'express'
import { getSessions, submitAppForm } from '../controllers/applicationController.js'





const router = express.Router()

router.post('/create', submitAppForm)
router.get('/getSessions', getSessions)

export default router