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

@Table({ tableName: 'resource' })
class Resource extends Model<Resource> {
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
    name!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: true
    })
    description!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: true
    })
    url!: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: true
    })
    action!: string;

    // @Column({
    //     type: DataTypes.INTEGER.UNSIGNED,
    //     allowNull: true
    // })
    // parentid!: string;

    // @ForeignKey(() => ResourceGroup)
    // @Column
    // parentid!: string;

    // @HasMany(() => ResourceGroup)
    // children!: ResourceGroup[];

    // @BelongsTo(() => ResourceGroup)
    // parent!: ResourceGroup;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default Resource;
