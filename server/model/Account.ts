import {
    Model,
    Column,
    Table,
    ForeignKey,
    BelongsTo,
    HasMany,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Shipment from './AccountHistory';
import User from './User';
import AccountHistory from './AccountHistory';

@Table({ tableName: 'account' })
class Account extends Model<Account> {
    @Column({
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataTypes.NUMBER,
        unique: false,
        allowNull: false
    })
    amount!: number;

    @ForeignKey(() => User)
    @Column
    uid!: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => AccountHistory)
    histories: AccountHistory[];

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}
export default Account;
