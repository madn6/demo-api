import express from 'express';
import {
	createPost,
	getPosts,
	getPostById,
	updatePost,
	deletePost
} from '../controllers/post.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';


const postRouter = express.Router();
// Public routes
postRouter.get('/get-posts', getPosts); // GET all posts
postRouter.get('/get-post/:id', getPostById); // GET single post by ID

// Protected routes
postRouter.post('/create-post', verifyToken, createPost); // CREATE a post
postRouter.put('/update-post/:id', verifyToken, updatePost); // UPDATE a post
postRouter.delete('/delete-post/:id', verifyToken, deletePost); // DELETE a post

export default postRouter;
