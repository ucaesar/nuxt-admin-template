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

@Table({ tableName: 'address' })
class Address extends Model<Address> {
    @Column({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    })
    id!: string;
    
    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default Address;