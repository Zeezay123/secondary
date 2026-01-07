import express from 'express'
import { createYearbook, deleteYearbook, getyearbookById, getyearbooks, updateYearbook } from '../controllers/yearbook.controller.js'


const router = express.Router()


router.post('/createyearbook', createYearbook)
router.get('/getyearbooks', getyearbooks)
router.get('/getyearbook/:id', getyearbookById)
router.delete('/deleteyearbook/:id', deleteYearbook)
router.put('/updateyearbook/:id', updateYearbook)

export default router