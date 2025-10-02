import type { IUserInformation } from "../models/User.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ApiError } from "../utils/ApiError.js";
dotenv.config();

export const registerUser = async(data:IUserInformation, requesterRole?:string) => {
    if (requesterRole && requesterRole !== 'admin'){
        throw new ApiError(403, 'Solo los administradores pueden crear usuarios');
    }
    const exists = await User.findOne({where:{email:data.email}});
    if(exists) throw new ApiError(400, 'Email ya registrado');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await User.create({...data, password:hashed});
    return { id:user.id, name:user.name, email:user.email, role:user.role};
}

export const loginUser = async(email:string, password:string) => {
    const user = await User.findOne({where:{email}});
    if(!user) throw new ApiError(401, 'Credenciales incorrectas');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new ApiError(401, 'Credenciales incorrectas');

    const payload = {id:user.id, role:user.role, email:user.email};
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn:'5h'});
    return {token,user:{id:user.id, name:user.name, email:user.email, role:user.role}};
}
