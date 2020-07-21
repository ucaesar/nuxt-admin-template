export interface IRequestedShipment {
    ShipTimestamp: string;
    DropoffType: DropoffType;
    ServiceType: ServiceType;
    PackagingType: PackagingType;
    // <xs:element name="ManifestDetail" type="ns:ShipmentManifestDetail" minOccurs="0">
    TotalWeight?: IWeight;
    // <xs:element name="TotalInsuredValue" type="ns:Money" minOccurs="0">
    PreferredCurrency?:string;
    // <xs:element name="ShipmentAuthorizationDetail" type="ns:ShipmentAuthorizationDetail" minOccurs="0">
    Shipper: IParty;
    Recipient: IParty;
    // <xs:element name="RecipientLocationNumber" type="xs:string" minOccurs="0"/>
    // <xs:element name="Origin" type="ns:ContactAndAddress" minOccurs="0">
    // <xs:element name="SoldTo" type="ns:Party" minOccurs="0"/>
    ShippingChargesPayment?: IPayment;
    // <xs:element name="SpecialServicesRequested" type="ns:ShipmentSpecialServicesRequested" minOccurs="0"/>
    // <xs:element name="ExpressFreightDetail" type="ns:ExpressFreightDetail" minOccurs="0"/>
    // <xs:element name="FreightShipmentDetail" type="ns:FreightShipmentDetail" minOccurs="0">
    // <xs:element name="DeliveryInstructions" type="xs:string" minOccurs="0">
    // <xs:element name="VariableHandlingChargeDetail" type="ns:VariableHandlingChargeDetail" minOccurs="0"/>
    // <xs:element name="CustomsClearanceDetail" type="ns:CustomsClearanceDetail" minOccurs="0">
    // <xs:element name="PickupDetail" type="ns:PickupDetail" minOccurs="0">
    // <xs:element name="SmartPostDetail" type="ns:SmartPostShipmentDetail" minOccurs="0">
    // <xs:element name="BlockInsightVisibility" type="xs:boolean" minOccurs="0">
    // <xs:element name="ShippingDocumentSpecification" type="ns:ShippingDocumentSpecification" minOccurs="0">
    RateRequestTypes?:RateRequestType[];
    // <xs:element name="EdtRequestType" type="ns:EdtRequestType" minOccurs="0">
    LabelSpecification: ILabelSpecification;
    MasterTrackingId?: ITrackingId;
    PackageCount: number;
    // <xs:element name="ConfigurationData" type="ns:ShipmentConfigurationData" minOccurs="0">
    RequestedPackageLineItems: IRequestedPackageLineItem[];
}

export interface IProcessShipmentRequest {
    WebAuthenticationDetail: IWebAuthenticationDetail;
    ClientDetail: IClientDetail;
    TransactionDetail?: ITransactionDetail;
    Version: IVersionId;
    RequestedShipment: IRequestedShipment;
}

export interface IRateRequest {
    WebAuthenticationDetail: IWebAuthenticationDetail;
    ClientDetail: IClientDetail;
    TransactionDetail?: ITransactionDetail;
    Version: IVersionId;
    ReturnTransitAndCommit?: boolean;
    CarrierCodes: CarrierCodeType[];
    VariableOptions: ServiceOptionType[];
    ConsolidationKey?: IConsolidationKey;
    RequestedShipment?: IRequestedShipment;
}

export interface IRateReply {
    HighestSeverity: NotificationSeverityType;
    Notifications: INotification[];
    TransactionDetail: ITransactionDetail;
    Version: IVersionId;
    RateReplyDetails: IRateReplyDetail[];
}

export interface IConsolidationKey {
    Type?: ConsolidationType;
    Index?: string;
    Date?: Date;
}

export interface IRateReplyDetail {
    ServiceType?: ServiceType;
    ServiceDescription?: IServiceDescription;
    PackagingType?: PackagingType;
    AppliedOptions: ServiceOptionType[];
    AppliedSubOptions?: IServiceSubOptionDetail;
    DeliveryStation?: string;
    DeliveryDayOfWeek?: DayOfWeekType;
    DeliveryTimestamp?: string;
    CommitDetails: ICommitDetail[];
    DestinationAirportId?: string;
    IneligibleForMoneyBackGuarantee?: boolean;
    OriginServiceArea?: string;
    DestinationServiceArea?: string;
    TransitTime?: TransitTimeType;
    MaximumTransitTime?: TransitTimeType;
    SignatureOption?: SignatureOptionType;
    ActualRateType?: ReturnedRateType;
    RatedShipmentDetails: IRatedShipmentDetail[];
}

export interface IServiceDescription {
    ServiceType?: ServiceType;
    Code?: string;
    Names: IProductName[];
    Description?: string;
    AstraDescription?: string;
}

export interface IProductName {
    Type?: string;
    Encoding?: string;
    Value?: string;
}

export interface IServiceSubOptionDetail {
    FreightGuarantee?: FreightGuaranteeType;
    SmartPostHubId?: string;
    SmartPostIndicia?: SmartPostIndiciaType;
}

export interface ICommitDetail {
    CommodityName?: string;
    ServiceType?: ServiceType;
    ServiceDescription?: IServiceDescription;
    AppliedOptions: ServiceOptionType[];
    AppliedSubOptions?: IServiceSubOptionDetail;
    DerivedShipmentSignatureOption?: ISignatureOptionDetail;
    DerivedPackageSignatureOptions: ISignatureOptionDetail[];
    DerivedOriginDetail?: ICleansedAddressAndLocationDetail;
    DerivedDestinationDetail?: ICleansedAddressAndLocationDetail;
    CommitTimestamp?: string;
    DayOfWeek?: DayOfWeekType;
    TransitTime?: TransitTimeType;
    MaximumTransitTime?: TransitTimeType;
    DestinationServiceArea?: string;
    BrokerAddress?: IAddress;
    BrokerLocationId?: string;
    BrokerCommitTimestamp?: string;
    BrokerCommitDayOfWeek?: DayOfWeekType;
    BrokerToDestinationDays?: number;
    ProofOfDeliveryDate?: Date;
    ProofOfDeliveryDayOfWeek?: DayOfWeekType;
    CommitMessages: INotification[];
    DeliveryMessages: string[];
    DelayDetails: IDelayDetail[];
    DocumentContent?: InternationalDocumentContentType;
    RequiredDocuments: RequiredShippingDocumentType[];
    FreightCommitDetail?: IFreightCommitDetail;
}

export interface ISignatureOptionDetail {
    OptionType?: SignatureOptionType;
    SignatureReleaseNumber?: string;
}

export interface ICleansedAddressAndLocationDetail {
    CountryCode?: string;
    StateOrProvinceCode?: string;
    PostalCode?: string;
    ServiceArea?: string;
    LocationId?: string;
    LocationNumber?: number;
    AirportId?: string;
}

export interface IDelayDetail {
    Date?: Date;
    Level?: DelayLevelType;
    Point?: DelayPointType;
    Type?: CommitmentDelayType;
    Description?: string;
}

export interface IWebAuthenticationDetail {
    ParentCredential?: IWebAuthenticationCredential;
    UserCredential: IWebAuthenticationCredential;
}

export interface IWebAuthenticationCredential {
    Key: string;
    Password: string;
}

export interface IClientDetail {
    AccountNumber: string;
    MeterNumber: string;
    IntegratorId?: string;
    Localization?: ILocalization;
}

export interface IFreightCommitDetail {
    OriginDetail?: IFreightServiceCenterDetail;
    DestinationDetail?: IFreightServiceCenterDetail;
    TotalDistance?: IDistance;
}

export interface IDistance {
    Value?: number;
    Units?: DistanceUnits;
}

export interface IFreightServiceCenterDetail {
    InterlineCarrierCode?: string;
    InterlineCarrierName?: string;
    AdditionalDays?: number;
    LocalService?: ServiceType;
    LocalDistance?: IDistance;
    LocalDuration?: string;
    LocalServiceScheduling?: FreightServiceSchedulingType;
    LimitedServiceDays: DayOfWeekType[];
    GatewayLocationId?: string;
    Location?: string;
    ContactAndAddress?: IContactAndAddress;
}

export interface IRatedShipmentDetail {
    EffectiveNetDiscount?: IMoney;
    AdjustedCodCollectionAmount?: IMoney;
    ShipmentRateDetail?: IShipmentRateDetail;
    RatedPackages: IRatedPackageDetail[];
}

export interface IRatedPackageDetail {
    TrackingIds: ITrackingId[];
    GroupNumber?: number;
    EffectiveNetDiscount?: IMoney;
    AdjustedCodCollectionAmount?: IMoney;
    OversizeClass?: OversizeClassType;
    PackageRateDetail?: IPackageRateDetail;
}

