import Router from 'koa-router';
import fedexConfig from '../../FedexConfig';
import * as ShipService from '../../types/ShipService';
const shipmentRouter = new Router();
const util = require('util');
const FedExAPI = require('fedex-manager');

shipmentRouter.post('/create', async ctx => {
    const fedex = new FedExAPI(fedexConfig);
    let result: any = 'a';
    const ship = util.promisify(fedex.ship);

    try {
        // const packages = bulidRequestShipments(ctx);
        const packages = bulidRequestedShipments(ctx);
        const res: ShipService.IProcessShipmentReply = await ship({
            RequestedShipment: packages.master
        });
        if (res.HighestSeverity === 'ERROR') {
            console.log('code:' + res.Notifications[0].Code);
            console.log('message:' + res.Notifications[0].Message);
            console.log('severity:' + res.Notifications[0].Severity);
            console.log('source:' + res.Notifications[0].Source);
            throw res.Notifications[0].Message;
        }
        const masterid = res.CompletedShipmentDetail!.MasterTrackingId;
        result = {
            labels: [
                res.CompletedShipmentDetail!.CompletedPackageDetails[0]!.Label!
                    .Parts[0].Image
            ]
        };
        for (const child of packages.children) {
            (child as any).MasterTrackingId = masterid;
            const childRes : ShipService.IProcessShipmentReply = await ship({
                RequestedShipment: child
            });
            if (childRes.HighestSeverity === 'ERROR') {
                console.log('code:' + childRes.Notifications[0].Code);
                console.log('message:' + childRes.Notifications[0].Message);
                console.log('severity:' + childRes.Notifications[0].Severity);
                console.log('source:' + childRes.Notifications[0].Source);
                throw childRes.Notifications[0].Message;
            }
            result.labels.push(
                childRes.CompletedShipmentDetail!.CompletedPackageDetails[0]!.Label!
                    .Parts[0].Image
            );
        }
    } catch (err) {
        console.log(err);
        result = { error: err };
        throw err;
    } finally {
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = { result };
    }
});

shipmentRouter.get('/', ctx => {
    ctx.response.type = 'text/json';
    ctx.response.status = 200;
    ctx.response.body = {};
});

// function bulidRequestShipments(ctx) {
//     const packageTypeMap = {
//         '0': 'FEDEX_BOX',
//         '1': 'FEDEX_ENVELOPE',
//         '2': 'FEDEX_PAK',
//         '3': 'FEDEX_TUBE',
//         '4': 'YOUR_PACKAGING'
//     };
//     const result = { master: {}, children: [] };
//     // const date = new Date();
//     const sender: any = (ctx.req as any).body.senderAddress;
//     const receiver: any = (ctx.req as any).body.receiverAddress;
//     const packtype = (ctx.req as any).body.pac.packageType;
//     const dropoff = 'DROP_BOX';
//     const service = 'STANDARD_OVERNIGHT';
//     const packagetype = packageTypeMap[packtype];
//     const shipper = {
//         Contact: {
//             PersonName: sender.name,
//             CompanyName: 'Company Name',
//             PhoneNumber: sender.phone
//         },
//         Address: {
//             StreetLines: [sender.address, sender.address2],
//             City: sender.city,
//             StateOrProvinceCode: sender.province,
//             PostalCode: sender.postcode,
//             CountryCode: sender.country
//         }
//     };
//     const recipient = {
//         Contact: {
//             PersonName: receiver.name,
//             CompanyName: 'Company Name',
//             PhoneNumber: receiver.phone
//         },
//         Address: {
//             StreetLines: [receiver.address, receiver.address2],
//             City: receiver.city,
//             StateOrProvinceCode: receiver.province,
//             PostalCode: receiver.postcode,
//             CountryCode: receiver.country
//         }
//     };
//     const payment = {
//         PaymentType: 'SENDER',
//         Payor: {
//             ResponsibleParty: {
//                 AccountNumber: fedexConfig.account_number
//             }
//         }
//     };
//     const label = {
//         LabelFormatType: 'COMMON2D',
//         ImageType: 'PDF',
//         LabelStockType: 'PAPER_4X6'
//     };
//     const masterItem = newRequest(
//         dropoff,
//         service,
//         packagetype,
//         shipper,
//         recipient,
//         payment,
//         label
//     );
//     if (packagetype !== 'YOUR_PACKAGING') {
//         masterItem.PackageCount = '1';
//         masterItem.RequestedPackageLineItems = [
//             {
//                 SequenceNumber: 1,
//                 GroupPackageCount: 1,
//                 Weight: {
//                     Units: (ctx.req as any).body.pac.weightUnit.toUpperCase(),
//                     Value: (ctx.req as any).body.pac.weight
//                 }
//             }
//         ];
//     }
//     if (packagetype === 'YOUR_PACKAGING') {
//         const packsInfo = (ctx.req as any).body.pac.packages;
//         const childrenInfo = (packsInfo as any[]).slice(1, packsInfo.length);

