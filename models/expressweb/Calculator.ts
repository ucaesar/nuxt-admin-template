import { IAddress, Address } from './Address';

export interface ICalculatorData {
    senderAddress: IAddress;
    receiverAddress: IAddress;
    weight: string | undefined;
}

export class CalculatorData {
    senderAddress = new Address();
    receiverAddress = new Address();
    weight = undefined;

    constructor() {
        this.senderAddress.country = 'CA';
    }
}
