import Router from 'koa-router';
import fedexConfig from '../../FedexConfig';
import * as ShipService from '../../types/ShipService';
import User from '../../model/User';
import Shipment from '../../model/Shipment';
import ShipmentDetail from '../../model/ShipmentDetail';
const shipmentRouter = new Router();
const util = require('util');
const FedExAPI = require('fedex-manager');

shipmentRouter.post('/delete', ctx => {});

shipmentRouter.post('/track', async ctx => {
    let result: any = 'a';
    const tracker = require('delivery-tracker');
    const courier = tracker.courier(tracker.COURIER.FEDEX.CODE);
    const track = util.promisify(courier.trace);
    try {
        const trackNo: any = (ctx.req as any).body;
        const r = await track(trackNo);
        if (r.status === 'Pending') {
            throw 'Track Number Error.';
        }
        const checkpoint = r.checkpoints[0];
        const timelines = [
            { status: checkpoint.message, time: checkpoint.time }
        ];
        result = { timelines };
    } catch (err) {
        console.log(err);
        result = { error: err };
    } finally {
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = result;
    }
});

shipmentRouter.post('/rate', async ctx => {
    const u = ctx.state.currentUser;
    const fedex = new FedExAPI(fedexConfig);
    let result: any = 'a';
    const rate = util.promisify(fedex.rates);
    try {
        const packages = bulidRequestedShipments(ctx);
        const pack = transferShipRequestToRateRequest(packages);
        const res: ShipService.IRateReply = await rate({
            RequestedShipment: pack
        });
        if (res.HighestSeverity === 'ERROR') {
            console.log('code:' + res.Notifications[0].Code);
            console.log('message:' + res.Notifications[0].Message);
            console.log('severity:' + res.Notifications[0].Severity);
            console.log('source:' + res.Notifications[0].Source);
            throw res.Notifications[0].Message;
        }
        const money = res.RateReplyDetails[0].RatedShipmentDetails[0]
            .ShipmentRateDetail!.TotalBaseCharge;
        result = {
            money: {
                currency: money!.Currency,
                amount: money!.Amount
            }
        };
    } catch (err) {
        console.log(err);
        result = { error: err };
        // throw err;
    } finally {
        (ctx as any).session.money = result.money;
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = result;
    }
});

