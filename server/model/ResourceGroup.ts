import {
    Model,
    Column,
    Table,
    BelongsToMany,
    Scopes,
    CreatedAt,
    UpdatedAt,
    BelongsTo,
    HasMany,
    ForeignKey
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Resource from './Resource';
import Role from './Role';
import ResourceResourceGroup from './ResourceResourceGroup';
import RoleResourceGroup from './RoleResourceGroup';

@Table({ tableName: 'resource_group' })
class ResourceGroup extends Model<ResourceGroup> {
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
    groupname!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: true
    })
    description!: string;

    // @Column({
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: true
    // })
    // parentid!: string;

    @ForeignKey(() => ResourceGroup)
    @Column
    parentid!: string;

    @HasMany(() => ResourceGroup, { onDelete: 'CASCADE' })
    children!: ResourceGroup[];

    @BelongsTo(() => ResourceGroup)
    parent!: ResourceGroup;

    @BelongsToMany(() => Resource, () => ResourceResourceGroup)
    resources?: Resource[];

    @BelongsToMany(() => Role, () => RoleResourceGroup)
    roles?: Role[];

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default ResourceGroup;
