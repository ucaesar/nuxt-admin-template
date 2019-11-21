import {
    Model,
    Column,
    Table,
    ForeignKey,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import Role from './Role';

@Table({ tableName: 'role_role' })
class RoleRole extends Model<RoleRole> {
    @ForeignKey(() => Role)
    @Column
    roleId!: number;

    @ForeignKey(() => Role)
    @Column
    parentId!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default RoleRole;