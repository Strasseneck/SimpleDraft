import { sequelize } from "../index";
import { DataTypes, Model } from "sequelize";
import Diff from "./Diff";


interface PatchAttributes {
    id?: number;
    start1: number;
    start2: number;
    length1: number;
    length2: number;
    createdAt?: Date;
    updatedAt?: Date;
    ChangeId: number;
}

class Patch extends Model<PatchAttributes> implements PatchAttributes {
    public id!: number;
    public start1!: number;
    public start2!: number;
    public length1!: number;
    public length2!: number;
    public createdAt!: Date; // Sequelize automatically adds it
    public updatedAt!: Date; // Sequelize automatically adds it
    public ChangeId!: number;
}

Patch.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      start1: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      start2: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      length1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      length2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      ChangeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Patch'
    }
  );
  
  export default Patch;