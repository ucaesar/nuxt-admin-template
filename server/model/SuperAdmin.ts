// const Sequelize = require('sequelize')
import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'
import getEnforcer from '../lib/enforcer'

class SuperAdmin extends Model {
    public id!: string
    public username!: string
    public password!: string

    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    // 返回当前用户的所有角色
    public async getRoles() {
        const e = await getEnforcer()
        // console.log('get superadmin roles by id: ' + this.id)
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
        const result: string[] = []
        for (const perm of perms) {
            // 动作为*和动作为GET的授权，才是页面访问的路径，其余可能是api路径
            if (perm[2] === 'GET' || perm[2] === '*') {
                result.push(perm[1] as string)
            }
        }
        return result
    }
}

SuperAdmin.init(
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
    { tableName: 'superadmins', sequelize: sequelize }
)
// const SuperAdmin = sequelize.define('superadmin', {
//     id: {
//         type: Sequelize.UUID,
//         unique: true,
//         primaryKey: true,
//         allowNull: false,
//         defaultValue: Sequelize.UUIDV1
//     },
//     username: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         unique: false,
//         allowNull: false
//     }
// })

// // 下面两个方法与User相同代码重复，后期重构
// SuperAdmin.prototype.getRoles = async function() {
//     const e = await getEnforcer()
//     // console.log('get superadmin roles by id: ' + this.id)
//     const result = await e.getRolesForUser(this.username)
//     return result
// }

// // 返回当前用户的所有可以访问的页面路径
// SuperAdmin.prototype.getPagePaths = async function() {
//     const e = await getEnforcer()
//     // const roles = await e.getRolesForUser(this.username);
//     // const result = await e.getPermissionsForUser(roles[0]);
//     // 获取当前用户的授权数组
//     const perms = await e.getImplicitPermissionsForUser(this.username)
//     const result: string[] = []
//     for (const perm of perms) {
//         // 动作为*和动作为GET的授权，才是页面访问的路径，其余可能是api路径
//         if (perm[2] === 'GET' || perm[2] === '*') {
//             result.push(perm[1] as string)
//         }
//     }
//     return result
// }

export default SuperAdmin
