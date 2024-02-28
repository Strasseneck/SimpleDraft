import { Table, Column, Model, HasMany, HasOne } from 'sequelize-typescript';
import { sequelize } from './index';

@Table
class Draft extends Model {
    @Column
    id!: number;

    @Column
    title!: string;

    @Column
    content!: string;

    @HasOne (() => User )
    author!: User;

    @HasMany (() =>  Change)
    changes!: Change[];
}