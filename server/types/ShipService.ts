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

export interface IProcessShipmentReply {
    HighestSeverity: NotificationSeverityType;
    Notifications: INotification[];
    TransactionDetail?: ITransactionDetail;
    Version: IVersionId;
    JobId?: string;
    CompletedShipmentDetai?: ICompletedShipmentDetail;
    ErrorLabels: IShippingDocument[];
}

export interface INotification {
    Severity: NotificationSeverityType;
    Source: string;
    Code?: string;
    Message?: string;
    LocalizedMessage?: string;
    MessageParameters: INotificationParameter[];
}

export interface INotificationParameter {
    Id?: string;
    Value?: string;
}

export interface ITransactionDetail {
    CustomerTransactionId?: string;
    Localization?: ILocalization;
}

export interface ILocalization {
    LanguageCode: string;
    LocaleCode?: string;
}

export interface IVersionId {
    ServiceId: string;
    Major: number;
    Intermediate: number;
    Minor: number;
}

export interface ICompletedShipmentDetail {
    UsDomestic?: boolean;
    CarrierCode?: CarrierCodeType;
    MasterTrackingId?: ITrackingId;
    ServiceTypeDescription?: string;
    PackagingDescription?: string;
    // OperationalDetail?: ShipmentOperationalDetail;
    // AccessDetail?: PendingShipmentAccessDetail;
    // TagDetail?: CompletedTagDetail;
    // SmartPostDetail?: CompletedSmartPostDetail;
    // HazardousShipmentDetail?: CompletedHazardousShipmentDetail;
    ShipmentRating?: IShipmentRating;
    // CompletedHoldAtLocationDetail?: CompletedHoldAtLocationDetail;
    ExportComplianceStatement?: string;
    // DocumentRequirements?: DocumentRequirementsDetail;
    // CompletedEtdDetail?: CompletedEtdDetail;
    ShipmentDocuments: IShippingDocument[];
    // AssociatedShipments: AssociatedShipmentDetail[];
    // CompletedCodDetail?: CompletedCodDetail;
    // CompletedPackageDetails: CompletedPackageDetail[];
}

export interface IShipmentRating {
    ActualRateType?: ReturnedRateType;
    EffectiveNetDiscount?: IMoney;
    ShipmentRateDetails: IShipmentRateDetail[];
}

export interface IShipmentRateDetail {
    RateType?: ReturnedRateType;
    RateScale?: string;
    RateZone?: string;
    PricingCode?: PricingCodeType;
    RatedWeightMethod?: RatedWeightMethod;
    MinimumChargeType?: MinimumChargeType;
    CurrencyExchangeRate?: ICurrencyExchangeRate;
    SpecialRatingApplied: SpecialRatingAppliedType[];
    DimDivisor?: number;
    DimDivisorType?: RateDimensionalDivisorType;
    FuelSurchargePercent?: number;
    TotalBillingWeight?: IWeight;
    TotalDimWeight?: IWeight;
    TotalBaseCharge?: IMoney;
    TotalFreightDiscounts?: IMoney;
    TotalNetFreight?: IMoney;
    TotalSurcharges?: IMoney;
    TotalNetFedExCharge?: IMoney;
    TotalTaxes?: IMoney;
    TotalNetCharge?: IMoney;
    TotalRebates?: IMoney;
    TotalDutiesAndTaxes?: IMoney;
    TotalAncillaryFeesAndTaxes?: IMoney;
    TotalDutiesTaxesAndFees?: IMoney;
    TotalNetChargeWithDutiesAndTaxes?: IMoney;
    ShipmentLegRateDetails: IShipmentLegRateDetail[];
    //   <xs:element name="FreightRateDetail" type="ns:FreightRateDetail" minOccurs="0">
    FreightDiscounts: IRateDiscount[];
    Rebates: IRebate[];
    Surcharges: ISurcharge[];
    Taxes: ITax[];
    DutiesAndTaxes: IEdtCommodityTax[];
    AncillaryFeesAndTaxes: IAncillaryFeeAndTax[];
    VariableHandlingCharges?: IVariableHandlingCharges;
    TotalVariableHandlingCharges?: IVariableHandlingCharges;
}

