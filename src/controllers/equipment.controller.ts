import type { Request, Response, NextFunction } from "express";
import * as service from '../services/equipment.services.js';
import { validationResult } from "express-validator";

export const create = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
        const equipment = await service.createEquipment(req.body);
        res.status(201).json(equipment)
    } catch (err) {
        next(err);
    }
}

export const list = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = (req as any).user;
        const isAdmin = user.role === 'admin';
        const filter : any = {};
        if(!isAdmin) filter.ownerId = user.id;
        const list = await service.listEquipment(filter);
        res.json(list);
    } catch (err) {
        next(err);
    }
}

export const get = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const equipment = await service.getEquipmentById(Number(req.params.id));
        res.json(equipment);
    } catch (err) {
        next(err);
    }
}

export const update = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const equipment = await service.updateEquipment(Number(req.params.id), req.body);
        res.json(equipment);
    } catch (err) {
        next(err);
    }
}

export const remove = async(req:Request, res:Response, next:NextFunction) => {
    try {
        await service.deleteEquipmentById(Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}