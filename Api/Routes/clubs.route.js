import express from 'express';
// import {
//     createClubMain,
//     updateClubMain,
//     getClubMain,
//     getClubMainById,
//     deleteClubMain,
//     createClubSub,
//     updateClubSub,
//     getClubSub,
//     getClubSubById,
//     deleteClubSub,
//     createClubMember,
//     updateClubMember,
//     getClubMembers,
//     getClubMembersByClubId,
//     getClubMemberById,
//     deleteClubMember,
//     getClubWithMembers
// } from '../controllers/club.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';
import { createClubMain, createClubMember, createClubSub, deleteClubMain, deleteClubMember, deleteClubSub, getClubMain, getClubMainById, getClubMemberById, getClubMembers, getClubMembersByClubId, getClubSub, getClubSubById, getClubWithMembers, updateClubMain, updateClubMember, updateClubSub } from '../controllers/club.controlers.js';

const router = express.Router();

// Club Main Routes
router.post('/clubmain/create', verifyToken,createClubMain);
router.put('/clubmain/update/:id', updateClubMain);
router.get('/clubmain', getClubMain);
router.get('/clubmain/:id', getClubMainById);
router.delete('/clubmain/delete/:id', deleteClubMain);

// Club Sub Routes
router.post('/clubsub/create', createClubSub);
router.put('/clubsub/update/:id', updateClubSub);
router.get('/clubsub', getClubSub);
router.get('/clubsub/:id', getClubSubById);
router.delete('/clubsub/delete/:id', deleteClubSub);

// Club Members Routes
router.post('/clubmember/create', createClubMember);
router.put('/clubmember/update/:id', updateClubMember);
router.get('/clubmember', getClubMembers);
router.get('/clubmember/club/:club_id', getClubMembersByClubId);
router.get('/clubmember/:id', getClubMemberById);
router.delete('/clubmember/delete/:id', deleteClubMember);

// Get club with all its members
router.get('/clubwithmembers/:club_id', getClubWithMembers);

export default router;