import express from 'express';
import {
    createStages,
    getStages,
    updateStage,
    deleteStage,
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    createTimeline,
    getTimelines,
    getTimelineById,
    updateTimeline,
    deleteTimeline
} from '../controllers/ApplicationInfo.Controller.js';
const router = express.Router();

// Application Stages Routes
router.post('/stages/create', createStages);
router.get('/stages', getStages);
router.put('/stages/update/:id', updateStage);
router.delete('/stages/delete/:id', deleteStage);

// Application Documents Routes
router.post('/documents/create', createDocument);
router.get('/documents', getDocuments);
router.get('/documents/:id', getDocumentById);
router.put('/documents/update/:id', updateDocument);
router.delete('/documents/delete/:id', deleteDocument);

// Application Timeline Routes
router.post('/timelines/create', createTimeline);
router.get('/timelines', getTimelines);
router.get('/timelines/:id', getTimelineById);
router.put('/timelines/update/:id', updateTimeline);
router.delete('/timelines/delete/:id', deleteTimeline);

export default router;