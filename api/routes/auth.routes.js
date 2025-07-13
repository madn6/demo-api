import express from 'express';
import { login, registerUser } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register-user', registerUser);
authRouter.post('/login-user', login);

export default authRouter;
