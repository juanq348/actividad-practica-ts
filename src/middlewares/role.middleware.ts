import type { Request, Response, NextFunction } from "express";

export const allowRole =
    (...allowed: string[]) =>
    (req: Request, res: Response, next:NextFunction)=>{
        const user = (req as any).user;
        if(!user) return res.status(401).json({message: 'Usuario no autenticado'});
        if(!allowed.includes(user.role)){
            return res.status(403).json({message: 'Permisos insuficientes'});
        }
        next();
    }