//         masterItem.PackageCount = packsInfo.length;
//         (masterItem as any).TotalWeight.Units = (ctx.req as any).body.pac.weightUnit.toUpperCase();
//         let totalWeight: number = 0.0;
//         (packsInfo as any[]).forEach(element => {
//             totalWeight = totalWeight + parseFloat(element.weight);
//         });
//         (masterItem as any).TotalWeight.Value = totalWeight;
//         masterItem.RequestedPackageLineItems = [
//             {
//                 SequenceNumber: 1,
//                 GroupPackageCount: 1,
//                 Weight: {
//                     Units: (ctx.req as any).body.pac.weightUnit.toUpperCase(),
//                     Value: (ctx.req as any).body.pac.packages[0].weight
//                 },
//                 Dimensions: {
//                     Length: (ctx.req as any).body.pac.packages[0].length,
//                     Width: (ctx.req as any).body.pac.packages[0].width,
//                     Height: (ctx.req as any).body.pac.packages[0].height,
//                     Units: (ctx.req as any).body.pac.dimensionUnit.toUpperCase()
//                 }
//             }
//         ];

//         let i = 2;
//         childrenInfo.forEach(element => {
//             const childitem = newRequest(
//                 dropoff,
//                 service,
//                 packagetype,
//                 shipper,
//                 recipient,
//                 payment,
//                 label
//             );
//             childitem.PackageCount = packsInfo.length;
//             (childitem as any).TotalWeight.Units = (ctx.req as any).body.pac.weightUnit.toUpperCase();
//             (childitem as any).TotalWeight.Value = totalWeight;
//             childitem.RequestedPackageLineItems = [
//                 {
//                     SequenceNumber: i,
//                     GroupPackageCount: 1,
//                     Weight: {
//                         Units: (ctx.req as any).body.pac.weightUnit.toUpperCase(),
//                         Value: element.weight
//                     },
//                     Dimensions: {
//                         Length: element.length,
//                         Width: element.width,
//                         Height: element.height,
//                         Units: (ctx.req as any).body.pac.dimensionUnit.toUpperCase()
//                     }
//                 }
//             ];
//             (result.children as any[]).push(childitem);
//             i = i + 1;
//         });
//     }
//     result.master = masterItem;
//     return result;
// }

// function newRequest(
//     dropoff,
//     service,
//     packagetype,
//     shipper,
//     recipient,
//     payment,
//     label
// ) {
//     const date = new Date();
//     if (packagetype === 'YOUR_PACKAGING')
//         return {
//             ShipTimestamp: new Date(
//                 date.getTime() + 24 * 60 * 60 * 1000
//             ).toISOString(),
//             DropoffType: dropoff,
//             ServiceType: service,
//             PackagingType: packagetype,
//             TotalWeight: {
//                 Units: '',
//                 Value: ''
//             },
//             Shipper: shipper,
//             Recipient: recipient,
//             ShippingChargesPayment: payment,
//             LabelSpecification: label,
//             MasterTrackingId: {},
//             PackageCount: '',
//             RequestedPackageLineItems: [
//                 {
//                     SequenceNumber: 1,
//                     GroupPackageCount: 1,
//                     Weight: {
//                         Units: '',
//                         Value: ''
//                     },
//                     Dimensions: {
//                         Length: '',
//                         Width: '',
//                         Height: '',
//                         Units: ''
//                     }
//                 }
//             ]
//         };
//     else
//         return {
//             ShipTimestamp: new Date(
//                 date.getTime() + 24 * 60 * 60 * 1000
//             ).toISOString(),
//             DropoffType: dropoff,
//             ServiceType: service,
//             PackagingType: packagetype,
//             Shipper: shipper,
//             Recipient: recipient,
//             ShippingChargesPayment: payment,
//             LabelSpecification: label,
//             PackageCount: '',
//             RequestedPackageLineItems: [
//                 {
//                     SequenceNumber: 1,
//                     GroupPackageCount: 1,
//                     Weight: {
//                         Units: '',
//                         Value: ''
//                     }
//                 }
//             ]
//         };
// }