export interface IProcessShipmentReply {
    HighestSeverity: NotificationSeverityType;
    Notifications: INotification[];
    TransactionDetail?: ITransactionDetail;
    Version: IVersionId;
    JobId?: string;
    CompletedShipmentDetail?: ICompletedShipmentDetail;
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
    OperationalDetail?: IShipmentOperationalDetail;
    AccessDetail?: IPendingShipmentAccessDetail;
    TagDetail?: ICompletedTagDetail;
    SmartPostDetail?: ICompletedSmartPostDetail;
    HazardousShipmentDetail?: ICompletedHazardousShipmentDetail;
    ShipmentRating?: IShipmentRating;
    CompletedHoldAtLocationDetail?: ICompletedHoldAtLocationDetail;
    ExportComplianceStatement?: string;
    DocumentRequirements?: IDocumentRequirementsDetail;
    CompletedEtdDetail?: ICompletedEtdDetail;
    ShipmentDocuments: IShippingDocument[];
    AssociatedShipments: IAssociatedShipmentDetail[];
    CompletedCodDetail?: ICompletedCodDetail;
    CompletedPackageDetails: ICompletedPackageDetail[];
}

export interface IShipmentOperationalDetail {
    UrsaPrefixCode?: string;
    UrsaSuffixCode?: string;
    OriginLocationId?: string;
    OriginLocationNumber?: number;
    OriginServiceArea?: string;
    DestinationLocationId?: string;
    DestinationLocationNumber?: number;
    DestinationServiceArea?: string;
    DestinationLocationStateOrProvinceCode?: string;
    DeliveryDate?: Date;
    DeliveryDay?: DayOfWeekType;
    PublishedDeliveryTime?: string;
    CommitDate?: Date;
    CommitDay?: DayOfWeekType;
    TransitTime?: TransitTimeType;
    MaximumTransitTime?: TransitTimeType;
    CustomTransitTime?: TransitTimeType;
    IneligibleForMoneyBackGuarantee?: boolean;
    DeliveryEligibilities: GroundDeliveryEligibilityType[];
    AstraPlannedServiceLevel?: string;
    AstraDescription?: string;
    PostalCode?: string;
    StateOrProvinceCode?: string;
    CountryCode?: string;
    AirportId?: string;
    ServiceCode?: string;
    PackagingCode?: string;
    Scac?: string;
}

export interface IPendingShipmentAccessDetail {
    AccessorDetails: IPendingShipmentAccessorDetail[];
}

export interface IPendingShipmentAccessorDetail {
    Role?: AccessorRoleType;
    UserId?: string;
    Password?: string;
    EmailLabelUrl?: string;
}

export interface ICompletedTagDetail {
    ConfirmationNumber: string;
    // <xs:element name="AccessTime" type="xs:duration" minOccurs="0">
    AccessTime?: string;
    // <xs:element name="CutoffTime" type="xs:time" minOccurs="0">;
    CutoffTime?: string;
    Location?: string;
    // <xs:element name="DeliveryCommitment" type="xs:dateTime" minOccurs="0">;
    DeliveryCommitment?: string;
    // <xs:element name="DispatchDate" type="xs:date" minOccurs="0">;
    DispatchDate?: Date;
}

export interface ICompletedSmartPostDetail {
    PickUpCarrier?: CarrierCodeType;
    Machinable?: boolean;
}

export interface ICompletedHazardousShipmentDetail {
    HazardousSummaryDetail?: ICompletedHazardousSummaryDetail;
    // <xs:element name="DryIceDetail" type="ns:ShipmentDryIceDetail" minOccurs="0"/>
    // <xs:element name="AdrLicense" type="ns:AdrLicenseDetail" minOccurs="0">
}

export interface ICompletedHazardousSummaryDetail {
    SmallQuantityExceptionPackageCount?: number;
}

export interface IShipmentRating {
    ActualRateType?: ReturnedRateType;
    EffectiveNetDiscount?: IMoney;
    ShipmentRateDetails: IShipmentRateDetail[];
}

export interface ICompletedHoldAtLocationDetail {
    HoldingLocation?: IContactAndAddress;
    HoldingLocationType?: FedExLocationType;
}

export interface IContactAndAddress {
    Contact?: IContact;
    Address?: IAddress;
}

export interface IDocumentRequirementsDetail {
    RequiredDocuments: RequiredDocumentType[];
    GenerationDetails: IDocumentGenerationDetail[];
    ProhibitedDocuments: EnterpriseDocumentType[];
}

export interface IDocumentGenerationDetail {
    Type?: EnterpriseDocumentType;
    MinimumCopiesRequired?: number;
    Letterhead?: RequirementType;
    ElectronicSignature?: RequirementType;
}

export interface ICompletedEtdDetail {
    FolderId?: string;
    Type?: CompletedEtdType;
    UploadDocumentReferenceDetails: IUploadDocumentReferenceDetail[];
}

export interface IUploadDocumentReferenceDetail {
    LineNumber?: number;
    CustomerReference?: string;
    Description?: string;
    DocumentProducer?: UploadDocumentProducerType;
    DocumentType?: UploadDocumentType;
    DocumentId?: string;
    DocumentIdProducer?: UploadDocumentIdProducer;
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
    FreightRateDetail?: IFreightRateDetail;
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
    LegDescription?: string;
    LegOrigin?: IAddress;
    LegOriginLocationId?: string;
    LegDestination?: IAddress;
    LegDestinationLocationId?: string;
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
    FreightRateDetail?: IFreightRateDetail;
    FreightDiscounts: IRateDiscount[];
    Rebates: IRebate[];
    Surcharges: ISurcharge[];
    Taxes: ITax[];
    DutiesAndTaxes: IEdtCommodityTax[];
    VariableHandlingCharges?: IVariableHandlingCharges;
    TotalVariableHandlingCharges?: IVariableHandlingCharges;
}

export interface IFreightRateDetail {
    QuoteNumber?: string;
    QuoteType?: FreightRateQuoteType;
    BaseChargeCalculation?: FreightBaseChargeCalculationType;
    BaseCharges: IFreightBaseCharge[];
    Notations?: IFreightRateNotation[];
}

export interface IFreightBaseCharge {
    FreightClass?: FreightClassType;
    RatedAsClass?: FreightClassType;
    NmfcCode?: string;
    Description?: string;
    Weight?: IWeight;
    ChargeRate?: IMoney;
    ChargeBasis?: FreightChargeBasisType;
    ExtendedAmount?: IMoney;
}

