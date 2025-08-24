import * as recipeService from '../services/recipeService.js';
import type { Request, Response } from 'express';

const findRecipe = async (req: Request, res: Response) => {
    const { meal } = req.body;

    try {
        const result = await recipeService.searchRecipe(meal);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ erro: `Erro inesperado ${err}` });
    }
}


export { findRecipe }