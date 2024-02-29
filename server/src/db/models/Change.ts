import { sequelize } from "../index"
import { DataTypes } from "sequelize"

const Change = sequelize.define('Change', {
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    diffoperation: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    difftext: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default Change 
