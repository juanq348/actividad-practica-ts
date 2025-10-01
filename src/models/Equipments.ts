import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export type EquipmentState = 'disponible' | 'en_uso' | 'en_reparacion' | 'no_disponible'; 

export interface IEquipment{
    id? : number,
    name : string,
    brand? : string,
    model? : string,
    ownerId? : number | null,
    description : string,
    location : string,
    state? : EquipmentState,

}

class Equipment extends Model<IEquipment> implements IEquipment{
    public id! : number;
    public name! : string;
    public brand! : string;
    public model! : string;
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
    name:{type:DataTypes.STRING, allowNull:false},

    }
)