import {
    Model,
    Column,
    Table,
    ForeignKey
} from 'sequelize-typescript';
import Role from './Role';

@Table
export class RoleUser extends Model<RoleUser> {
    @ForeignKey(()=> Role)
    @Column
    roleId!: number
} 