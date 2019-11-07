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

    @HasMany(() => ResourceGroup)
    children!: ResourceGroup[];

    @BelongsTo(() => ResourceGroup)
    parent!: ResourceGroup;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default ResourceGroup;
