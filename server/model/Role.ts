import {
    Model,
    Column,
    Table,
    BelongsToMany,
    Scopes,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
// import { sequelize } from '../db'

@Table({tableName:'role'})
class Role extends Model<Role> {
    @Column({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    })
    id!: string

    @Column({
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    })
    rolename!: string

    @CreatedAt
    @Column
    createdAt!: Date

    @UpdatedAt
    @Column
    updatedAt!: Date
}

// Role.init(
//     {
//         id: {
//             type: DataTypes.INTEGER.UNSIGNED,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         username: {
//             type: DataTypes.STRING,
//             unique: true,
//             allowNull: false
//         }
//     },
//     { tableName: 'role', sequelize: sequelize }
// )

export default Role
