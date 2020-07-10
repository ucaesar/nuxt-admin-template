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
        autoIncrement: true
    })
    id!: number;

    // shipper information
    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    shipperPersonName: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    shipperPhoneNumber: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    shipperCompanyName: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    shipperStreetLine1: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    shipperStreetLine2: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    shipperCity: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    shipperStateOrProvinceCode: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    shipperPostalCode: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    shipperCountryCode: string;

    // recipient information
    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    recipientPersonName: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    recipientPhoneNumber: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    recipientCompanyName: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    recipientStreetLine1: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    recipientStreetLine2: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    recipientCity: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    recipientStateOrProvinceCode: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    recipientPostalCode: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    })
    recipientCountryCode: string;

    // service imformation
    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    })
    shipTimestamp: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    })
    dropoffType: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    })
    serviceType: string;

    @Column({
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    })
    packagingType: string;

    @Column({
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
    })
    packageCount: number;

    @HasMany(() => Shipment)
    shipments: Shipment[];
    
    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default ShipmentDetail;
