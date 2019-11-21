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
    roleId!: string;

    @ForeignKey(() => Role)
    @Column
    parentId!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default RoleRole;