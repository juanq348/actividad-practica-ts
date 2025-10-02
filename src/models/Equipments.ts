import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

export type EquipmentState = 'disponible' | 'en_uso' | 'en_reparacion' | 'no_disponible'; 

export interface IEquipment{
    id? : number,
    name : string,
    brand? : string,
    model? : string,
    serialNumber : string,
    ownerId? : number | null,
    description : string,
    location : string,
    state? : EquipmentState,
}

export class Equipment extends Model<IEquipment>{
    declare id: number;
    declare name: string;
    declare brand?: string;
    declare model?: string;
    declare serialNumber: string;
    declare ownerId?: number | null;
    declare description: string;
    declare location: string;
    declare state: EquipmentState;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Equipment.init(
    {
    id:{type:DataTypes.INTEGER.UNSIGNED, autoIncrement:true, primaryKey:true},
    serialNumber: {type:DataTypes.STRING, allowNull: false, unique:true},
    name:{type:DataTypes.STRING, allowNull:false},
    brand:{type:DataTypes.STRING},
    ownerId:{type:DataTypes.INTEGER, allowNull: true},
    description:{type:DataTypes.STRING},
    location:{type:DataTypes.STRING},
    state:{type: DataTypes.ENUM('disponible', 'en_uso', 'en_reparacion', 'no_disponible'),defaultValue: 'disponible'},
    },
    {
    sequelize,
    modelName:'Equipment',
    tableName:'equipments'
    }
);

User.hasMany(Equipment,{foreignKey: 'ownerId', as:'equipments'})
Equipment.belongsTo(User, {foreignKey:'ownerId', as:'owner'});