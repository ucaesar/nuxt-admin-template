export interface IAddress {
    id: string | undefined;
    name: string | undefined;
    phone: string | undefined;
    country: string | undefined;
    province: string | undefined;
    city: string | undefined;
    postcode: string | undefined;
    address: string | undefined;
    address2: string | undefined;
}

export class Address implements IAddress {
    id: string | undefined = undefined;
    name: string | undefined = undefined;
    phone: string | undefined = undefined;
    country: string | undefined = undefined;
    province: string | undefined = undefined;
    city: string | undefined = undefined;
    postcode: string | undefined = undefined;
    address: string | undefined = undefined;
    address2: string | undefined = undefined;

    /* setData({
        name,
        phone,
        country,
        province,
        city,
        postcode,
        address,
        address2
    }) {
        this.name = name;
        this.phone = phone;
        this.country = country;
        this.province = province;
        this.city = city;
        this.postcode = postcode;
        this.address = address;
        this.address2 = address2;
    } */

    setData(address: IAddress) {
        Object.assign(this, address);
    }
}
