import { body } from 'express-validator';

export const recipeValidation = [
    body("meal").notEmpty().withMessage("Informe o nome.")
];