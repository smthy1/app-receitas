import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config'

interface Payload {
    id: string;
    username: string;
}

const authToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({ erro: "Token inválido" });
    }

    try {
        const key = process.env.KEY as string;
        const decoded = jwt.verify(token, key) as Payload;
        
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.status(500).json({ erro: `Erro inesperado: ${err}` });
    }
}

export default authToken