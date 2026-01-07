import express from 'express'
import { createPrincipal, getPrincipal, updatePrincipal } from '../controllers/directory.controller.js'


const router = express()

router.post('/createprincipal', createPrincipal)
router.get('/principal', getPrincipal)
router.put('/updateprincipal', updatePrincipal)


export default router