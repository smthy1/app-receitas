import * as favoriteService from '../services/favoriteService.js';
import type { Request, Response } from 'express';
import type { AuthRequest } from '../types/express.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const getMyFavs = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded: any = jwt.verify(token!, process.env.KEY!);
        const userId = decoded.userId;

        const myFavs = await favoriteService.getMyFavorites(userId);

        return res.status(200).json(myFavs);
    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado." });
    }
}

const addFavorite = async (req: AuthRequest, res: Response) => {
    try {
        const { name, instructions, youtube, area } = req.body;
        const userId = req.user?.userId;

        const favorite = await favoriteService.favRecipe(userId!, name, instructions, youtube, area);
        if (favorite?.erro) {
            return res.status(400).json(favorite);
        }

        return res.status(201).json(favorite);
    } catch (err) {
        return res.status(500).json({ erro: `Erro inesperado: ${err}` });
    }
}



export { getMyFavs, addFavorite }