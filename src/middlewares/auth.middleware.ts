import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error("Falta la variable JWT_SECRET")
}

export const authenticate = (req:Request, res:Response, next:NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message:'Token no encontrado'});
        }

        const token = authHeader.split(' ')[1];
        if(!token) {
            return res.status(401).json({message:"Token inválido"})
        }
        
        const payload:any = jwt.verify(token, JWT_SECRET);

        (req as any).user = { id: payload.id, role:payload.role, email:payload.email};
        next();
    } catch (err) {
        return res.status(401).json({message:'Token inválido'});
    }
};