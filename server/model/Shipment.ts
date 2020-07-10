import {
    Model,
    Column,
    Table,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './User';
import ShipmentDetail from './ShipmentDetail';

@Table({ tableName: 'shipment' })
class Shipment extends Model<Shipment> {
    @Column({
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false
    })
    trackno!: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    })
    image!: string;

    @Column({
        type: DataTypes.JSON,
        unique: false,
        allowNull: true
    })
    fee!: string;

    @ForeignKey(() => User)
    @Column
    userId!: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => ShipmentDetail)
    @Column
    detailId!: number;

    @BelongsTo(() => ShipmentDetail)
    shipmentDetail: ShipmentDetail;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default Shipment;
