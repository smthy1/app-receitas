import express from 'express';
import * as userController from '../controllers/userController.js';
import limiter from '../middlewares/rateLimit.js';
import { registerValidation } from '../middlewares/registerValidation.js';
import { loginValidation } from '../middlewares/loginValidation.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.post('/register', registerValidation, validate, userController.registerUser);
router.post('/login', limiter, loginValidation, validate, userController.login);


export default router