shipmentRouter.post('/create', async ctx => {
    const fedex = new FedExAPI(fedexConfig);
    let result: any = 'a';
    const ship = util.promisify(fedex.ship);
    const shipmentResults: any[] = [];
    const sd = {
        id: 0,
        shipperPersonName: '',
        shipperPhoneNumber: '',
        shipperCompanyName: '',
        shipperStreetLine1: '',
        shipperStreetLine2: '',
        shipperCity: '',
        shipperStateOrProvinceCode: '',
        shipperPostalCode: '',
        shipperCountryCode: '',
        recipientPersonName: '',
        recipientPhoneNumber: '',
        recipientCompanyName: '',
        recipientStreetLine1: '',
        recipientStreetLine2: '',
        recipientCity: '',
        recipientStateOrProvinceCode: '',
        recipientPostalCode: '',
        recipientCountryCode: '',
        shipTimestamp: '',
        dropoffType: '',
        serviceType: '',
        packagingType: '',
        packageCount: 0
    };
    try {
        const u = ctx.state.currentUser;
        if (!(ctx as any).session.money) {
            throw 'Please Rate first';
        }
        const user = await User.findOne({
            where: {
                id: u.id
            }
        });
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
        shipmentResults.push({
            trackno: res.CompletedShipmentDetail!.CompletedPackageDetails[0]!
                .TrackingIds[0].TrackingNumber,
            image: res.CompletedShipmentDetail!.CompletedPackageDetails[0]!
                .Label!.Parts[0].Image,
            // fee: JSON.stringify((ctx as any).session.money),
            fee: (ctx as any).session.money,
            userId: u.id
        });

        for (const child of packages.children) {
            (child as any).MasterTrackingId = masterid;
            const childRes: ShipService.IProcessShipmentReply = await ship({
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
                childRes.CompletedShipmentDetail!.CompletedPackageDetails[0]!
                    .Label!.Parts[0].Image
            );
            shipmentResults.push({
                trackno: childRes.CompletedShipmentDetail!
                    .CompletedPackageDetails[0]!.TrackingIds[0].TrackingNumber,
                image: childRes.CompletedShipmentDetail!
                    .CompletedPackageDetails[0]!.Label!.Parts[0].Image,
                userId: u.id,
                masterno: masterid!.TrackingNumber
            });
        }

        sd.shipTimestamp = packages.master.ShipTimestamp;
        sd.dropoffType = packages.master.DropoffType;
        sd.serviceType = packages.master.ServiceType;
        sd.packagingType = packages.master.PackagingType;
        sd.packageCount = packages.master.PackageCount;

        sd.shipperPersonName = packages.master.Shipper.Contact!.PersonName!;
        sd.shipperPhoneNumber = packages.master.Shipper.Contact!.PhoneNumber!;
        sd.shipperCompanyName = packages.master.Shipper.Contact!.CompanyName!;
        sd.shipperStreetLine1 = packages.master.Shipper.Address!.StreetLines![0];
        sd.shipperStreetLine2 = packages.master.Shipper.Address!.StreetLines![1];
        sd.shipperCity = packages.master.Shipper.Address!.City!;
        sd.shipperStateOrProvinceCode = packages.master.Shipper.Address!.StateOrProvinceCode!;
        sd.shipperPostalCode = packages.master.Shipper.Address!.PostalCode!;
        sd.shipperCountryCode = packages.master.Shipper.Address!.CountryCode!;

        sd.recipientPersonName = packages.master.Recipient.Contact!.PersonName!;
        sd.recipientPhoneNumber = packages.master.Recipient.Contact!.PhoneNumber!;
        sd.recipientCompanyName = packages.master.Recipient.Contact!.CompanyName!;
        sd.recipientStreetLine1 = packages.master.Recipient.Address!.StreetLines![0];
        sd.recipientStreetLine2 = packages.master.Recipient.Address!.StreetLines![1];
        sd.recipientCity = packages.master.Recipient.Address!.City!;
        sd.recipientStateOrProvinceCode = packages.master.Recipient.Address!.StateOrProvinceCode!;
        sd.recipientPostalCode = packages.master.Recipient.Address!.PostalCode!;
        sd.recipientCountryCode = packages.master.Recipient.Address!.CountryCode!;

        const shipmentDetail = await ShipmentDetail.create(sd);

        for (const sr of shipmentResults) {
            sr.detailId = shipmentDetail.id;
            await Shipment.create(sr);
        }
    } catch (err) {
        console.log(err);
        result = { error: err };
        // throw err;
    } finally {
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        // ctx.response.body = { result };
        ctx.response.body = result;
    }
});

shipmentRouter.get('/', async ctx => {
    // 获取分页参数
    const start = ctx.request.query.start;
    const num = ctx.request.query.count;
    const total = await Shipment.count({
        where: {
            masterno: null
        }
    });
    const filter = ctx.request.query.filter ? ctx.request.query.filter : '';
    let offset = 0;
    let limit = total;
    if (start && Number(start) >= 0 && Number(start) < total) {
        offset = Number(start);
    }
    if (num && Number(num) > 0) {
        if (offset + Number(num) <= total) {
            limit = Number(num);
        } else {
            limit = total - offset;
        }
    }
    const shipments = await Shipment.findAll({
        offset,
        limit,
        attributes: ['trackno', 'fee', 'detailId'],
        where: {
            masterno: null
        }
    });
    const results: any[] = [];
    for (const shipment of shipments) {
        const detail = (await shipment.$get(
            'shipmentDetail'
        )) as ShipmentDetail;
        results.push({
            trackno: shipment.trackno,
            fee: shipment.fee,
            createdAt: detail.shipTimestamp,
            senderAddress: {
                name: detail.shipperPersonName,
                city: detail.shipperCity,
                province: detail.shipperStateOrProvinceCode,
                country: detail.shipperCountryCode
            },
            receiverAddress: {
                name: detail.recipientPersonName,
                city: detail.recipientCity,
                province: detail.shipperStateOrProvinceCode,
                country: detail.recipientCountryCode
            }
        });
    }
    ctx.response.type = 'text/json';
    ctx.response.status = 200;
    ctx.response.body = {
        results,
        total
    };
});

shipmentRouter.post('/:trackno', ctx => {});

interface IRequestedShipmentResult {
    master: ShipService.IRequestedShipment;
    children: ShipService.IRequestedShipment[];
}

function transferShipRequestToRateRequest(
    packages: IRequestedShipmentResult
): ShipService.IRequestedShipment {
    const master = packages.master;
    packages.children.forEach(child => {
        master.RequestedPackageLineItems.push(
            child.RequestedPackageLineItems[0]
        );
    });
    return master;
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
            StreetLines: [
                sender.address,
                sender.address2 ? sender.address2 : ''
            ],
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
            StreetLines: [
                receiver.address,
                receiver.address2 ? receiver.address2 : ''
            ],
            City: receiver.city,
            StateOrProvinceCode: receiver.province,
            PostalCode: receiver.postcode,
            CountryCode: receiver.country
        }
    };
    const payment: ShipService.IPayment = {
        PaymentType: ShipService.PaymentType.SENDER,
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
                date.getTime()
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
                date.getTime()
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
