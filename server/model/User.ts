import {
    Model,
    Column,
    Table,
    BelongsToMany,
    HasMany,
    HasOne,
    Scopes,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import { DataTypes, Transaction } from 'sequelize';
import getEnforcer from '../lib/enforcer';
import RoleUser from './RoleUser';
import Role from './Role';
import Shipment from './Shipment';
import Account from './Account';

@Table({ tableName: 'userabcs' })
class User extends Model<User> {
    @Column({
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1
    })
    id!: string;
    @Column({
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    })
    username!: string;
    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    })
    password!: string;
    // public email!: string

    @BelongsToMany(
        () => Role,
        () => RoleUser
    )
    roles?: Role[];

    @HasMany(() => Shipment)
    shipments: Shipment[];

    @HasOne(() => Account, { onDelete: 'CASCADE' })
    account: Account;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    public async isAccountEnough(amount: number): Promise<boolean> {
        const acc = (await this.$get('account')) as Account;
        return acc.amount + amount >= 0;
    }

    public async changeAccount(
        amount: number,
        operation: string,
        t: Transaction
    ) {
        const acc = (await this.$get('account')) as Account;
        acc.amount = acc.amount + amount;
        await acc.save();
    }

    // 返回当前用户的所有角色
    public async getRoles() {
        const e = await getEnforcer();
        // console.log('get user roles by id: ' + this.id)
        const result = await e.getRolesForUser(this.username);
        return result;
    }

    // 返回当前用户的所有可以访问的页面路径
    public async getPagePaths() {
        const e = await getEnforcer();
        // const roles = await e.getRolesForUser(this.username);
        // const result = await e.getPermissionsForUser(roles[0]);
        // 获取当前用户的授权数组
        const perms = await e.getImplicitPermissionsForUser(this.username);
        const result: any[] = [];
        for (const perm of perms) {
            // 动作为*和动作为GET的授权，才是页面访问的路径，其余可能是api路径
            if (perm[2] === 'GET' || perm[2] === '*') {
                result.push(perm[1]);
            }
        }
        return result;
    }
}

export default User;
