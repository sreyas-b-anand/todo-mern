import express from 'express';
import { loginUser, signupUser } from '../controller/userController.js';

const router = express.Router();

// Login
router.post('/login', loginUser);

// Sign up
router.post('/signup', signupUser);

export default router;
