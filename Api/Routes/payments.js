import express from 'express';
import { create, get, getRef } from '../controllers/payment.js';
import { downloadpdf, exportPaymentExcel } from '../controllers/excelController.js';

const router = express.Router()

router.get("/", get)
router.post("/create", create)
router.get('/:reference', getRef)
router.get('/downloadxl', exportPaymentExcel )
router.get('/downloadpdf', downloadpdf)

export default router