import {
    Model,
    Column,
    Table,
    ForeignKey,
    HasMany,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Shipment from './Shipment';

@Table({ tableName: 'shipment_detail' })
class ShipmentDetail extends Model<ShipmentDetail> {

    @Column({
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    })
    id!: number;

    // @HasMany(() => Shipment)
    // shipments: Shipment[];
}

export default ShipmentDetail;
