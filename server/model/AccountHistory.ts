import {
    Model,
    Column,
    Table,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
    AllowNull
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Account from './Account';

@Table({ tableName: 'account_history' })
class AccountHistory extends Model<AccountHistory> {
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

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    })
    operation!: string;

    @ForeignKey(() => Account)
    @Column
    accountId!: number;

    @BelongsTo(() => Account)
    account: Account;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}
export default AccountHistory;
