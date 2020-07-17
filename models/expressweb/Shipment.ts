import { IAddress, Address } from './Address';
import { IPackage, Package } from './Package';
import { IProduct, Product } from './Product';

export interface IShipment {
    senderAddress: IAddress;
    receiverAddress: IAddress;
    pac: IPackage;
    products: IProduct[] | undefined;
}

export class ShipmentData implements IShipment {
    senderAddress = new Address();
    receiverAddress = new Address();
    pac = new Package();
    products: IProduct[] | undefined = undefined;

    constructor() {
        this.senderAddress.country = 'CA';
    }
}
