import { sequelize } from "../index"
import { DataTypes } from "sequelize"
import Draft  from "./Draft";

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.hasMany(Draft)
Draft.belongsTo(User)


export default User 

