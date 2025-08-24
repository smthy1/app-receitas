import express from 'express';
import * as recipeController from '../controllers/recipeController.js';
import authToken from '../middlewares/auth.js';
import { recipeValidation } from '../middlewares/recipeValidation.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.post('/', authToken, recipeValidation, validate, recipeController.findRecipe );

export default router