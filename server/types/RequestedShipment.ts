export interface IRequestedShipment {
    ShipTimestamp: string;
    DropoffType: DropoffType;
    ServiceType: ServiceType;
    PackagingType: PackagingType;
    TotalWeight?: Weight;
    Shipper: Party;
    Recipient: Party;
    ShippingChargesPayment?: Payment;
    // LabelSpecification: LabelSpecification,
    MasterTrackingId?: {};
    PackageCount: number;
    RequestedPackageLineItems: [];
}

export enum DropoffType {
    BUSINESS_SERVICE_CENTER = 'BUSINESS_SERVICE_CENTER',
    DROP_BOX = 'DROP_BOX',
    REGULAR_PICKUP = 'REGULAR_PICKUP',
    REQUEST_COURIER = 'REQUEST_COURIER',
    STATION = 'STATION'
}

export enum ServiceType {
    EUROPE_FIRST_INTERNATIONAL_PRIORITY = 'EUROPE_FIRST_INTERNATIONAL_PRIORITY',
    FEDEX_1_DAY_FREIGHT = 'FEDEX_1_DAY_FREIGHT',
    FEDEX_2_DAY = 'FEDEX_2_DAY',
    FEDEX_2_DAY_AM = 'FEDEX_2_DAY_AM',
    FEDEX_2_DAY_FREIGHT = 'FEDEX_2_DAY_FREIGHT',
    FEDEX_3_DAY_FREIGHT = 'FEDEX_3_DAY_FREIGHT',
    FEDEX_DISTANCE_DEFERRED = 'FEDEX_DISTANCE_DEFERRED',
    FEDEX_EXPRESS_SAVER = 'FEDEX_EXPRESS_SAVER',
    FEDEX_FIRST_FREIGHT = 'FEDEX_FIRST_FREIGHT',
    FEDEX_FREIGHT_ECONOMY = 'FEDEX_FREIGHT_ECONOMY',
    FEDEX_FREIGHT_PRIORITY = 'FEDEX_FREIGHT_PRIORITY',
    FEDEX_GROUND = 'FEDEX_GROUND',
    FEDEX_NEXT_DAY_AFTERNOON = 'FEDEX_NEXT_DAY_AFTERNOON',
    FEDEX_NEXT_DAY_EARLY_MORNING = 'FEDEX_NEXT_DAY_EARLY_MORNING',
    FEDEX_NEXT_DAY_END_OF_DAY = 'FEDEX_NEXT_DAY_END_OF_DAY',
    FEDEX_NEXT_DAY_FREIGHT = 'FEDEX_NEXT_DAY_FREIGHT',
    FEDEX_NEXT_DAY_MID_MORNING = 'FEDEX_NEXT_DAY_MID_MORNING',
    FIRST_OVERNIGHT = 'FIRST_OVERNIGHT',
    GROUND_HOME_DELIVERY = 'GROUND_HOME_DELIVERY',
    INTERNATIONAL_ECONOMY = 'INTERNATIONAL_ECONOMY',
    INTERNATIONAL_ECONOMY_FREIGHT = 'INTERNATIONAL_ECONOMY_FREIGHT',
    INTERNATIONAL_FIRST = 'INTERNATIONAL_FIRST',
    INTERNATIONAL_PRIORITY = 'INTERNATIONAL_PRIORITY',
    INTERNATIONAL_PRIORITY_EXPRESS = 'INTERNATIONAL_PRIORITY_EXPRESS',
    INTERNATIONAL_PRIORITY_FREIGHT = 'INTERNATIONAL_PRIORITY_FREIGHT',
    PRIORITY_OVERNIGHT = 'PRIORITY_OVERNIGHT',
    SAME_DAY = 'SAME_DAY',
    SAME_DAY_CITY = 'SAME_DAY_CITY',
    SMART_POST = 'SMART_POST',
    STANDARD_OVERNIGHT = 'STANDARD_OVERNIGHT'
}

export enum PackagingType {
    FEDEX_10KG_BOX = 'FEDEX_10KG_BOX',
    FEDEX_25KG_BOX = 'FEDEX_25KG_BOX',
    FEDEX_BOX = 'FEDEX_BOX',
    FEDEX_ENVELOPE = 'FEDEX_ENVELOPE',
    FEDEX_EXTRA_LARGE_BOX = 'FEDEX_EXTRA_LARGE_BOX',
    FEDEX_LARGE_BOX = 'FEDEX_LARGE_BOX',
    FEDEX_MEDIUM_BOX = 'FEDEX_MEDIUM_BOX',
    FEDEX_PAK = 'FEDEX_PAK',
    FEDEX_SMALL_BOX = 'FEDEX_SMALL_BOX',
    FEDEX_TUBE = 'FEDEX_TUBE',
    YOUR_PACKAGING = 'YOUR_PACKAGING'
}

export enum WeightUnits {
    KG = 'KG',
    LB = 'LB'
}

export enum PaymentType {
    ACCOUNT = 'ACCOUNT',
    COLLECT = 'COLLECT',
    RECIPIENT = 'RECIPIENT',
    SENDER = 'SENDER',
    THIRD_PARTY = 'THIRD_PARTY'
}

export interface Weight {
    Units: WeightUnits;
    Value: number;
}

export interface Money {
    Currency: string;
    Amount: number;
}

export interface Contact {
    ContactId?: string;
    PersonName?: string;
    Title?: string;
    CompanyName?: string;
    PhoneNumber?: string;
    PhoneExtension?: string;
    TollFreePhoneNumber?: string;
    PagerNumber?: string;
    FaxNumber?: string;
    EMailAddress?: string;
}

export interface Address {
    StreetLines?: string[];
    City?: string;
    StateOrProvinceCode?: string;
    PostalCode?: string;
    UrbanizationCode?: string;
    CountryCode?: string;
    CountryName?: string;
    Residential?: string;
    GeographicCoordinates?: string;
}

export interface Party {
    AccountNumber?: string;
    // Tins?: TaxpayerIdentification;
    Contact?: Contact;
    Address?: Address;
}

export interface Payor {
    ResponsibleParty?: Party;
}

export interface Payment {
    PaymentType: PaymentType;
    Payor?: Payor;
}
