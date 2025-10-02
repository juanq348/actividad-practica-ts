import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import { User } from "./User.js";

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

export class Equipment extends Model<IEquipment> implements IEquipment{
    public id! : number;
    public name! : string;
    public brand! : string;
    public model! : string;
    public serialNumber!: string;
    public ownerId! : number | null;
    public description! : string;
    public location! : string;
    public state!: EquipmentState;

    public readonly createAt! : Date;
    public readonly updatedAt! : Date;
}

Equipment.init(
    {
    id:{type:DataTypes.INTEGER.UNSIGNED, autoIncrement:true, primaryKey:true},
    serialNumber: {type:DataTypes.STRING, allowNull: false, unique:true},
    name:{type:DataTypes.STRING, allowNull:false},
    brand:{type:DataTypes.STRING},
    ownerId:{type:DataTypes.STRING, allowNull: true},
    description:{type:DataTypes.STRING},
    location:{type:DataTypes.STRING},
    state:{type: DataTypes.ENUM('disponible', 'en_uso', 'en_reparacion', 'no_disponible'),defaultValue: 'available'},
    },
    {
    sequelize,
    modelName:'Equipment',
    tableName:'equipments'
    }
);

User.hasMany(Equipment,{foreignKey: 'ownerId', as:'equipments'})
Equipment.belongsTo(User, {foreignKey:'ownerId', as:'owner'});