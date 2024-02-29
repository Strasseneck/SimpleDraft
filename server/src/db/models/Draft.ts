import { sequelize } from "../index"
import { DataTypes } from "sequelize"
import Change  from "./Change";
import User from "./User";

const Draft = sequelize.define('Draft', {
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    content: {
        type: DataTypes.TEXT, 
        allowNull: true,
    }
});



Draft.hasMany(Change);
Change.belongsTo(Draft);



export default Draft 