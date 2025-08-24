import express from 'express';
import * as favoriteController from '../controllers/favoriteController.js';
import authToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authToken,favoriteController.getMyFavs);
router.post('/', authToken, favoriteController.addFavorite);

export default router