export interface ICurrencyExchangeRate {
    FromCurrency?: string;
    IntoCurrency?: string;
    Rate?: number;
}

export interface IRateDiscount {
    RateDiscountType?: RateDiscountType;
    Description?: string;
    Amount?: IMoney;
    Percent?: number;
}

export interface IRebate {
    RebateType?: RebateType;
    Description?: string;
    Amount?: IMoney;
    Percent?: number;
}

export interface ISurcharge {
    SurchargeType?: SurchargeType;
    Level?: SurchargeLevelType;
    Description?: string;
    Amount: IMoney;
}

export interface ITax {
    TaxType?: TaxType;
    Description?: string;
    Amount?: IMoney;
}

export interface IEdtCommodityTax {
    HarmonizedCode?: string;
    Taxes: IEdtTaxDetail[];
}

export interface IAncillaryFeeAndTax {
    Type?: AncillaryFeeAndTaxType;
    Description?: string;
    Amount?: IMoney;
}

export interface IEdtTaxDetail {
    TaxType?: EdtTaxType;
    EffectiveDate?: Date;
    Name?: string;
    TaxableValue?: IMoney;
    Description?: string;
    Formula?: string;
    Amount?: IMoney;
}

export interface IVariableHandlingCharges {
    VariableHandlingCharge?: IMoney;
    FixedVariableHandlingCharge?: IMoney;
    PercentVariableHandlingCharge?: IMoney;
    TotalCustomerCharge?: IMoney;
}

export interface IShipmentLegRateDetail {
    //   <xs:element name="LegDescription" type="xs:string" minOccurs="0">
    //   <xs:element name="LegOrigin" type="ns:Address" minOccurs="0">
    //   <xs:element name="LegOriginLocationId" type="xs:string" minOccurs="0">
    //   <xs:element name="LegDestination" type="ns:Address" minOccurs="0">
    //   <xs:element name="LegDestinationLocationId" type="xs:string" minOccurs="0">
    RateType?: ReturnedRateType;
    RateScale?: string;
    RateZone?: string;
    PricingCode?: PricingCodeType;
    RatedWeightMethod?: RatedWeightMethod;
    MinimumChargeType?: MinimumChargeType;
    CurrencyExchangeRate?: ICurrencyExchangeRate;
    SpecialRatingApplied: SpecialRatingAppliedType[];
    DimDivisor?: number;
    DimDivisorType?: RateDimensionalDivisorType;
    FuelSurchargePercent?: number;
    TotalBillingWeight?: IWeight;
    TotalDimWeight?: IWeight;
    TotalBaseCharge?: IMoney;
    TotalFreightDiscounts?: IMoney;
    TotalNetFreight?: IMoney;
    TotalSurcharges?: IMoney;
    TotalNetFedExCharge?: IMoney;
    TotalTaxes?: IMoney;
    TotalNetCharge?: IMoney;
    TotalRebates?: IMoney;
    TotalDutiesAndTaxes?: IMoney;
    TotalNetChargeWithDutiesAndTaxes?: IMoney;
    //   <xs:element name="FreightRateDetail" type="ns:FreightRateDetail" minOccurs="0">
    FreightDiscounts: IRateDiscount[];
    Rebates: IRebate[];
    Surcharges: ISurcharge[];
    Taxes: ITax[];
    DutiesAndTaxes: IEdtCommodityTax[];
    VariableHandlingCharges?: IVariableHandlingCharges;
    TotalVariableHandlingCharges?: IVariableHandlingCharges;
}

export interface IShippingDocument {
    Type?: ReturnedShippingDocumentType;
    Localizations: ILocalization[];
    Grouping?: ShippingDocumentGroupingType;
    ShippingDocumentDisposition?: ShippingDocumentDispositionType;
    AccessReference?: string;
    ImageType?: ShippingDocumentImageType;
    Resolution: number;
    CopiesToPrint: number;
    Parts: IShippingDocumentPart[];
}

