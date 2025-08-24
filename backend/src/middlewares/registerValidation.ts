import { body } from 'express-validator';

export const registerValidation = [
    body("username")
        .isLength({ min: 3, max: 20 })
        .withMessage("O nome de usuário deve ter entre 3 a 20 caracteres."),
    body("email").isEmail().withMessage("Formato de email inválido."),
    body("password")
        .isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1 })
        .withMessage("A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula e 1 número.")
];