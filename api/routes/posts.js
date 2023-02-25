import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/post.js";

const router = express.Router();

router.get('/', getPosts)
router.post('/add', addPost)
router.delete('/:id', deletePost)

export default router;