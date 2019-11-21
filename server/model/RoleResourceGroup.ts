import {
    Model,
    Column,
    Table,
    ForeignKey,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import Role from './Role';
import ResourceGroup from './ResourceGroup';

@Table({ tableName: 'role_resource_group' })
class RoleResourceGroup extends Model<RoleResourceGroup> {
    @ForeignKey(() => Role)
    @Column
    roleId!: number;

    @ForeignKey(() => ResourceGroup)
    @Column
    resourceGroupId!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default RoleResourceGroup;