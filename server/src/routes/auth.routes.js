import express from 'express';
import { login, register, forgotPassword } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);

export default router;