export interface IShippingDocumentPart {
    DocumentPartSequenceNumber?: number;
    Image?: string; // base64Binary
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

export enum NotificationSeverityType {
    ERROR = 'ERROR',
    FAILURE = 'FAILURE',
    NOTE = 'NOTE',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING'
}

export enum ReturnedShippingDocumentType {
    AUXILIARY_LABEL = 'AUXILIARY_LABEL',
    CERTIFICATE_OF_ORIGIN = 'CERTIFICATE_OF_ORIGIN',
    COD_AND_DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN_2_D_BARCODE = 'COD_AND_DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN_2_D_BARCODE',
    COD_AND_DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN_LABEL = 'COD_AND_DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN_LABEL',
    COD_RETURN_2_D_BARCODE = 'COD_RETURN_2_D_BARCODE',
    COD_RETURN_LABEL = 'COD_RETURN_LABEL',
    COMMERCIAL_INVOICE = 'COMMERCIAL_INVOICE',
    CUSTOM_PACKAGE_DOCUMENT = 'CUSTOM_PACKAGE_DOCUMENT',
    CUSTOM_SHIPMENT_DOCUMENT = 'CUSTOM_SHIPMENT_DOCUMENT',
    DANGEROUS_GOODS_SHIPPERS_DECLARATION = 'DANGEROUS_GOODS_SHIPPERS_DECLARATION',
    DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN_2_D_BARCODE = 'DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN_2_D_BARCODE',
    DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN_LABEL = 'DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN_LABEL',
    ETD_LABEL = 'ETD_LABEL',
    EXPORT_DECLARATION = 'EXPORT_DECLARATION',
    FREIGHT_ADDRESS_LABEL = 'FREIGHT_ADDRESS_LABEL',
    GENERAL_AGENCY_AGREEMENT = 'GENERAL_AGENCY_AGREEMENT',
    GROUND_BARCODE = 'GROUND_BARCODE',
    NAFTA_CERTIFICATE_OF_ORIGIN = 'NAFTA_CERTIFICATE_OF_ORIGIN',
    OP_900 = 'OP_900',
    OUTBOUND_2_D_BARCODE = 'OUTBOUND_2_D_BARCODE',
    OUTBOUND_LABEL = 'OUTBOUND_LABEL',
    PRO_FORMA_INVOICE = 'PRO_FORMA_INVOICE',
    RECIPIENT_ADDRESS_BARCODE = 'RECIPIENT_ADDRESS_BARCODE',
    RECIPIENT_POSTAL_BARCODE = 'RECIPIENT_POSTAL_BARCODE',
    RETURN_INSTRUCTIONS = 'RETURN_INSTRUCTIONS',
    TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
    USPS_BARCODE = 'USPS_BARCODE'
}

export enum ShippingDocumentGroupingType {
    CONSOLIDATED_BY_DOCUMENT_TYPE = 'CONSOLIDATED_BY_DOCUMENT_TYPE',
    INDIVIDUAL = 'INDIVIDUAL'
}

export enum ShippingDocumentDispositionType {
    DEFERRED_STORED = 'DEFERRED_STORED',
    EMAILED = 'EMAILED',
    QUEUED = 'QUEUED',
    RETURNED = 'RETURNED',
    STORED = 'STORED'
}

export enum CarrierCodeType {
    FDXC = 'FDXC',
    FDXE = 'FDXE',
    FDXG = 'FDXG',
    FXCC = 'FXCC',
    FXFR = 'FXFR',
    FXSP = 'FXSP'
}

export enum ReturnedRateType {
    INCENTIVE = 'INCENTIVE',
    NEGOTIATED = 'NEGOTIATED',
    PAYOR_ACCOUNT_PACKAGE = 'PAYOR_ACCOUNT_PACKAGE',
    PAYOR_ACCOUNT_SHIPMENT = 'PAYOR_ACCOUNT_SHIPMENT',
    PAYOR_LIST_PACKAGE = 'PAYOR_LIST_PACKAGE',
    PAYOR_LIST_SHIPMENT = 'PAYOR_LIST_SHIPMENT',
    PREFERRED_ACCOUNT_PACKAGE = 'PREFERRED_ACCOUNT_PACKAGE',
    PREFERRED_ACCOUNT_SHIPMENT = 'PREFERRED_ACCOUNT_SHIPMENT',
    PREFERRED_LIST_PACKAGE = 'PREFERRED_LIST_PACKAGE',
    PREFERRED_LIST_SHIPMENT = 'PREFERRED_LIST_SHIPMENT',
    PREFERRED_NEGOTIATED = 'PREFERRED_NEGOTIATED'
}

export enum PricingCodeType {
    ACTUAL = 'ACTUAL',
    ALTERNATE = 'ALTERNATE',
    BASE = 'BASE',
    HUNDREDWEIGHT = 'HUNDREDWEIGHT',
    HUNDREDWEIGHT_ALTERNATE = 'HUNDREDWEIGHT_ALTERNATE',
    INTERNATIONAL_DISTRIBUTION = 'INTERNATIONAL_DISTRIBUTION',
    INTERNATIONAL_ECONOMY_SERVICE = 'INTERNATIONAL_ECONOMY_SERVICE',
    LTL_FREIGHT = 'LTL_FREIGHT',
    PACKAGE = 'PACKAGE',
    SHIPMENT = 'SHIPMENT',
    SHIPMENT_FIVE_POUND_OPTIONAL = 'SHIPMENT_FIVE_POUND_OPTIONAL',
    SHIPMENT_OPTIONAL = 'SHIPMENT_OPTIONAL',
    SPECIAL = 'SPECIAL'
}

export enum MinimumChargeType {
    CUSTOMER = 'CUSTOMER',
    CUSTOMER_FREIGHT_WEIGHT = 'CUSTOMER_FREIGHT_WEIGHT',
    EARNED_DISCOUNT = 'EARNED_DISCOUNT',
    MIXED = 'MIXED',
    RATE_SCALE = 'RATE_SCALE'
}

export enum SpecialRatingAppliedType {
    FEDEX_ONE_RATE = 'FEDEX_ONE_RATE',
    FIXED_FUEL_SURCHARGE = 'FIXED_FUEL_SURCHARGE',
    IMPORT_PRICING = 'IMPORT_PRICING'
}

export enum RateDimensionalDivisorType {
    COUNTRY = 'COUNTRY',
    CUSTOMER = 'CUSTOMER',
    OTHER = 'OTHER',
    PRODUCT = 'PRODUCT',
    WAIVED = 'WAIVED'
}

export enum RatedWeightMethod {
    ACTUAL = 'ACTUAL',
    AVERAGE_PACKAGE_WEIGHT_MINIMUM = 'AVERAGE_PACKAGE_WEIGHT_MINIMUM',
    BALLOON = 'BALLOON',
    DEFAULT_WEIGHT_APPLIED = 'DEFAULT_WEIGHT_APPLIED',
    DIM = 'DIM',
    FREIGHT_MINIMUM = 'FREIGHT_MINIMUM',
    MIXED = 'MIXED',
    OVERSIZE = 'OVERSIZE',
    OVERSIZE_1 = 'OVERSIZE_1',
    OVERSIZE_2 = 'OVERSIZE_2',
    OVERSIZE_3 = 'OVERSIZE_3',
    PACKAGING_MINIMUM = 'PACKAGING_MINIMUM',
    WEIGHT_BREAK = 'WEIGHT_BREAK'
}

export enum RateDiscountType {
    BONUS = 'BONUS',
    COUPON = 'COUPON',
    EARNED = 'EARNED',
    INCENTIVE = 'INCENTIVE',
    OTHER = 'OTHER',
    VOLUME = 'VOLUME'
}

export enum RebateType {
    BONUS = 'BONUS',
    EARNED = 'EARNED',
    OTHER = 'OTHER'
}

export enum SurchargeType {
    ACCOUNT_NUMBER_PROCESSING_FEE = 'ACCOUNT_NUMBER_PROCESSING_FEE',
    ADDITIONAL_HANDLING = 'ADDITIONAL_HANDLING',
    ADDRESS_CORRECTION = 'ADDRESS_CORRECTION',
    ANCILLARY_FEE = 'ANCILLARY_FEE',
    APPOINTMENT_DELIVERY = 'APPOINTMENT_DELIVERY',
    BROKER_SELECT_OPTION = 'BROKER_SELECT_OPTION',
    CANADIAN_DESTINATION = 'CANADIAN_DESTINATION',
    CLEARANCE_ENTRY_FEE = 'CLEARANCE_ENTRY_FEE',
    COD = 'COD',
    CUT_FLOWERS = 'CUT_FLOWERS',
    DANGEROUS_GOODS = 'DANGEROUS_GOODS',
    DELIVERY_AREA = 'DELIVERY_AREA',
    DELIVERY_CONFIRMATION = 'DELIVERY_CONFIRMATION',
    DELIVERY_ON_INVOICE_ACCEPTANCE = 'DELIVERY_ON_INVOICE_ACCEPTANCE',
    DOCUMENTATION_FEE = 'DOCUMENTATION_FEE',
    DRY_ICE = 'DRY_ICE',
    EMAIL_LABEL = 'EMAIL_LABEL',
    EUROPE_FIRST = 'EUROPE_FIRST',
    EXCESS_VALUE = 'EXCESS_VALUE',
    EXHIBITION = 'EXHIBITION',
    EXPORT = 'EXPORT',
    EXTRA_SURFACE_HANDLING_CHARGE = 'EXTRA_SURFACE_HANDLING_CHARGE',
    EXTREME_LENGTH = 'EXTREME_LENGTH',
    FEDEX_INTRACOUNTRY_FEES = 'FEDEX_INTRACOUNTRY_FEES',
    FEDEX_TAG = 'FEDEX_TAG',
    FICE = 'FICE',
    FLATBED = 'FLATBED',
    FREIGHT_GUARANTEE = 'FREIGHT_GUARANTEE',
    FREIGHT_ON_VALUE = 'FREIGHT_ON_VALUE',
    FREIGHT_TO_COLLECT = 'FREIGHT_TO_COLLECT',
    FUEL = 'FUEL',
    HOLD_AT_LOCATION = 'HOLD_AT_LOCATION',
    HOME_DELIVERY_APPOINTMENT = 'HOME_DELIVERY_APPOINTMENT',
    HOME_DELIVERY_DATE_CERTAIN = 'HOME_DELIVERY_DATE_CERTAIN',
    HOME_DELIVERY_EVENING = 'HOME_DELIVERY_EVENING',
    INSIDE_DELIVERY = 'INSIDE_DELIVERY',
    INSIDE_PICKUP = 'INSIDE_PICKUP',
    INSURED_VALUE = 'INSURED_VALUE',
    INTERHAWAII = 'INTERHAWAII',
    LIFTGATE_DELIVERY = 'LIFTGATE_DELIVERY',
    LIFTGATE_PICKUP = 'LIFTGATE_PICKUP',
    LIMITED_ACCESS_DELIVERY = 'LIMITED_ACCESS_DELIVERY',
    LIMITED_ACCESS_PICKUP = 'LIMITED_ACCESS_PICKUP',
    METRO_DELIVERY = 'METRO_DELIVERY',
    METRO_PICKUP = 'METRO_PICKUP',
    NON_MACHINABLE = 'NON_MACHINABLE',
    OFFSHORE = 'OFFSHORE',
    ON_CALL_PICKUP = 'ON_CALL_PICKUP',
    ON_DEMAND_CARE = 'ON_DEMAND_CARE',
    OTHER = 'OTHER',
    OUT_OF_DELIVERY_AREA = 'OUT_OF_DELIVERY_AREA',
    OUT_OF_PICKUP_AREA = 'OUT_OF_PICKUP_AREA',
    OVERSIZE = 'OVERSIZE',
    OVER_DIMENSION = 'OVER_DIMENSION',
    PIECE_COUNT_VERIFICATION = 'PIECE_COUNT_VERIFICATION',
    PRE_DELIVERY_NOTIFICATION = 'PRE_DELIVERY_NOTIFICATION',
    PRIORITY_ALERT = 'PRIORITY_ALERT',
    PROTECTION_FROM_FREEZING = 'PROTECTION_FROM_FREEZING',
    REGIONAL_MALL_DELIVERY = 'REGIONAL_MALL_DELIVERY',
    REGIONAL_MALL_PICKUP = 'REGIONAL_MALL_PICKUP',
    REROUTE = 'REROUTE',
    RESCHEDULE = 'RESCHEDULE',
    RESIDENTIAL_DELIVERY = 'RESIDENTIAL_DELIVERY',
    RESIDENTIAL_PICKUP = 'RESIDENTIAL_PICKUP',
    RETURN_LABEL = 'RETURN_LABEL',
    SATURDAY_DELIVERY = 'SATURDAY_DELIVERY',
    SATURDAY_PICKUP = 'SATURDAY_PICKUP',
    SIGNATURE_OPTION = 'SIGNATURE_OPTION',
    TARP = 'TARP',
    THIRD_PARTY_CONSIGNEE = 'THIRD_PARTY_CONSIGNEE',
    TRANSMART_SERVICE_FEE = 'TRANSMART_SERVICE_FEE'
}

export enum SurchargeLevelType {
    PACKAGE = 'PACKAGE',
    SHIPMENT = 'SHIPMENT'
}

export enum TaxType {
    EXPORT = 'EXPORT',
    GST = 'GST',
    HST = 'HST',
    INTRACOUNTRY = 'INTRACOUNTRY',
    OTHER = 'OTHER',
    PST = 'PST',
    VAT = 'VAT'
}

export enum EdtTaxType {
    ADDITIONAL_TAXES = 'ADDITIONAL_TAXES',
    CONSULAR_INVOICE_FEE = 'CONSULAR_INVOICE_FEE',
    CUSTOMS_SURCHARGES = 'CUSTOMS_SURCHARGES',
    DUTY = 'DUTY',
    EXCISE_TAX = 'EXCISE_TAX',
    FOREIGN_EXCHANGE_TAX = 'FOREIGN_EXCHANGE_TAX',
    GENERAL_SALES_TAX = 'GENERAL_SALES_TAX',
    IMPORT_LICENSE_FEE = 'IMPORT_LICENSE_FEE',
    INTERNAL_ADDITIONAL_TAXES = 'INTERNAL_ADDITIONAL_TAXES',
    INTERNAL_SENSITIVE_PRODUCTS_TAX = 'INTERNAL_SENSITIVE_PRODUCTS_TAX',
    OTHER = 'OTHER',
    SENSITIVE_PRODUCTS_TAX = 'SENSITIVE_PRODUCTS_TAX',
    STAMP_TAX = 'STAMP_TAX',
    STATISTICAL_TAX = 'STATISTICAL_TAX',
    TRANSPORT_FACILITIES_TAX = 'TRANSPORT_FACILITIES_TAX'
}

export enum AncillaryFeeAndTaxType {
    CLEARANCE_ENTRY_FEE = 'CLEARANCE_ENTRY_FEE',
    GOODS_AND_SERVICES_TAX = 'GOODS_AND_SERVICES_TAX',
    HARMONIZED_SALES_TAX = 'HARMONIZED_SALES_TAX',
    OTHER = 'OTHER'
}
