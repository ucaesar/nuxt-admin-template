import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db'

class Role extends Model {
    public id!: string
    public rolename!: string

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },
    { tableName: 'role', sequelize: sequelize }
)

export default Role
