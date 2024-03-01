import { sequelize } from "../index"
import { DataTypes, Model } from "sequelize"

const DiffOperationEnum = {
    DIFF_DELETE: 'DIFF_DELETE',
    DIFF_INSERT: 'DIFF_INSERT',
    DIFF_EQUAL: 'DIFF_EQUAL'
  };

  interface DiffAttributes {
    id: number;
    operation: keyof typeof DiffOperationEnum;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    ChangeId: number;
  }

  class Diff extends Model<DiffAttributes> implements DiffAttributes {
    public id!: number; // using `!` to avoid TypeScript's strict null checking errors
    public operation!: keyof typeof DiffOperationEnum;
    public text!: string;
    public createdAt!: Date; // Sequelize automatically adds it
    public updatedAt!: Date; // Sequelize automatically adds it
    public ChangeId!: number;
  }

Diff.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    operation: {
      type: DataTypes.ENUM,
      values: ['DIFF_DELETE', 'DIFF_INSERT', 'DIFF_EQUAL'],
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'Diff'
  }
);

export default Diff;
