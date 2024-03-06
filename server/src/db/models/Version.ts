import { sequelize } from "../index"
import { DataTypes, Model } from "sequelize"


interface VersionAttributes {
    id?: number,
    content: string,
    createdAt?: Date,
    updatedAt?: Date,
    DraftId: number,
    ChangeId: number,
}


class Version extends Model<VersionAttributes> implements VersionAttributes {
    public id!: number; // using `!` to avoid TypeScript's strict null checking errors
    public title!: string;
    public content!: string;
    public createdAt!: Date; // Sequelize automatically adds it
    public updatedAt!: Date; // Sequelize automatically adds it
    DraftId!: number;
    ChangeId!: number;
}


Version.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    content: {
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
    ChangeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Version',
});



export default Version