import { Router } from "express";
import { body } from "express-validator";
import * as authController from '../controllers/auth.controller.js';
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    '/login', [
        body('email').isEmail().withMessage('Email inválido'), 
        body('password').isLength({min:6}).withMessage('La contraseña debe tener mínimo 6 caracteres')
    ], authController.login
);

router.post(
    '/register', 
    authenticate, 
    [
        body('name').notEmpty(), 
        body('email').isEmail(), 
        body('password').isLength({min: 6}), 
        body('role').optional().isIn(['admin', 'user'])
    ], authController.register
);

export default router;