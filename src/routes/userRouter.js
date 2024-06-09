import { Router } from "express";
import { createUser, getUser } from "../controllers/usercontroller.js";


const user_router = new Router();
user_router.post('/signup', createUser);
user_router.post('/login', getUser);
user_router.get('/me');

export default user_router;