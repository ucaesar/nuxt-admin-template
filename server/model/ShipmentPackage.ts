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
import Shipment from './Shipment';

@Table({ tableName: 'shipment_package' })
class ShipmentPackage extends Model<ShipmentPackage> {
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
        allowNull: true
    })
    sequenceNumber: number;

    @Column({
        type: DataTypes.NUMBER,
        unique: false,
        allowNull: true
    })
    groupNumber: number;

    @Column({
        type: DataTypes.NUMBER,
        unique: false,
        allowNull: true
    })
    groupPackageCount: number;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    weightUnits: string;

    @Column({
        type: DataTypes.NUMBER,
        unique: false,
        allowNull: true
    })
    weight: number;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    linearUnits: string;

    @Column({
        type: DataTypes.NUMBER,
        unique: false,
        allowNull: true
    })
    length: number;

    @Column({
        type: DataTypes.NUMBER,
        unique: false,
        allowNull: true
    })
    width: number;

    @Column({
        type: DataTypes.NUMBER,
        unique: false,
        allowNull: true
    })
    height: number;

    @ForeignKey(() => Shipment)
    @Column
    trackno!: string;

    @BelongsTo(() => Shipment)
    shipment: Shipment;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}
export default ShipmentPackage;
