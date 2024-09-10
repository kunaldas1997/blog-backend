import express from 'express';
import { getPosts, setPost, updatePost, deletePost, getPostsWithID, searchPost } from '../controllers/postController.js';

const router = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Uses JWT Token which is generally added in Authorization Header with Bearer
 * /posts:
 *   tags: [Post]
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Create a new post
 *     description: Add a new post to the collection.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               
 *               excerpt:
 *                 type: string
 *                 description: A brief summary or excerpt of the post (optional)
 *               
 *               post_content:
 *                 type: string
 *                 description: The main content of the post
 *               post_category:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the category of the post (must be a valid ObjectId)
 *             required:
 *               - title
 *               - post_author
 *               - post_category
 *     responses:
 *       201:
 *         description: The post was successfully created.
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.route('/').get(getPosts).post(setPost);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /posts/s:
 *   parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: The ID of the post to retrieve, update, or delete.
 *       schema:
 *         type: string
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieve a specific post by its ID.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The post with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 publish_date:
 *                   type: string
 *                   format: date
 *                 excerpt:
 *                   type: string
 *                 post_author:
 *                   type: string
 *                   format: uuid
 *                 post_content:
 *                   type: string
 *                 post_category:
 *                   type: string
 *                   format: uuid
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Update a post by ID
 *     description: Update a specific post identified by its ID.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post to update
 *               excerpt:
 *                 type: string
 *                 description: An excerpt or summary of the post
 *               post_content:
 *                 type: string
 *                 description: The updated content of the post
 *               post_category:
 *                 type: string
 *                 format: uuid
 *                 description: The updated category ID of the post
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: The post was successfully updated.
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a post by ID
 *     description: Remove a specific post identified by its ID.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The post was successfully deleted.
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.route('/s').get(getPostsWithID).patch(updatePost).delete(deletePost);


// Only search according to keywords passed
router.route('/search').get(searchPost);


export default router;
