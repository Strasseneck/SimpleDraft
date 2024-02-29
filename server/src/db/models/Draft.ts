import { sequelize } from "../index"
import { DataTypes, Model } from "sequelize"
import Change  from "./Change";
// import { DraftType } from "../../controllers/draftController";


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

export default Draft






















// const Draft = sequelize.define<Model<DraftType, DraftType>>('Draft', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false, 
//     },
//     content: {
//         type: DataTypes.TEXT, 
//         allowNull: true,
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     UserId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: { model: 'User', key: 'id'}
//     }
// });

// Draft.hasMany(Change);
// Change.belongsTo(Draft);



// export default Draft 