interface IRequestedShipmentResult {
    master: ShipService.IRequestedShipment;
    children: ShipService.IRequestedShipment[];
}

function bulidRequestedShipments(ctx): IRequestedShipmentResult {
    const packageTypeMap = {
        '0': 'FEDEX_BOX',
        '1': 'FEDEX_ENVELOPE',
        '2': 'FEDEX_PAK',
        '3': 'FEDEX_TUBE',
        '4': 'YOUR_PACKAGING'
    };
    // const result = { master: {}, children: [] };
    const sender: any = (ctx.req as any).body.senderAddress;
    const receiver: any = (ctx.req as any).body.receiverAddress;
    const packtype = (ctx.req as any).body.pac.packageType;
    const dropoff: ShipService.DropoffType = ShipService.DropoffType.DROP_BOX;
    const service: ShipService.ServiceType =
        ShipService.ServiceType.STANDARD_OVERNIGHT;
    const packagetype: ShipService.PackagingType =
        ShipService.PackagingType[packageTypeMap[packtype]];
    const shipper: ShipService.IParty = {
        Contact: {
            PersonName: sender.name,
            CompanyName: 'Company Name',
            PhoneNumber: sender.phone
        },
        Address: {
            StreetLines: [sender.address, sender.address2],
            City: sender.city,
            StateOrProvinceCode: sender.province,
            PostalCode: sender.postcode,
            CountryCode: sender.country
        }
    };
    const recipient: ShipService.IParty = {
        Contact: {
            PersonName: receiver.name,
            CompanyName: 'Company Name',
            PhoneNumber: receiver.phone
        },
        Address: {
            StreetLines: [receiver.address, receiver.address2],
            City: receiver.city,
            StateOrProvinceCode: receiver.province,
            PostalCode: receiver.postcode,
            CountryCode: receiver.country
        }
    };
    const payment: ShipService.IPayment = {
        PaymentType: ShipService.PaymentType.THIRD_PARTY,
        Payor: {
            ResponsibleParty: {
                AccountNumber: fedexConfig.account_number
            }
        }
    };
    const label: ShipService.ILabelSpecification = {
        LabelFormatType: ShipService.LabelFormatType.COMMON2D,
        ImageType: ShipService.ShippingDocumentImageType.PDF,
        LabelStockType: ShipService.LabelStockType.PAPER_4X6
    };
    const masterItem = newRequestedShipment(
        dropoff,
        service,
        packagetype,
        shipper,
        recipient,
        payment,
        label
    );
    const children: ShipService.IRequestedShipment[] = [];
    if (packagetype !== 'YOUR_PACKAGING') {
        masterItem.PackageCount = 1;
        masterItem.RequestedPackageLineItems = [
            {
                SequenceNumber: 1,
                GroupPackageCount: 1,
                Weight: {
                    Units:
                        ShipService.WeightUnits[
                            (ctx.req as any).body.pac.weightUnit.toUpperCase()
                        ],
                    Value: (ctx.req as any).body.pac.weight
                }
            }
        ];
    }
    if (packagetype === 'YOUR_PACKAGING') {
        const packsInfo = (ctx.req as any).body.pac.packages;
        const childrenInfo = (packsInfo as any[]).slice(1, packsInfo.length);

        masterItem.PackageCount = packsInfo.length;
        let totalWeight: number = 0.0;
        (packsInfo as any[]).forEach(element => {
            totalWeight = totalWeight + parseFloat(element.weight);
        });
        if (masterItem.TotalWeight) {
            masterItem.TotalWeight.Units =
                ShipService.WeightUnits[
                    (ctx.req as any).body.pac.weightUnit.toUpperCase()
                ];
            masterItem.TotalWeight.Value = totalWeight;
        }
        masterItem.RequestedPackageLineItems = [
            {
                SequenceNumber: 1,
                GroupPackageCount: 1,
                Weight: {
                    Units:
                        ShipService.WeightUnits[
                            (ctx.req as any).body.pac.weightUnit.toUpperCase()
                        ],
                    Value: (ctx.req as any).body.pac.packages[0].weight
                },
                Dimensions: {
                    Length: (ctx.req as any).body.pac.packages[0].length,
                    Width: (ctx.req as any).body.pac.packages[0].width,
                    Height: (ctx.req as any).body.pac.packages[0].height,
                    Units:
                        ShipService.LinearUnits[
                            (ctx.req as any).body.pac.dimensionUnit.toUpperCase()
                        ]
                }
            }
        ];

        childrenInfo.forEach((element, index) => {
            const childitem = newRequestedShipment(
                dropoff,
                service,
                packagetype,
                shipper,
                recipient,
                payment,
                label
            );
            childitem.PackageCount = packsInfo.length;
            if (childitem.TotalWeight) {
                childitem.TotalWeight.Units =
                    ShipService.WeightUnits[
                        (ctx.req as any).body.pac.weightUnit.toUpperCase()
                    ];
                childitem.TotalWeight.Value = totalWeight;
            }
            childitem.RequestedPackageLineItems = [
                {
                    SequenceNumber: index + 2,
                    GroupPackageCount: 1,
                    Weight: {
                        Units:
                            ShipService.WeightUnits[
                                (ctx.req as any).body.pac.weightUnit.toUpperCase()
                            ],
                        Value: element.weight
                    },
                    Dimensions: {
                        Length: element.length,
                        Width: element.width,
                        Height: element.height,
                        Units:
                            ShipService.LinearUnits[
                                (ctx.req as any).body.pac.dimensionUnit.toUpperCase()
                            ]
                    }
                }
            ];
            children.push(childitem);
        });
    }
    return { master: masterItem, children };
}

