import { DataTypes, Model, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize';
import { sequelize } from './index';

interface DraftModel
    extends Model<
        InferAttributes<DraftModel>,
        InferCreationAttributes<DraftModel>
    > {
    id: number;
    title: string;
    content: string;
    User?: NonAttribute<UserModel>;
}

const Draft = sequelize.define<DraftModel>(
    "Draft",
    {
        id: DataTypes.NUMBER,
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
    },
);