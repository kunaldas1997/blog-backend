// File: router/routes_user.js

import express from 'express';
import { createUser, getUser } from '../controllers/usercontroller.js';

const u_router = express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               nickname:
 *                 type: string
 *                 description: The user's nickname
 *               password:
 *                 type: string
 *                 description: The user's password
 *               rights:
 *                 type: string
 *                 description: The user's rights
 *             required:
 *               - name
 *               - email
 *               - password
 *               - rights
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
u_router.post('/signup', createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid email or password
 */
u_router.post('/login', getUser);



export default u_router;
