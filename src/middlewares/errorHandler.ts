import type { Request, Response, NextFunction} from "express";
import { ApiError } from "../utils/ApiError.js";

export default function errorHandler(err:any, req:Request, res:Response, next:NextFunction){
    console.error(err);
    if(err instanceof ApiError){
        return res.status(err.status).json({message:err.message});
    }
    return res.status(err.status || 500).json({message:err.message || 'Error de servidor'});
}