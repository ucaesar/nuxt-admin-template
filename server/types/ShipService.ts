export interface IRequestedShipment {
    ShipTimestamp: string;
    DropoffType: DropoffType;
    ServiceType: ServiceType;
    PackagingType: PackagingType;
    TotalWeight?: IWeight;
    Shipper: IParty;
    Recipient: IParty;
    ShippingChargesPayment?: IPayment;
    LabelSpecification: ILabelSpecification;
    MasterTrackingId?: ITrackingId;
    PackageCount: number;
    RequestedPackageLineItems: IRequestedPackageLineItem[];
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

export enum LabelFormatType {
    COMMON2D = 'COMMON2D',
    FEDEX_FREIGHT_STRAIGHT_BILL_OF_LADING = 'FEDEX_FREIGHT_STRAIGHT_BILL_OF_LADING',
    LABEL_DATA_ONLY = 'LABEL_DATA_ONLY',
    VICS_BILL_OF_LADING = 'VICS_BILL_OF_LADING'
}

export enum ShippingDocumentImageType {
    DOC = 'DOC',
    EPL2 = 'EPL2',
    PDF = 'PDF',
    PNG = 'PNG',
    RTF = 'RTF',
    TEXT = 'TEXT',
    ZPLII = 'ZPLII'
}

export enum LabelStockType {
    PAPER_4X6 = 'PAPER_4X6',
    PAPER_4X8 = 'PAPER_4X8',
    PAPER_4X9 = 'PAPER_4X9',
    PAPER_7X4 = 'PAPER_7X4.75',
    PAPER_8DOT5X11_BOTTOM_HALF_LABEL = 'PAPER_8.5X11_BOTTOM_HALF_LABEL',
    PAPER_8DOT5X11_TOP_HALF_LABEL = 'PAPER_8.5X11_TOP_HALF_LABEL',
    PAPER_LETTER = 'PAPER_LETTER',
    STOCK_4X6 = 'STOCK_4X6',
    STOCK_4X6DOT75_LEADING_DOC_TAB = 'STOCK_4X6.75_LEADING_DOC_TAB',
    STOCK_4X6DOT75_TRAILING_DOC_TAB = 'STOCK_4X6.75_TRAILING_DOC_TAB',
    STOCK_4X8 = 'STOCK_4X8',
    STOCK_4X9_LEADING_DOC_TAB = 'STOCK_4X9_LEADING_DOC_TAB',
    STOCK_4X9_TRAILING_DOC_TAB = 'STOCK_4X9_TRAILING_DOC_TAB'
}

export enum TrackingIdType {
    EXPRESS = 'EXPRESS',
    FEDEX = 'FEDEX',
    FREIGHT = 'FREIGHT',
    GROUND = 'GROUND',
    USPS = 'USPS'
}

export enum LinearUnits {
    CM = 'CM',
    IN = 'IN'
}

export interface IWeight {
    Units: WeightUnits;
    Value: number;
}

export interface IMoney {
    Currency: string;
    Amount: number;
}

export interface IContact {
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

export interface IAddress {
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

export interface IParty {
    AccountNumber?: string;
    // Tins?: TaxpayerIdentification;
    Contact?: IContact;
    Address?: IAddress;
}

export interface IPayor {
    ResponsibleParty?: IParty;
}

export interface IPayment {
    PaymentType: PaymentType;
    Payor?: IPayor;
}

export interface ILabelSpecification {
    // Dispositions?: ShippingDocumentDispositionDetail;
    LabelFormatType: LabelFormatType;
    ImageType?: ShippingDocumentImageType;
    LabelStockType?: LabelStockType;
    // LabelPrintingOrientation?: LabelPrintingOrientationType;
    // LabelOrder?: LabelOrderType;
    // PrintedLabelOrigin?: ContactAndAddress;
    // CustomerSpecifiedDetail?: CustomerSpecifiedLabelDetail;
}

export interface ITrackingId {
    TrackingIdType?: TrackingIdType;
    FormId?: string;
    UspsApplicationId?: string;
    TrackingNumber?: string;
}

export interface IRequestedPackageLineItem {
    SequenceNumber?: number;
    GroupNumber?: number;
    GroupPackageCount?: number;
    // VariableHandlingChargeDetail?:VariableHandlingChargeDetail;
    InsuredValue?: IMoney;
    Weight?: IWeight;
    Dimensions?: IDimensions;
    ItemDescription?: string;
    ItemDescriptionForClearance?: string;
    // CustomerReferences?:CustomerReference;
    // SpecialServicesRequested?:PackageSpecialServicesRequested;
    // ContentRecords?:ContentRecord;
}

export interface IDimensions {
    Length: number;
    Width: number;
    Height: number;
    Units: LinearUnits;
}