function newRequestedShipment(
    dropoff: ShipService.DropoffType,
    service: ShipService.ServiceType,
    packagetype: ShipService.PackagingType,
    shipper: ShipService.IParty,
    recipient: ShipService.IParty,
    payment: ShipService.IPayment,
    label: ShipService.ILabelSpecification
): ShipService.IRequestedShipment {
    const date = new Date();
    if (packagetype === 'YOUR_PACKAGING')
        return {
            ShipTimestamp: new Date(
                date.getTime() + 24 * 60 * 60 * 1000
            ).toISOString(),
            DropoffType: dropoff,
            ServiceType: service,
            PackagingType: packagetype,
            TotalWeight: {
                Units: ShipService.WeightUnits.KG,
                Value: 0
            },
            Shipper: shipper,
            Recipient: recipient,
            ShippingChargesPayment: payment,
            LabelSpecification: label,
            MasterTrackingId: {},
            PackageCount: 1,
            RequestedPackageLineItems: [
                {
                    SequenceNumber: 1,
                    GroupPackageCount: 1,
                    Weight: {
                        Units: ShipService.WeightUnits.KG,
                        Value: 0
                    },
                    Dimensions: {
                        Length: 0,
                        Width: 0,
                        Height: 0,
                        Units: ShipService.LinearUnits.CM
                    }
                }
            ]
        };
    else
        return {
            ShipTimestamp: new Date(
                date.getTime() + 24 * 60 * 60 * 1000
            ).toISOString(),
            DropoffType: dropoff,
            ServiceType: service,
            PackagingType: packagetype,
            Shipper: shipper,
            Recipient: recipient,
            ShippingChargesPayment: payment,
            LabelSpecification: label,
            PackageCount: 1,
            RequestedPackageLineItems: [
                {
                    SequenceNumber: 1,
                    GroupPackageCount: 1,
                    Weight: {
                        Units: ShipService.WeightUnits.KG,
                        Value: 0
                    }
                }
            ]
        };
}

export default shipmentRouter;
