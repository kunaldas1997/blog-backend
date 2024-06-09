import e from 'express';
import { Router } from 'express';
import { getPosts, setPost, updatePost, deletePost, getPostsWithID, searchPost } from '../controllers/postController.js';

const router = new Router();

router.route('/search').get(searchPost);
router.route('/').get(getPosts).post(setPost);
router.route('/s').get(getPostsWithID).patch(updatePost).delete(deletePost);

export default router;
