export interface IProduct {
    description: string | undefined;
    origin: string | undefined;
    weight: string | undefined;
    quantity: string | undefined;
    unit: string | undefined;
    pricePerUnit: string | undefined;
}

export class Product implements IProduct {
    description: string | undefined = undefined;
    origin: string | undefined = undefined;
    weight: string | undefined = undefined;
    quantity: string | undefined = undefined;
    unit: string | undefined = undefined;
    pricePerUnit: string | undefined = undefined;
}
