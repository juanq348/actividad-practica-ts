import { Equipment } from "../models/Equipments.js";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

export const createEquipment = async (data : any) => {
    const exists = await Equipment.findOne({where:{serialNumber: data.serialNumber}});
    if(exists) throw new ApiError(400, 'Serial ya registrado');
    const equipment = await Equipment.create(data);
    return equipment;
}

export const listEquipment = async(filter: any = {}) => {
    return Equipment.findAll({where:filter, include:[{model:User, as:'owner', attributes:['id', 'name', 'email'] }] });
};

export const getEquipmentById = async(id:number, data:any) =>{
    const equipment = await Equipment.findByPk(id,{include:[{model:User, as:'owner', attributes:['id', 'name', 'email'] }] });
    if(!equipment) throw new ApiError(404, 'Equipo no encontrado');
    if(data.serialNumber && data.serialNumber !== equipment.serialNumber){
        const exists = await Equipment.findOne({where:{serialNumber: data.serialNumber} });
        if(exists) throw new ApiError(400, 'Serial ya registrado');
    }
    await equipment.update(data);
    return equipment;
};

export const deleteEquipmentById = async(id:number) => {
    const equipment = await Equipment.findByPk(id);
    if(!equipment) throw new ApiError(404, 'Equipo no encontrado');
    await equipment?.destroy();
    return;
}