import express from 'express';
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPosts, deletePost, updatePost} from "../controllers/post.controller.js";

// Post routes - Base URL: /api/post
const router = express.Router()

// Create new blog post (admin only)
router.post('/create', verifyToken, create)

// Get posts with filtering and pagination
router.get('/getposts', getPosts)
// router.get('/getposts/:slug', getPosts)


router.delete('/deletepost/:postId/:userId',verifyToken, deletePost)

router.put('/updatepost/:postId/:userId', verifyToken, updatePost)



export default router
