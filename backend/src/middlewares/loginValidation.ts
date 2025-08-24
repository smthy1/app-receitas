import { body } from 'express-validator';

export const loginValidation = [
    body("email").notEmpty().withMessage("Preencha corretamente o campo de login."),
    body("password").notEmpty().withMessage("Preencha corretamente o campo da senha.")
];