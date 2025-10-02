import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export type UserRole = 'admin' | 'user'; 

export interface IUserInformation {
    id?:number,
    name : string,
    email : string,
    password : string,
    role? : UserRole
}

export default class User extends Model<IUserInformation>{
    declare id? : number;
    declare name : string;
    declare email : string;
    declare password : string;
    declare role? : UserRole;
}

User.init(
    {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name:{type:DataTypes.STRING, allowNull:false},
        email:{type:DataTypes.STRING, allowNull:false, unique:true},
        password:{type:DataTypes.STRING, allowNull:false},
        role:{type:DataTypes.ENUM('admin','user'), defaultValue:'user'}
    },
    {
        sequelize,
        modelName:'User',
        tableName: 'users',
    }
)