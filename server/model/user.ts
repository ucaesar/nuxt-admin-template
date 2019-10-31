// const Sequelize = require('sequelize')
// import {Sequelize, UUID, UUIDV1, STRING} from 'sequelize'
import { Model, DataTypes } from 'sequelize'
// import {Entity} from 'sequelizejs-decorators'
import { sequelize } from '../db'
import getEnforcer from '../lib/enforcer'

class User extends Model {
    public id!: string
    public username!: string
    public password!: string

    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    // 返回当前用户的所有角色
    public async getRoles() {
        const e = await getEnforcer()
        // console.log('get user roles by id: ' + this.id)
        const result = await e.getRolesForUser(this.username)
        return result
    }

    // 返回当前用户的所有可以访问的页面路径
    public async getPagePaths() {
        const e = await getEnforcer()
        // const roles = await e.getRolesForUser(this.username);
        // const result = await e.getPermissionsForUser(roles[0]);
        // 获取当前用户的授权数组
        const perms = await e.getImplicitPermissionsForUser(this.username)
        const result: any[] = []
        for (const perm of perms) {
            // 动作为*和动作为GET的授权，才是页面访问的路径，其余可能是api路径
            if (perm[2] === 'GET' || perm[2] === '*') {
                result.push(perm[1])
            }
        }
        return result
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            unique: true,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV1
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        }
    },
    { tableName: 'userabcs', sequelize: sequelize }
)
// const User = sequelize.define('userabc', {
//     id: {
//         type: UUID,
//         unique: true,
//         primaryKey: true,
//         allowNull: false,
//         defaultValue: UUIDV1
//     },
//     username: {
//         type: STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: {
//         type: STRING,
//         unique: false,
//         allowNull: false
//     }
// })

// // 返回当前用户的所有角色
// User.prototype.getRoles = async function() {
//     const e = await getEnforcer()
//     // console.log('get user roles by id: ' + this.id)
//     const result = await e.getRolesForUser(this.username)
//     return result
// }

// 返回当前用户的所有可以访问的页面路径
// User.prototype.getPagePaths = async function() {
//     const e = await getEnforcer()
//     // const roles = await e.getRolesForUser(this.username);
//     // const result = await e.getPermissionsForUser(roles[0]);
//     // 获取当前用户的授权数组
//     const perms = await e.getImplicitPermissionsForUser(this.username)
//     const result: any[] = []
//     for (const perm of perms) {
//         // 动作为*和动作为GET的授权，才是页面访问的路径，其余可能是api路径
//         if (perm[2] === 'GET' || perm[2] === '*') {
//             result.push(perm[1])
//         }
//     }
//     return result
// }

export default User