export interface IFreightRateNotation {
    Code?: string;
    Description?: string;
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

export interface ICodReturnPackageDetail {
    CollectionAmount?: IMoney;
    AdjustmentType?: CodAdjustmentType;
    Electronic?: boolean;
    Barcodes?: IPackageBarcodes;
    Label?: IShippingDocument;
}

export interface IAssociatedShipmentDetail {
    Type?: AssociatedShipmentType;
    Sender?: IParty;
    Recipient?: IParty;
    ServiceType?: ServiceType;
    PackagingType?: PackagingType;
    TrackingId?: ITrackingId;
    CustomerReferences: ICustomerReference[];
    ShipmentOperationalDetail?: IShipmentOperationalDetail;
    PackageOperationalDetail?: IPackageOperationalDetail;
    Label?: IShippingDocument;
}

export interface ICustomerReference {
    CustomerReferenceType: CustomerReferenceType;
    Value?: string;
}

export interface IShippingDocumentPart {
    DocumentPartSequenceNumber?: number;
    Image?: string; // base64Binary
}

export interface IPackageOperationalDetail {
    AstraHandlingText?: string;
    OperationalInstructions: IOperationalInstruction[];
    Barcodes: IPackageBarcodes;
    GroundServiceCode?: string;
}

export interface ICompletedCodDetail {
    CollectionAmount?: IMoney;
    AdjustmentType?: CodAdjustmentType;
}

export interface IOperationalInstruction {
    Number?: number;
    Content?: string;
}

export interface IPackageBarcodes {
    BinaryBarcodes: IBinaryBarcode[];
    StringBarcodes: IStringBarcode[];
}

export interface IBinaryBarcode {
    Type?: BinaryBarcodeType;
    Value?: string; // // base64Binary
}

export interface IStringBarcode {
    Type?: StringBarcodeType;
    Value?: string; // // base64Binary
}

export interface ICompletedPackageDetail {
    SequenceNumber?: number;
    TrackingIds: ITrackingId[];
    GroupNumber?: number;
    OversizeClass?: OversizeClassType;
    PackageRating?: IPackageRating;
    OperationalDetail?: IPackageOperationalDetail;
    Label?: IShippingDocument;
    PackageDocuments: IShippingDocument[];
    CodReturnDetail?: ICodReturnPackageDetail;
    SignatureOption?: SignatureOptionType;
    DryIceWeight?: IWeight;
    HazardousPackageDetail?: ICompletedHazardousPackageDetail;
}

export interface IPackageRating {
    ActualRateType?: ReturnedRateType;
    EffectiveNetDiscount?: IMoney;
    PackageRateDetails: IPackageRateDetail[];
}

export interface IPackageRateDetail {
    RateType: ReturnedRateType;
    RatedWeightMethod?: RatedWeightMethod;
    MinimumChargeType?: MinimumChargeType;
    BillingWeight?: IWeight;
    DimWeight?: IWeight;
    OversizeWeight?: IWeight;
    BaseCharge?: IMoney;
    TotalFreightDiscounts?: IMoney;
    NetFreight?: IMoney;
    TotalSurcharges?: IMoney;
    NetFedExCharge?: IMoney;
    TotalTaxes?: IMoney;
    NetCharge?: IMoney;
    TotalRebates?: IMoney;
    FreightDiscounts: IRateDiscount[];
    Rebates: IRebate[];
    Surcharges: ISurcharge[];
    Taxes: ITax[];
    VariableHandlingCharges?: IVariableHandlingCharges;
}

export interface ICompletedHazardousPackageDetail {
    ReferenceId?: string;
    Accessibility?: DangerousGoodsAccessibilityType;
    CargoAircraftOnly?: boolean;
    Regulation?: HazardousCommodityRegulationType;
    RadioactiveTransportIndex?: number;
    LabelType?: RadioactiveLabelType;
    Containers: IValidatedHazardousContainer[];
}

export interface IValidatedHazardousContainer {
    QValue?: number;
    HazardousCommodities: IValidatedHazardousCommodityContent[];
}

export interface IValidatedHazardousCommodityContent {
    Description?: IValidatedHazardousCommodityDescription;
    Quantity?: IHazardousCommodityQuantityDetail;
    MassPoints?: number;
    Options?: IHazardousCommodityOptionDetail;
    NetExplosiveDetail?: INetExplosiveDetail;
}

export interface IValidatedHazardousCommodityDescription {
    Id?: string;
    SequenceNumber?: number;
    PackingGroup?: HazardousCommodityPackingGroupType;
    PackingInstructions?: string;
    ProperShippingName?: string;
    ProperShippingNameAndDescription?: string;
    TechnicalName?: string;
    HazardClass?: string;
    SubsidiaryClasses: string[];
    Symbols?: string;
    TunnelRestrictionCode?: string;
    SpecialProvisions?: string;
    Attributes?: HazardousCommodityAttributeType;
    Authorization?: string;
    LabelText?: string;
}

export interface IHazardousCommodityQuantityDetail {
    Amount?: number;
    Units?: string;
    QuantityType?: HazardousCommodityQuantityType;
}

export interface IHazardousCommodityOptionDetail {
    LabelTextOption?: HazardousCommodityLabelTextOptionType;
    CustomerSuppliedLabelText?: string;
}

export interface INetExplosiveDetail {
    Type?: NetExplosiveClassificationType;
    Amount?: number;
    Units?: string;
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

export interface ITrackRequest {
    WebAuthenticationDetail: IWebAuthenticationDetail;
    ClientDetail: IClientDetail;
    TransactionDetail?: ITransactionDetail;
    Version: IVersionId;
    SelectionDetails: ITrackSelectionDetail[];
    TransactionTimeOutValueInMilliseconds?: number;
    ProcessingOptions: TrackRequestProcessingOptionType[];
}

export interface ITrackSelectionDetail {
    CarrierCode?: CarrierCodeType;
    OperatingCompany?: OperatingCompanyType;
    PackageIdentifier?: ITrackPackageIdentifier;
    TrackingNumberUniqueIdentifier?: string;
    ShipDateRangeBegin?: Date;
    ShipDateRangeEnd?: Date;
    ShipmentAccountNumber?: string;
    SecureSpodAccount?: string;
    Destination?: IAddress;
    PagingDetail?: IPagingDetail;
    CustomerSpecifiedTimeOutValueInMilliseconds?: number;
}

export interface ITrackPackageIdentifier {
    Type: TrackIdentifierType;
    Value: string;
}

export interface IPagingDetail {
    PagingToken?: string;
    NumberOfResultsPerPage?: number;
}

export interface ITrackReply {
    HighestSeverity: NotificationSeverityType;
    Notifications: INotification[];
    TransactionDetail?: ITransactionDetail;
    Version: IVersionId;
    CompletedTrackDetails: ICompletedTrackDetail[];
}

export interface ICompletedTrackDetail {
    HighestSeverity?: NotificationSeverityType;
    Notifications: INotification[];
    DuplicateWaybill?: boolean;
    MoreData?: boolean;
    PagingToken?: string;
    TrackDetailsCount?: number;
    TrackDetails: ITrackDetail[];
}

export interface ITrackDetail {
    Notification?: INotification;
    TrackingNumber?: string;
    Barcode?: IStringBarcode;
    TrackingNumberUniqueIdentifier?: string;
    StatusDetail?: ITrackStatusDetail;
    InformationNotes: ITrackInformationNoteDetail[];
    CustomerExceptionRequests: ICustomerExceptionRequestDetail[];
    Reconciliation?: ITrackReconciliation;
    ServiceCommitMessage?: string;
    DestinationServiceArea?: string;
    DestinationServiceAreaDescription?: string;
    CarrierCode?: CarrierCodeType;
    OperatingCompany?: OperatingCompanyType;
    OperatingCompanyOrCarrierDescription?: string;
    CartageAgentCompanyName?: string;
    ProductionLocationContactAndAddress?: IContactAndAddress;
    OtherIdentifiers: ITrackOtherIdentifierDetail[];
    FormId?: string;
    Service?: ITrackServiceDescriptionDetail;
    PackageWeight?: IWeight;
    PackageDimensions?: IDimensions;
    PackageDimensionalWeight?: IWeight;
    ShipmentWeight?: IWeight;
    Packaging?: string;
    PackagingType?: PackagingType;
    PhysicalPackagingType?: PhysicalPackagingType;
    PackageSequenceNumber?: number;
    PackageCount?: number;
    CreatorSoftwareId?: string;
    Charges: ITrackChargeDetail[];
    NickName?: string;
    Notes?: string;
    Attributes: TrackDetailAttributeType[];
    ShipmentContents: IContentRecord[];
    PackageContents: string[];
    ClearanceLocationCode?: string;
    Commodities: ICommodity[];
    ReturnDetail?: ITrackReturnDetail;
    CustomsOptionDetails: ICustomsOptionDetail[];
    AdvanceNotificationDetail?: ITrackAdvanceNotificationDetail;
    SpecialHandlings: ITrackSpecialHandling[];
    Payments: ITrackPayment[];
    Shipper?: IContact;
    PossessionStatus?: TrackPossessionStatusType;
    ShipperAddress?: IAddress;
    OriginLocationAddress?: IAddress;
    OriginStationId?: string;
    DatesOrTimes: ITrackingDateOrTimestamp[];
    TotalTransitDistance?: IDistance;
    DistanceToDestination?: IDistance;
    SpecialInstructions: ITrackSpecialInstruction[];
    Recipient?: IContact;
    LastUpdatedDestinationAddress?: IAddress;
    DestinationAddress?: IAddress;
    HoldAtLocationContact?: IContact;
    HoldAtLocationAddress?: IAddress;
    DestinationStationId?: string;
    DestinationLocationAddress?: IAddress;
    DestinationLocationType?: FedExLocationType;
    DestinationLocationTimeZoneOffset?: string;
    ActualDeliveryAddress?: IAddress;
    OfficeOrderDeliveryMethod?: OfficeOrderDeliveryMethodType;
    DeliveryLocationType?: TrackDeliveryLocationType;
    DeliveryLocationDescription?: string;
    DeliveryAttempts?: number;
    DeliverySignatureName?: string;
    PieceCountVerificationDetails: IPieceCountVerificationDetail[];
    TotalUniqueAddressCountInConsolidation?: number;
    AvailableImages: IAvailableImagesDetail[];
    Signature?: ISignatureImageDetail;
    NotificationEventsAvailable: NotificationEventType[];
    SplitShipmentParts: ITrackSplitShipmentPart[];
    DeliveryOptionEligibilityDetails: IDeliveryOptionEligibilityDetail[];
    Events: ITrackEvent[];
}

export interface ITrackEvent {
    Timestamp?: string;
    EventType?: string;
    EventDescription?: string;
    StatusExceptionCode?: string;
    StatusExceptionDescription?: string;
    Address?: IAddress;
    StationId?: string;
    ArrivalLocation?: ArrivalLocationType;
}

export interface IDeliveryOptionEligibilityDetail {
    Option?: DeliveryOptionType;
    Eligibility?: EligibilityType;
}

export interface ITrackSplitShipmentPart {
    PieceCount?: number;
    Timestamp?: string;
    StatusCode?: string;
    StatusDescription?: string;
}

export interface ISignatureImageDetail {
    Image?: string;
    Notifications: INotification[];
}

export interface IAvailableImagesDetail {
    Type?: AvailableImageType;
    Size?: ImageSizeType;
}

export interface IPieceCountVerificationDetail {
    CountLocationType?: PieceCountLocationType;
    Count?: number;
    Description?: string;
}

export interface ITrackSpecialInstruction {
    Description?: string;
    DeliveryOption?: TrackDeliveryOptionType;
    StatusDetail?: ISpecialInstructionStatusDetail;
    OriginalEstimatedDeliveryTimestamp?: string;
    OriginalRequestTime?: string;
    RequestedAppointmentTime?: IAppointmentDetail;
}

export interface IAppointmentDetail {
    Date?: Date;
    WindowDetails: IAppointmentTimeDetail[];
}

export interface IAppointmentTimeDetail {
    Type?: AppointmentWindowType;
    Window?: ILocalTimeRange;
    Description?: string;
}

export interface ILocalTimeRange {
    Begins?: string;
    Ends?: string;
}

export interface ISpecialInstructionStatusDetail {
    Status?: SpecialInstructionsStatusCode;
    StatusCreateTime?: string;
}

export interface ITrackingDateOrTimestamp {
    Type?: TrackingDateOrTimestampType;
    DateOrTimestamp?: string;
}

export interface ITrackStatusDetail {
    CreationTime?: string;
    Code?: string;
    Description?: string;
    Location?: IAddress;
    AncillaryDetails: ITrackStatusAncillaryDetail[];
}

export interface ITrackStatusAncillaryDetail {
    Reason?: string;
    ReasonDescription?: string;
    Action?: string;
    ActionDescription?: string;
}

export interface ITrackInformationNoteDetail {
    Code?: string;
    Description?: string;
}

export interface ICustomerExceptionRequestDetail {
    Id?: string;
    StatusCode?: string;
    StatusDescription?: string;
    CreateTime?: string;
}

export interface ITrackReconciliation {
    Status: string;
    Description: string;
}

export interface ITrackOtherIdentifierDetail {
    PackageIdentifier?: ITrackPackageIdentifier;
    TrackingNumberUniqueIdentifier?: string;
    CarrierCode?: CarrierCodeType;
}

export interface ITrackServiceDescriptionDetail {
    Type?: ServiceType;
    Description?: string;
    ShortDescription?: string;
}

export interface ITrackChargeDetail {
    Type?: TrackChargeDetailType;
    ChargeAmount?: IMoney;
}

export interface IContentRecord {
    PartNumber?: string;
    ItemNumber?: string;
    ReceivedQuantity?: number;
    Description?: string;
}

export interface ICommodity {
    CommodityId?: string;
    Name?: string;
    NumberOfPieces?: number;
    Description?: string;
    Purpose?: CommodityPurposeType;
    CountryOfManufacture?: string;
    HarmonizedCode?: string;
    Weight?: IWeight;
    Quantity?: number;
    QuantityUnits?: string;
    AdditionalMeasures: IMeasure[];
    UnitPrice?: IMoney;
    CustomsValue?: IMoney;
    ExciseConditions: IEdtExciseCondition[];
    ExportLicenseNumber?: string;
    ExportLicenseExpirationDate?: Date;
    CIMarksAndNumbers?: string;
    PartNumber?: string;
    //   <xs:element name="NaftaDetail" type="ns:NaftaCommodityDetail" minOccurs="0">
    //     <xs:annotation>
    //       <xs:documentation>All data required for this commodity in NAFTA Certificate of Origin.</xs:documentation>
    //     </xs:annotation>
    //   </xs:element>
}

export interface ITrackAdvanceNotificationDetail {
    EstimatedTimeOfArrival?: string;
    Reason?: string;
    Status?: TrackAdvanceNotificationStatusType;
    StatusDescription?: string;
    StatusTime?: string;
}

export interface IMeasure {
    Quantity?: number;
    Units?: string;
}

export interface IEdtExciseCondition {
    Category?: string;
    Value?: string;
}

export interface ITrackReturnDetail {
    MovementStatus?: TrackReturnMovementStatusType;
    LabelType?: TrackReturnLabelType;
    Description?: string;
    AuthorizationName?: string;
}

export interface ICustomsOptionDetail {
    Type?: CustomsOptionType;
    Description?: string;
}

export interface ITrackSpecialHandling {
    Type?: TrackSpecialHandlingType;
    Description?: string;
    PaymentType?: TrackPaymentType;
}

export interface ITrackPayment {
    Classification?: TrackChargesPaymentClassificationType;
    Type?: TrackPaymentType;
    Description?: string;
}

export enum ArrivalLocationType {
    AIRPORT = 'AIRPORT',
    CUSTOMER = 'CUSTOMER',
    CUSTOMS_BROKER = 'CUSTOMS_BROKER',
    DELIVERY_LOCATION = 'DELIVERY_LOCATION',
    DESTINATION_AIRPORT = 'DESTINATION_AIRPORT',
    DESTINATION_FEDEX_FACILITY = 'DESTINATION_FEDEX_FACILITY',
    DROP_BOX = 'DROP_BOX',
    ENROUTE = 'ENROUTE',
    FEDEX_FACILITY = 'FEDEX_FACILITY',
    FEDEX_OFFICE_LOCATION = 'FEDEX_OFFICE_LOCATION',
    INTERLINE_CARRIER = 'INTERLINE_CARRIER',
    NON_FEDEX_FACILITY = 'NON_FEDEX_FACILITY',
    ORIGIN_AIRPORT = 'ORIGIN_AIRPORT',
    ORIGIN_FEDEX_FACILITY = 'ORIGIN_FEDEX_FACILITY',
    PICKUP_LOCATION = 'PICKUP_LOCATION',
    PLANE = 'PLANE',
    PORT_OF_ENTRY = 'PORT_OF_ENTRY',
    SHIP_AND_GET_LOCATION = 'SHIP_AND_GET_LOCATION',
    SORT_FACILITY = 'SORT_FACILITY',
    TURNPOINT = 'TURNPOINT',
    VEHICLE = 'VEHICLE'
}

export enum EligibilityType {
    ELIGIBLE = 'ELIGIBLE',
    INELIGIBLE = 'INELIGIBLE',
    POSSIBLY_ELIGIBLE = 'POSSIBLY_ELIGIBLE'
}

export enum DeliveryOptionType {
    INDIRECT_SIGNATURE_RELEASE = 'INDIRECT_SIGNATURE_RELEASE',
    REDIRECT_TO_HOLD_AT_LOCATION = 'REDIRECT_TO_HOLD_AT_LOCATION',
    REROUTE = 'REROUTE',
    RESCHEDULE = 'RESCHEDULE'
}

export enum NotificationEventType {
    ON_DELIVERY = 'ON_DELIVERY',
    ON_ESTIMATED_DELIVERY = 'ON_ESTIMATED_DELIVERY',
    ON_EXCEPTION = 'ON_EXCEPTION',
    ON_SHIPMENT = 'ON_SHIPMENT',
    ON_TENDER = 'ON_TENDER'
}

export enum ImageSizeType {
    LARGE = 'LARGE',
    SMALL = 'SMALL'
}

export enum AvailableImageType {
    BILL_OF_LADING = 'BILL_OF_LADING',
    SIGNATURE_PROOF_OF_DELIVERY = 'SIGNATURE_PROOF_OF_DELIVERY'
}

export enum PieceCountLocationType {
    DESTINATION = 'DESTINATION',
    ORIGIN = 'ORIGIN'
}

export enum TrackDeliveryLocationType {
    APARTMENT_OFFICE = 'APARTMENT_OFFICE',
    FEDEX_LOCATION = 'FEDEX_LOCATION',
    GATE_HOUSE = 'GATE_HOUSE',
    GUARD_OR_SECURITY_STATION = 'GUARD_OR_SECURITY_STATION',
    IN_BOND_OR_CAGE = 'IN_BOND_OR_CAGE',
    LEASING_OFFICE = 'LEASING_OFFICE',
    MAILROOM = 'MAILROOM',
    MAIN_OFFICE = 'MAIN_OFFICE',
    MANAGER_OFFICE = 'MANAGER_OFFICE',
    OTHER = 'OTHER',
    PHARMACY = 'PHARMACY',
    RECEPTIONIST_OR_FRONT_DESK = 'RECEPTIONIST_OR_FRONT_DESK',
    RENTAL_OFFICE = 'RENTAL_OFFICE',
    RESIDENCE = 'RESIDENCE',
    SHIPPING_RECEIVING = 'SHIPPING_RECEIVING'
}

export enum AppointmentWindowType {
    AFTERNOON = 'AFTERNOON',
    LATE_AFTERNOON = 'LATE_AFTERNOON',
    MID_DAY = 'MID_DAY',
    MORNING = 'MORNING'
}

export enum SpecialInstructionsStatusCode {
    ACCEPTED = 'ACCEPTED',
    CANCELLED = 'CANCELLED',
    DENIED = 'DENIED',
    HELD = 'HELD',
    MODIFIED = 'MODIFIED',
    RELINQUISHED = 'RELINQUISHED',
    REQUESTED = 'REQUESTED',
    SET = 'SET'
}

export enum TrackDeliveryOptionType {
    APPOINTMENT = 'APPOINTMENT',
    DATE_CERTAIN = 'DATE_CERTAIN',
    ELECTRONIC_SIGNATURE_RELEASE = 'ELECTRONIC_SIGNATURE_RELEASE',
    EVENING = 'EVENING',
    REDIRECT_TO_HOLD_AT_LOCATION = 'REDIRECT_TO_HOLD_AT_LOCATION',
    REROUTE = 'REROUTE'
}

export enum OfficeOrderDeliveryMethodType {
    COURIER = 'COURIER',
    OTHER = 'OTHER',
    PICKUP = 'PICKUP',
    SHIPMENT = 'SHIPMENT'
}

export enum TrackingDateOrTimestampType {
    ACTUAL_DELIVERY = 'ACTUAL_DELIVERY',
    ACTUAL_PICKUP = 'ACTUAL_PICKUP',
    ACTUAL_TENDER = 'ACTUAL_TENDER',
    ANTICIPATED_TENDER = 'ANTICIPATED_TENDER',
    APPOINTMENT_DELIVERY = 'APPOINTMENT_DELIVERY',
    ESTIMATED_DELIVERY = 'ESTIMATED_DELIVERY',
    ESTIMATED_PICKUP = 'ESTIMATED_PICKUP',
    SHIP = 'SHIP'
}

export enum TrackChargesPaymentClassificationType {
    DUTIES_AND_TAXES = 'DUTIES_AND_TAXES',
    TRANSPORTATION = 'TRANSPORTATION'
}

export enum TrackPaymentType {
    CASH_OR_CHECK_AT_DESTINATION = 'CASH_OR_CHECK_AT_DESTINATION',
    CASH_OR_CHECK_AT_ORIGIN = 'CASH_OR_CHECK_AT_ORIGIN',
    CREDIT_CARD_AT_DESTINATION = 'CREDIT_CARD_AT_DESTINATION',
    CREDIT_CARD_AT_ORIGIN = 'CREDIT_CARD_AT_ORIGIN',
    OTHER = 'OTHER',
    RECIPIENT_ACCOUNT = 'RECIPIENT_ACCOUNT',
    SHIPPER_ACCOUNT = 'SHIPPER_ACCOUNT',
    THIRD_PARTY_ACCOUNT = 'THIRD_PARTY_ACCOUNT'
}

export enum TrackSpecialHandlingType {
    ACCESSIBLE_DANGEROUS_GOODS = 'ACCESSIBLE_DANGEROUS_GOODS',
    ADULT_SIGNATURE_OPTION = 'ADULT_SIGNATURE_OPTION',
    AIRBILL_AUTOMATION = 'AIRBILL_AUTOMATION',
    AIRBILL_DELIVERY = 'AIRBILL_DELIVERY',
    ALCOHOL = 'ALCOHOL',
    AM_DELIVERY_GUARANTEE = 'AM_DELIVERY_GUARANTEE',
    APPOINTMENT_DELIVERY = 'APPOINTMENT_DELIVERY',
    BATTERY = 'BATTERY',
    BILL_RECIPIENT = 'BILL_RECIPIENT',
    BROKER_SELECT_OPTION = 'BROKER_SELECT_OPTION',
    CALL_BEFORE_DELIVERY = 'CALL_BEFORE_DELIVERY',
    CALL_TAG = 'CALL_TAG',
    CALL_TAG_DAMAGE = 'CALL_TAG_DAMAGE',
    CHARGEABLE_CODE = 'CHARGEABLE_CODE',
    COD = 'COD',
    COLLECT = 'COLLECT',
    CONSOLIDATION = 'CONSOLIDATION',
    CONSOLIDATION_SMALLS_BAG = 'CONSOLIDATION_SMALLS_BAG',
    CURRENCY = 'CURRENCY',
    CUT_FLOWERS = 'CUT_FLOWERS',
    DATE_CERTAIN_DELIVERY = 'DATE_CERTAIN_DELIVERY',
    DELIVERY_ON_INVOICE_ACCEPTANCE = 'DELIVERY_ON_INVOICE_ACCEPTANCE',
    DELIVERY_REATTEMPT = 'DELIVERY_REATTEMPT',
    DELIVERY_RECEIPT = 'DELIVERY_RECEIPT',
    DELIVER_WEEKDAY = 'DELIVER_WEEKDAY',
    DIRECT_SIGNATURE_OPTION = 'DIRECT_SIGNATURE_OPTION',
    DOMESTIC = 'DOMESTIC',
    DO_NOT_BREAK_DOWN_PALLETS = 'DO_NOT_BREAK_DOWN_PALLETS',
    DO_NOT_STACK_PALLETS = 'DO_NOT_STACK_PALLETS',
    DRY_ICE = 'DRY_ICE',
    DRY_ICE_ADDED = 'DRY_ICE_ADDED',
    EAST_COAST_SPECIAL = 'EAST_COAST_SPECIAL',
    ELECTRONIC_COD = 'ELECTRONIC_COD',
    ELECTRONIC_DOCUMENTS_WITH_ORIGINALS = 'ELECTRONIC_DOCUMENTS_WITH_ORIGINALS',
    ELECTRONIC_SIGNATURE_SERVICE = 'ELECTRONIC_SIGNATURE_SERVICE',
    ELECTRONIC_TRADE_DOCUMENTS = 'ELECTRONIC_TRADE_DOCUMENTS',
    EVENING_DELIVERY = 'EVENING_DELIVERY',
    EXCLUSIVE_USE = 'EXCLUSIVE_USE',
    EXTENDED_DELIVERY = 'EXTENDED_DELIVERY',
    EXTENDED_PICKUP = 'EXTENDED_PICKUP',
    EXTRA_LABOR = 'EXTRA_LABOR',
    EXTREME_LENGTH = 'EXTREME_LENGTH',
    FOOD = 'FOOD',
    FREIGHT_ON_VALUE_CARRIER_RISK = 'FREIGHT_ON_VALUE_CARRIER_RISK',
    FREIGHT_ON_VALUE_OWN_RISK = 'FREIGHT_ON_VALUE_OWN_RISK',
    FREIGHT_TO_COLLECT = 'FREIGHT_TO_COLLECT',
    FULLY_REGULATED_DANGEROUS_GOODS = 'FULLY_REGULATED_DANGEROUS_GOODS',
    GEL_PACKS_ADDED_OR_REPLACED = 'GEL_PACKS_ADDED_OR_REPLACED',
    GROUND_SUPPORT_FOR_SMARTPOST = 'GROUND_SUPPORT_FOR_SMARTPOST',
    GUARANTEED_FUNDS = 'GUARANTEED_FUNDS',
    HAZMAT = 'HAZMAT',
    HIGH_FLOOR = 'HIGH_FLOOR',
    HOLD_AT_LOCATION = 'HOLD_AT_LOCATION',
    HOLIDAY_DELIVERY = 'HOLIDAY_DELIVERY',
    INACCESSIBLE_DANGEROUS_GOODS = 'INACCESSIBLE_DANGEROUS_GOODS',
    INDIRECT_SIGNATURE_OPTION = 'INDIRECT_SIGNATURE_OPTION',
    INSIDE_DELIVERY = 'INSIDE_DELIVERY',
    INSIDE_PICKUP = 'INSIDE_PICKUP',
    INTERNATIONAL = 'INTERNATIONAL',
    INTERNATIONAL_CONTROLLED_EXPORT = 'INTERNATIONAL_CONTROLLED_EXPORT',
    INTERNATIONAL_MAIL_SERVICE = 'INTERNATIONAL_MAIL_SERVICE',
    INTERNATIONAL_TRAFFIC_IN_ARMS_REGULATIONS = 'INTERNATIONAL_TRAFFIC_IN_ARMS_REGULATIONS',
    LIFTGATE = 'LIFTGATE',
    LIFTGATE_DELIVERY = 'LIFTGATE_DELIVERY',
    LIFTGATE_PICKUP = 'LIFTGATE_PICKUP',
    LIMITED_ACCESS_DELIVERY = 'LIMITED_ACCESS_DELIVERY',
    LIMITED_ACCESS_PICKUP = 'LIMITED_ACCESS_PICKUP',
    LIMITED_QUANTITIES_DANGEROUS_GOODS = 'LIMITED_QUANTITIES_DANGEROUS_GOODS',
    MARKING_OR_TAGGING = 'MARKING_OR_TAGGING',
    NET_RETURN = 'NET_RETURN',
    NON_BUSINESS_TIME = 'NON_BUSINESS_TIME',
    NON_STANDARD_CONTAINER = 'NON_STANDARD_CONTAINER',
    NO_SIGNATURE_REQUIRED_SIGNATURE_OPTION = 'NO_SIGNATURE_REQUIRED_SIGNATURE_OPTION',
    ORDER_NOTIFY = 'ORDER_NOTIFY',
    OTHER = 'OTHER',
    OTHER_REGULATED_MATERIAL_DOMESTIC = 'OTHER_REGULATED_MATERIAL_DOMESTIC',
    PACKAGE_RETURN_PROGRAM = 'PACKAGE_RETURN_PROGRAM',
    PIECE_COUNT_VERIFICATION = 'PIECE_COUNT_VERIFICATION',
    POISON = 'POISON',
    PREPAID = 'PREPAID',
    PRIORITY_ALERT = 'PRIORITY_ALERT',
    PRIORITY_ALERT_PLUS = 'PRIORITY_ALERT_PLUS',
    PROTECTION_FROM_FREEZING = 'PROTECTION_FROM_FREEZING',
    RAIL_MODE = 'RAIL_MODE',
    RECONSIGNMENT_CHARGES = 'RECONSIGNMENT_CHARGES',
    REROUTE_CROSS_COUNTRY_DEFERRED = 'REROUTE_CROSS_COUNTRY_DEFERRED',
    REROUTE_CROSS_COUNTRY_EXPEDITED = 'REROUTE_CROSS_COUNTRY_EXPEDITED',
    REROUTE_LOCAL = 'REROUTE_LOCAL',
    RESIDENTIAL_DELIVERY = 'RESIDENTIAL_DELIVERY',
    RESIDENTIAL_PICKUP = 'RESIDENTIAL_PICKUP',
    RETURNS_CLEARANCE = 'RETURNS_CLEARANCE',
    RETURNS_CLEARANCE_SPECIAL_ROUTING_REQUIRED = 'RETURNS_CLEARANCE_SPECIAL_ROUTING_REQUIRED',
    RETURN_MANAGER = 'RETURN_MANAGER',
    SATURDAY_DELIVERY = 'SATURDAY_DELIVERY',
    SHIPMENT_PLACED_IN_COLD_STORAGE = 'SHIPMENT_PLACED_IN_COLD_STORAGE',
    SINGLE_SHIPMENT = 'SINGLE_SHIPMENT',
    SMALL_QUANTITY_EXCEPTION = 'SMALL_QUANTITY_EXCEPTION',
    SORT_AND_SEGREGATE = 'SORT_AND_SEGREGATE',
    SPECIAL_DELIVERY = 'SPECIAL_DELIVERY',
    SPECIAL_EQUIPMENT = 'SPECIAL_EQUIPMENT',
    STANDARD_GROUND_SERVICE = 'STANDARD_GROUND_SERVICE',
    STORAGE = 'STORAGE',
    SUNDAY_DELIVERY = 'SUNDAY_DELIVERY',
    THIRD_PARTY_BILLING = 'THIRD_PARTY_BILLING',
    THIRD_PARTY_CONSIGNEE = 'THIRD_PARTY_CONSIGNEE',
    TOP_LOAD = 'TOP_LOAD',
    WEEKEND_DELIVERY = 'WEEKEND_DELIVERY',
    WEEKEND_PICKUP = 'WEEKEND_PICKUP'
}

export enum CustomsOptionType {
    COURTESY_RETURN_LABEL = 'COURTESY_RETURN_LABEL',
    EXHIBITION_TRADE_SHOW = 'EXHIBITION_TRADE_SHOW',
    FAULTY_ITEM = 'FAULTY_ITEM',
    FOLLOWING_REPAIR = 'FOLLOWING_REPAIR',
    FOR_REPAIR = 'FOR_REPAIR',
    ITEM_FOR_LOAN = 'ITEM_FOR_LOAN',
    OTHER = 'OTHER',
    REJECTED = 'REJECTED',
    REPLACEMENT = 'REPLACEMENT',
    TRIAL = 'TRIAL'
}

export enum TrackAdvanceNotificationStatusType {
    BACK_ON_TRACK = 'BACK_ON_TRACK',
    FAIL = 'FAIL'
}

export enum TrackPossessionStatusType {
    BROKER = 'BROKER',
    CARRIER = 'CARRIER',
    CUSTOMS = 'CUSTOMS',
    RECIPIENT = 'RECIPIENT',
    SHIPPER = 'SHIPPER',
    SPLIT_STATUS = 'SPLIT_STATUS',
    TRANSFER_PARTNER = 'TRANSFER_PARTNER'
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

export enum FreightRateQuoteType {
    AUTOMATED = 'AUTOMATED',
    MANUAL = 'MANUAL'
}

export enum FreightBaseChargeCalculationType {
    BEYOND = 'BEYOND',
    LINE_ITEMS = 'LINE_ITEMS',
    UNIT_PRICING = 'UNIT_PRICING'
}

export enum FreightClassType {
    CLASS_050 = 'CLASS_050',
    CLASS_055 = 'CLASS_055',
    CLASS_060 = 'CLASS_060',
    CLASS_065 = 'CLASS_065',
    CLASS_070 = 'CLASS_070',
    CLASS_077_5 = 'CLASS_077_5',
    CLASS_085 = 'CLASS_085',
    CLASS_092_5 = 'CLASS_092_5',
    CLASS_100 = 'CLASS_100',
    CLASS_110 = 'CLASS_110',
    CLASS_125 = 'CLASS_125',
    CLASS_150 = 'CLASS_150',
    CLASS_175 = 'CLASS_175',
    CLASS_200 = 'CLASS_200',
    CLASS_250 = 'CLASS_250',
    CLASS_300 = 'CLASS_300',
    CLASS_400 = 'CLASS_400',
    CLASS_500 = 'CLASS_500'
}

export enum FreightChargeBasisType {
    CWT = 'CWT',
    FLAT = 'FLAT',
    MINIMUM = 'MINIMUM'
}

export enum DayOfWeekType {
    FRI = 'FRI',
    MON = 'MON',
    SAT = 'SAT',
    SUN = 'SUN',
    THU = 'THU',
    TUE = 'TUE',
    WED = 'WED'
}

export enum TransitTimeType {
    EIGHTEEN_DAYS = 'EIGHTEEN_DAYS',
    EIGHT_DAYS = 'EIGHT_DAYS',
    ELEVEN_DAYS = 'ELEVEN_DAYS',
    FIFTEEN_DAYS = 'FIFTEEN_DAYS',
    FIVE_DAYS = 'FIVE_DAYS',
    FOURTEEN_DAYS = 'FOURTEEN_DAYS',
    FOUR_DAYS = 'FOUR_DAYS',
    NINETEEN_DAYS = 'NINETEEN_DAYS',
    NINE_DAYS = 'NINE_DAYS',
    ONE_DAY = 'ONE_DAY',
    SEVENTEEN_DAYS = 'SEVENTEEN_DAYS',
    SEVEN_DAYS = 'SEVEN_DAYS',
    SIXTEEN_DAYS = 'SIXTEEN_DAYS',
    SIX_DAYS = 'SIX_DAYS',
    TEN_DAYS = 'TEN_DAYS',
    THIRTEEN_DAYS = 'THIRTEEN_DAYS',
    THREE_DAYS = 'THREE_DAYS',
    TWELVE_DAYS = 'TWELVE_DAYS',
    TWENTY_DAYS = 'TWENTY_DAYS',
    TWO_DAYS = 'TWO_DAYS',
    UNKNOWN = 'UNKNOWN'
}

export enum GroundDeliveryEligibilityType {
    ALTERNATE_DAY_SERVICE = 'ALTERNATE_DAY_SERVICE',
    CARTAGE_AGENT_DELIVERY = 'CARTAGE_AGENT_DELIVERY',
    SATURDAY_DELIVERY = 'SATURDAY_DELIVERY',
    USPS_DELIVERY = 'USPS_DELIVERY'
}

export enum AccessorRoleType {
    SHIPMENT_COMPLETOR = 'SHIPMENT_COMPLETOR',
    SHIPMENT_INITIATOR = 'SHIPMENT_INITIATOR'
}

export enum FedExLocationType {
    FEDEX_EXPRESS_STATION = 'FEDEX_EXPRESS_STATION',
    FEDEX_FACILITY = 'FEDEX_FACILITY',
    FEDEX_FREIGHT_SERVICE_CENTER = 'FEDEX_FREIGHT_SERVICE_CENTER',
    FEDEX_GROUND_TERMINAL = 'FEDEX_GROUND_TERMINAL',
    FEDEX_HOME_DELIVERY_STATION = 'FEDEX_HOME_DELIVERY_STATION',
    FEDEX_OFFICE = 'FEDEX_OFFICE',
    FEDEX_SHIPSITE = 'FEDEX_SHIPSITE',
    FEDEX_SMART_POST_HUB = 'FEDEX_SMART_POST_HUB'
}

export enum RequiredDocumentType {
    AIR_WAYBILL = 'AIR_WAYBILL',
    CERTIFICATE_OF_ORIGIN = 'CERTIFICATE_OF_ORIGIN',
    COMMERCIAL_INVOICE = 'COMMERCIAL_INVOICE',
    COMMERCIAL_OR_PRO_FORMA_INVOICE = 'COMMERCIAL_OR_PRO_FORMA_INVOICE',
    NAFTA_CERTIFICATE_OF_ORIGIN = 'NAFTA_CERTIFICATE_OF_ORIGIN',
    PRO_FORMA_INVOICE = 'PRO_FORMA_INVOICE'
}

export enum EnterpriseDocumentType {
    AIR_WAYBILL = 'AIR_WAYBILL',
    CERTIFICATE_OF_ORIGIN = 'CERTIFICATE_OF_ORIGIN',
    COMMERCIAL_INVOICE = 'COMMERCIAL_INVOICE',
    NAFTA_CERTIFICATE_OF_ORIGIN = 'NAFTA_CERTIFICATE_OF_ORIGIN',
    PRO_FORMA_INVOICE = 'PRO_FORMA_INVOICE'
}

export enum RequirementType {
    OPTIONAL = 'OPTIONAL',
    PROHIBITEDe = 'PROHIBITED',
    REQUIRED = 'REQUIRED'
}

export enum CompletedEtdType {
    ELECTRONIC_DOCUMENTS_ONLY = 'ELECTRONIC_DOCUMENTS_ONLY',
    ELECTRONIC_DOCUMENTS_WITH_ORIGINALS = 'ELECTRONIC_DOCUMENTS_WITH_ORIGINALS'
}

export enum UploadDocumentProducerType {
    CUSTOMER = 'CUSTOMER'
}

export enum UploadDocumentIdProducer {
    CUSTOMER = 'CUSTOMER'
}

export enum UploadDocumentType {
    CERTIFICATE_OF_ORIGIN = 'CERTIFICATE_OF_ORIGIN',
    COMMERCIAL_INVOICE = 'COMMERCIAL_INVOICE',
    ETD_LABEL = 'ETD_LABEL',
    NAFTA_CERTIFICATE_OF_ORIGIN = 'NAFTA_CERTIFICATE_OF_ORIGIN',
    NET_RATE_SHEET = 'NET_RATE_SHEET',
    OTHER = 'OTHER',
    PRO_FORMA_INVOICE = 'PRO_FORMA_INVOICE'
}

export enum AssociatedShipmentType {
    COD_AND_DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN = 'COD_AND_DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN',
    COD_RETURN = 'COD_RETURN',
    DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN = 'DELIVERY_ON_INVOICE_ACCEPTANCE_RETURN'
}

export enum BinaryBarcodeType {
    COMMON_2D = 'COMMON_2D'
}

export enum StringBarcodeType {
    ADDRESS = 'ADDRESS',
    ASTRA = 'ASTRA',
    FEDEX_1D = 'FEDEX_1D',
    GROUND = 'GROUND',
    POSTAL = 'POSTAL',
    USPS = 'USPS'
}

export enum CustomerReferenceType {
    CUSTOMER_REFERENCE = 'CUSTOMER_REFERENCE',
    DEPARTMENT_NUMBER = 'DEPARTMENT_NUMBER',
    INTRACOUNTRY_REGULATORY_REFERENCE = 'INTRACOUNTRY_REGULATORY_REFERENCE',
    INVOICE_NUMBER = 'INVOICE_NUMBER',
    P_O_NUMBER = 'P_O_NUMBER',
    RMA_ASSOCIATION = 'RMA_ASSOCIATION',
    SHIPMENT_INTEGRITY = 'SHIPMENT_INTEGRITY'
}

export enum CodAdjustmentType {
    CHARGES_ADDED = 'CHARGES_ADDED',
    NONE = 'NONE'
}

export enum OversizeClassType {
    OVERSIZE_1 = 'OVERSIZE_1',
    OVERSIZE_2 = 'OVERSIZE_2',
    OVERSIZE_3 = 'OVERSIZE_3'
}

export enum SignatureOptionType {
    ADULT = 'ADULT',
    DIRECT = 'DIRECT',
    INDIRECT = 'INDIRECT',
    NO_SIGNATURE_REQUIRED = 'NO_SIGNATURE_REQUIRED',
    SERVICE_DEFAULT = 'SERVICE_DEFAULT'
}

export enum DangerousGoodsAccessibilityType {
    ACCESSIBLE = 'ACCESSIBLE',
    INACCESSIBLE = 'INACCESSIBLE'
}

export enum HazardousCommodityRegulationType {
    ADR = 'ADR',
    DOT = 'DOT',
    IATA = 'IATA',
    ORMD = 'ORMD'
}

export enum RadioactiveLabelType {
    III_YELLOW = 'III_YELLOW',
    II_YELLOW = 'II_YELLOW',
    I_WHITE = 'I_WHITE'
}

export enum HazardousCommodityPackingGroupType {
    DEFAULT = 'DEFAULT',
    I = 'I',
    II = 'II',
    III = 'III'
}

export enum HazardousCommodityAttributeType {
    NOT_SUBJECT_TO_REGULATIONS = 'NOT_SUBJECT_TO_REGULATIONS',
    PLACARDED_VEHICLE_REQUIRED = 'PLACARDED_VEHICLE_REQUIRED'
}

export enum HazardousCommodityQuantityType {}

export enum HazardousCommodityLabelTextOptionType {
    APPEND = 'APPEND',
    OVERRIDE = 'OVERRIDE',
    STANDARD = 'STANDARD'
}

export enum NetExplosiveClassificationType {
    NET_EXPLOSIVE_CONTENT = 'NET_EXPLOSIVE_CONTENT',
    NET_EXPLOSIVE_MASS = 'NET_EXPLOSIVE_MASS',
    NET_EXPLOSIVE_QUANTITY = 'NET_EXPLOSIVE_QUANTITY',
    NET_EXPLOSIVE_WEIGHT = 'NET_EXPLOSIVE_WEIGHT'
}

export enum ConsolidationType {
    INTERNATIONAL_DISTRIBUTION_FREIGHT = 'INTERNATIONAL_DISTRIBUTION_FREIGHT',
    INTERNATIONAL_ECONOMY_DISTRIBUTION = 'INTERNATIONAL_ECONOMY_DISTRIBUTION',
    INTERNATIONAL_GROUND_DISTRIBUTION = 'INTERNATIONAL_GROUND_DISTRIBUTION',
    INTERNATIONAL_PRIORITY_DISTRIBUTION = 'INTERNATIONAL_PRIORITY_DISTRIBUTION',
    TRANSBORDER_DISTRIBUTION = 'TRANSBORDER_DISTRIBUTION'
}

export enum ServiceOptionType {
    FEDEX_ONE_RATE = 'FEDEX_ONE_RATE',
    FREIGHT_GUARANTEE = 'FREIGHT_GUARANTEE',
    SATURDAY_DELIVERY = 'SATURDAY_DELIVERY',
    SMART_POST_ALLOWED_INDICIA = 'SMART_POST_ALLOWED_INDICIA',
    SMART_POST_HUB_ID = 'SMART_POST_HUB_ID'
}

export enum SmartPostIndiciaType {
    MEDIA_MAIL = 'MEDIA_MAIL',
    PARCEL_RETURN = 'PARCEL_RETURN',
    PARCEL_SELECT = 'PARCEL_SELECT',
    PRESORTED_BOUND_PRINTED_MATTER = 'PRESORTED_BOUND_PRINTED_MATTER',
    PRESORTED_STANDARD = 'PRESORTED_STANDARD'
}

export enum FreightGuaranteeType {
    GUARANTEED_DATE = 'GUARANTEED_DATE',
    GUARANTEED_MORNING = 'GUARANTEED_MORNING'
}

export enum CommitmentDelayType {
    HOLIDAY = 'HOLIDAY',
    NON_WORKDAY = 'NON_WORKDAY',
    NO_CITY_DELIVERY = 'NO_CITY_DELIVERY',
    NO_HOLD_AT_LOCATION = 'NO_HOLD_AT_LOCATION',
    NO_LOCATION_DELIVERY = 'NO_LOCATION_DELIVERY',
    NO_SERVICE_AREA_DELIVERY = 'NO_SERVICE_AREA_DELIVERY',
    NO_SERVICE_AREA_SPECIAL_SERVICE_DELIVERY = 'NO_SERVICE_AREA_SPECIAL_SERVICE_DELIVERY',
    NO_SPECIAL_SERVICE_DELIVERY = 'NO_SPECIAL_SERVICE_DELIVERY',
    NO_ZIP_DELIVERY = 'NO_ZIP_DELIVERY',
    WEEKEND = 'WEEKEND',
    WEEKEND_SPECIAL = 'WEEKEND_SPECIAL'
}

export enum DelayPointType {
    BROKER = 'BROKER',
    DESTINATION = 'DESTINATION',
    ORIGIN = 'ORIGIN',
    ORIGIN_DESTINATION_PAIR = 'ORIGIN_DESTINATION_PAIR',
    PROOF_OF_DELIVERY_POINT = 'PROOF_OF_DELIVERY_POINT'
}

export enum DelayLevelType {
    CITY = 'CITY',
    COUNTRY = 'COUNTRY',
    LOCATION = 'LOCATION',
    POSTAL_CODE = 'POSTAL_CODE',
    SERVICE_AREA = 'SERVICE_AREA',
    SERVICE_AREA_SPECIAL_SERVICE = 'SERVICE_AREA_SPECIAL_SERVICE',
    SPECIAL_SERVICE = 'SPECIAL_SERVICE'
}

export enum InternationalDocumentContentType {
    DOCUMENTS_ONLY = 'DOCUMENTS_ONLY',
    NON_DOCUMENTS = 'NON_DOCUMENTS'
}

export enum RequiredShippingDocumentType {
    CANADIAN_B13A = 'CANADIAN_B13A',
    CERTIFICATE_OF_ORIGIN = 'CERTIFICATE_OF_ORIGIN',
    COMMERCIAL_INVOICE = 'COMMERCIAL_INVOICE',
    INTERNATIONAL_AIRWAY_BILL = 'INTERNATIONAL_AIRWAY_BILL',
    MAIL_SERVICE_AIRWAY_BILL = 'MAIL_SERVICE_AIRWAY_BILL',
    SHIPPERS_EXPORT_DECLARATION = 'SHIPPERS_EXPORT_DECLARATION'
}

export enum DistanceUnits {
    KM = 'KM',
    MI = 'MI'
}

export enum FreightServiceSchedulingType {
    LIMITED = 'LIMITED',
    STANDARD = 'STANDARD',
    WILL_CALL = 'WILL_CALL'
}

export enum TrackRequestProcessingOptionType {
    INCLUDE_DETAILED_SCANS = 'INCLUDE_DETAILED_SCANS'
}

export enum OperatingCompanyType {
    FEDEX_CARGO = 'FEDEX_CARGO',
    FEDEX_CORPORATE_SERVICES = 'FEDEX_CORPORATE_SERVICES',
    FEDEX_CORPORATION = 'FEDEX_CORPORATION',
    FEDEX_CUSTOMER_INFORMATION_SYSTEMS = 'FEDEX_CUSTOMER_INFORMATION_SYSTEMS',
    FEDEX_CUSTOM_CRITICAL = 'FEDEX_CUSTOM_CRITICAL',
    FEDEX_EXPRESS = 'FEDEX_EXPRESS',
    FEDEX_FREIGHT = 'FEDEX_FREIGHT',
    FEDEX_GROUND = 'FEDEX_GROUND',
    FEDEX_KINKOS = 'FEDEX_KINKOS',
    FEDEX_OFFICE = 'FEDEX_OFFICE',
    FEDEX_SERVICES = 'FEDEX_SERVICES',
    FEDEX_TRADE_NETWORKS = 'FEDEX_TRADE_NETWORKS'
}

export enum TrackIdentifierType {
    BILL_OF_LADING = 'BILL_OF_LADING',
    COD_RETURN_TRACKING_NUMBER = 'COD_RETURN_TRACKING_NUMBER',
    CUSTOMER_AUTHORIZATION_NUMBER = 'CUSTOMER_AUTHORIZATION_NUMBER',
    CUSTOMER_REFERENCE = 'CUSTOMER_REFERENCE',
    DEPARTMENT = 'DEPARTMENT',
    DOCUMENT_AIRWAY_BILL = 'DOCUMENT_AIRWAY_BILL',
    FREE_FORM_REFERENCE = 'FREE_FORM_REFERENCE',
    GROUND_INTERNATIONAL = 'GROUND_INTERNATIONAL',
    GROUND_SHIPMENT_ID = 'GROUND_SHIPMENT_ID',
    GROUP_MPS = 'GROUP_MPS',
    INVOICE = 'INVOICE',
    JOB_GLOBAL_TRACKING_NUMBER = 'JOB_GLOBAL_TRACKING_NUMBER',
    ORDER_GLOBAL_TRACKING_NUMBER = 'ORDER_GLOBAL_TRACKING_NUMBER',
    ORDER_TO_PAY_NUMBER = 'ORDER_TO_PAY_NUMBER',
    OUTBOUND_LINK_TO_RETURN = 'OUTBOUND_LINK_TO_RETURN',
    PARTNER_CARRIER_NUMBER = 'PARTNER_CARRIER_NUMBER',
    PART_NUMBER = 'PART_NUMBER',
    PURCHASE_ORDER = 'PURCHASE_ORDER',
    REROUTE_TRACKING_NUMBER = 'REROUTE_TRACKING_NUMBER',
    RETURNED_TO_SHIPPER_TRACKING_NUMBER = 'RETURNED_TO_SHIPPER_TRACKING_NUMBER',
    RETURN_MATERIALS_AUTHORIZATION = 'RETURN_MATERIALS_AUTHORIZATION',
    SHIPPER_REFERENCE = 'SHIPPER_REFERENCE',
    STANDARD_MPS = 'STANDARD_MPS',
    TRACKING_NUMBER_OR_DOORTAG = 'TRACKING_NUMBER_OR_DOORTAG',
    TRANSPORTATION_CONTROL_NUMBER = 'TRANSPORTATION_CONTROL_NUMBER'
}

export enum PhysicalPackagingType {
    BAG = 'BAG',
    BARREL = 'BARREL',
    BASKET = 'BASKET',
    BOX = 'BOX',
    BUCKET = 'BUCKET',
    BUNDLE = 'BUNDLE',
    CAGE = 'CAGE',
    CARTON = 'CARTON',
    CASE = 'CASE',
    CHEST = 'CHEST',
    CONTAINER = 'CONTAINER',
    CRATE = 'CRATE',
    CYLINDER = 'CYLINDER',
    DRUM = 'DRUM',
    ENVELOPE = 'ENVELOPE',
    HAMPER = 'HAMPER',
    OTHER = 'OTHER',
    PACKAGE = 'PACKAGE',
    PAIL = 'PAIL',
    PALLET = 'PALLET',
    PARCEL = 'PARCEL',
    PIECE = 'PIECE',
    REEL = 'REEL',
    ROLL = 'ROLL',
    SACK = 'SACK',
    SHRINK_WRAPPED = 'SHRINK_WRAPPED',
    SKID = 'SKID',
    TANK = 'TANK',
    TOTE_BIN = 'TOTE_BIN',
    TUBE = 'TUBE',
    UNIT = 'UNIT'
}

export enum TrackChargeDetailType {
    ORIGINAL_CHARGES = 'ORIGINAL_CHARGES'
}

export enum TrackDetailAttributeType {
    INCLUDED_IN_WATCHLIST = 'INCLUDED_IN_WATCHLIST'
}

export enum CommodityPurposeType {
    BUSINESS = 'BUSINESS',
    CONSUMER = 'CONSUMER'
}

export enum TrackReturnMovementStatusType {
    MOVEMENT_OCCURRED = 'MOVEMENT_OCCURRED',
    NO_MOVEMENT = 'NO_MOVEMENT'
}

export enum TrackReturnLabelType {
    EMAIL = 'EMAIL',
    PRINT = 'PRINT'
}

export enum RateRequestType {
    LIST = 'LIST',
    NONE = 'NONE',
    PREFERRED = 'PREFERRED'
}