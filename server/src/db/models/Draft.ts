import { sequelize } from "../index"
import { DataTypes, Model } from "sequelize"
import Change  from "./Change";
import Version from "./Version";

interface DraftAttributes {
    id: number,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    UserId: number,
  }

  class Draft extends Model<DraftAttributes> implements DraftAttributes {
    public id!: number; // using `!` to avoid TypeScript's strict null checking errors
    public title!: string;
    public content!: string;
    public createdAt!: Date; // Sequelize automatically adds it
    public updatedAt!: Date; // Sequelize automatically adds it
    public UserId!: number;

    public readonly changes?: Change[]; // for the associated changes return in getDraft queries
    public readonly versions?: Version[]; // for the associated versions return in getDraft queries

  }
  
  Draft.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Draft',
  });

Draft.hasMany(Change);
Change.belongsTo(Draft);

Draft.hasMany(Version);
Version.belongsTo(Draft);

export default Draft