import type { Request, Response, NextFunction } from "express";
import * as authService from '../services/auth.services.js';
import {validationResult} from 'express-validator';

export const register = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

        const requesterRole = (req as any).user?.role;
        const user = await authService.registerUser(req.body, requesterRole);
        res.status(201).json(user);
    } catch (err) { 
        next(err);
    }
};

export const login = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

        const {email, password} = req.body;
        const result = await authService.loginUser(email,password);
        res.json(result);
    } catch (err) {
        next(err);
    }
};