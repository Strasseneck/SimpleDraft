import { sequelize } from "../index"
import { DataTypes, Model } from "sequelize"
import Diff from "./Diff"
import Patch from "./Patch"

interface ChangeAttributes {
    id: number,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    DraftId: number,
}

class Change extends Model<ChangeAttributes> implements ChangeAttributes {
    public id!: number; // using `!` to avoid TypeScript's strict null checking errors
    public description!: string;
    public createdAt!: Date; // Sequelize automatically adds it
    public updatedAt!: Date; // Sequelize automatically adds it
    public DraftId!: number;

    public readonly patches?: Patch[]; // for patches that can apply the change
}

Change.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
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
    DraftId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Change',
});

Change.hasMany(Patch, { constraints: true, onDelete: 'CASCADE'});
Patch.belongsTo(Change);

export default Change 
