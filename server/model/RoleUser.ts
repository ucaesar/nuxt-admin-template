import {
    Model,
    Column,
    Table,
    ForeignKey,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import Role from './Role';
import User from './User';

@Table({ tableName: 'role_users' })
export default class RoleUser extends Model<RoleUser> {
    @ForeignKey(() => Role)
    @Column
    roleId!: string;

    @ForeignKey(() => User)
    @Column
    userId!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}
