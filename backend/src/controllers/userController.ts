import * as userService from '../services/userService.js';
import 'dotenv/config';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { redis } from '../configs/redis.js';


const registerUser = async (req: Request, res: Response ) => {
    const { username, email, password } = req.body;

    try {
        const createUser = await userService.createUser(username, email, password);
        if(createUser?.erro) {
            return res.status(400).json(createUser);
        }

        return res.status(201).json(createUser);
    } catch (err) {
        return res.status(500).json({ erro: `Erro inesperado ${err}` });
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const logUser = await userService.login(email, password);
        if(logUser?.erro) {
            return res.status(401).json(logUser);
        }

        if (logUser.user) {
            const userId = logUser.user._id;
            const username = logUser.user.name;
            const key = process.env.ACCESS_KEY as string;

            const accessToken = jwt.sign({
                userId: userId,
                username: username,
            }, key, { expiresIn: '1h' });
            
            const refreshToken = jwt.sign({
                userId: userId,
                username: username,
            }, key, { expiresIn: '7d' });
            
            await redis.setEx(`refreshToken:${userId}`, 7 * 24 * 60 * 60, JSON.stringify(refreshToken));

            return res.status(200).json({ message: "Usuário autenticado", token: accessToken });
        }
    } catch(err) {
        return res.status(500).json({ erro: `Erro inesperado: ${err}` });
    }
}



export { registerUser, login }