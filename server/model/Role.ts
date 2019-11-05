import {
    Model,
    Column,
    Table,
    BelongsToMany,
    Scopes,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './User';
import RoleUser from './RoleUser';
// import { sequelize } from '../db'

@Table({ tableName: 'role' })
class Role extends Model<Role> {
    @Column({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    })
    id!: string;

    @Column({
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    })
    rolename!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: true
    })
    description!: string;

    @BelongsToMany(() => User, () => RoleUser)
    users?: User[];

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default Role;
