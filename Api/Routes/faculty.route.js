import express from 'express'
import {updateFaculty, createFaculty, deleteFaculty, getFaculty} from '../controllers/faculty.controller.js'
import { verifyToken } from '../utils/verifyUser.js'


const router = express.Router()

//getFaculty

router.post('/create', verifyToken, createFaculty)
router.get('/getfaculty', getFaculty)

router.delete('/deletefaculty/:facultyId', verifyToken, deleteFaculty)
router.put('/:facultyId', verifyToken, updateFaculty)

export default router;