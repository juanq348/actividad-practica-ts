import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const authenticate = (req:Request, res:Response, next:NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message:'Token no encontrado'});
        }
        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET as string;
        const payload = jwt.verify(token, secret) as any;
        (req as any).user = { id: payload.id, role:payload.role, email:payload.email};
        next();
    } catch (err) {
        return res.status(401).json({message:'Token inválido'});
    }
};