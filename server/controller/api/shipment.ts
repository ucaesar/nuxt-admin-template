import Router from 'koa-router';
import fedexConfig from '../../FedexConfig';
import * as ShipService from '../../types/ShipService';
import User from '../../model/User';
import Shipment from '../../model/Shipment';
import ShipmentDetail from '../../model/ShipmentDetail';
import ShipmentPackage from '../../model/ShipmentPackage';
import { sequelize } from '../../db';
const shipmentRouter = new Router();
const util = require('util');
const FedExAPI = require('fedex-manager');

shipmentRouter.delete('/:trackno', async ctx => {
    const trackno = ctx.params.trackno;
    const fedex = new FedExAPI(fedexConfig);
    const deleteshipment = util.promisify(fedex.deleteshipment);
    let result: any = {};
    try {
        const shipment = await Shipment.findOne({
            where: {
                trackno,
                masterno: null
            }
        });
        if (!shipment) {
            throw 'tracking number not exist';
        }
        const res = await deleteshipment({
            TrackingId: {
                TrackingIdType: 'FEDEX', // EXPRESS || FEDEX || GROUND || USPS
                TrackingNumber: trackno
            },
            DeletionControl: 'DELETE_ALL_PACKAGES' // or DELETE_ONE_PACKAGE or LEGACY
        });
        if (
            res.HighestSeverity === 'ERROR' ||
            res.HighestSeverity === 'FAILURE' ||
            res.HighestSeverity === 'NOTE'
        ) {
            console.log('code:' + res.Notifications[0].Code);
            console.log('message:' + res.Notifications[0].Message);
            console.log('severity:' + res.Notifications[0].Severity);
            console.log('source:' + res.Notifications[0].Source);
            throw res.Notifications[0].Message;
        }
        await sequelize.transaction(async t => {
            const shipmentDetail = (await shipment.$get(
                'shipmentDetail'
            )) as ShipmentDetail;
            await shipment.destroy();
            await shipmentDetail.destroy();
        });
    } catch (err) {
        console.log(err);
        result = { error: err };
    } finally {
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = result;
    }
});

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
    const packageResults: any[] = [];
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
        if (
            res.HighestSeverity === 'ERROR' ||
            res.HighestSeverity === 'FAILURE'
        ) {
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
        const masterPackage = packages.master.RequestedPackageLineItems[0];
        packageResults.push({
            id: 0,
            sequenceNumber: masterPackage.SequenceNumber,
            groupNumber: masterPackage.GroupNumber,
            groupPackageCount: masterPackage.GroupPackageCount,
            weightUnits: masterPackage.Weight!.Units,
            weight: masterPackage.Weight!.Value,
            linearUnits: masterPackage.Dimensions
                ? masterPackage.Dimensions.Units
                : null,
            length: masterPackage.Dimensions
                ? masterPackage.Dimensions.Length
                : null,
            width: masterPackage.Dimensions
                ? masterPackage.Dimensions.Width
                : null,
            height: masterPackage.Dimensions
                ? masterPackage.Dimensions.Height
                : null,
            trackno: res.CompletedShipmentDetail!.CompletedPackageDetails[0]!
                .TrackingIds[0].TrackingNumber
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
            packageResults.push({
                id: 0,
                sequenceNumber:
                    child.RequestedPackageLineItems[0].SequenceNumber,
                groupNumber: child.RequestedPackageLineItems[0].GroupNumber,
                groupPackageCount:
                    child.RequestedPackageLineItems[0].GroupPackageCount,
                weightUnits: packages.master.RequestedPackageLineItems[0]
                    .Weight!.Units,
                weight: child.RequestedPackageLineItems[0].Weight!.Value,
                linearUnits: child.RequestedPackageLineItems[0].Dimensions!
                    .Units,
                length: child.RequestedPackageLineItems[0].Dimensions!.Length,
                width: child.RequestedPackageLineItems[0].Dimensions!.Width,
                height: child.RequestedPackageLineItems[0].Dimensions!.Height,
                trackno: childRes.CompletedShipmentDetail!
                    .CompletedPackageDetails[0]!.TrackingIds[0].TrackingNumber
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

        await sequelize.transaction(async t => {
            const shipmentDetail = await ShipmentDetail.create(sd);

            for (const sr of shipmentResults) {
                sr.detailId = shipmentDetail.id;
                await Shipment.create(sr);
            }

            for (const pr of packageResults) {
                await ShipmentPackage.create(pr);
            }
        });
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
        },
        order: [['createdAt', 'DESC']]
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

shipmentRouter.get('/:trackno', async ctx => {
    const trackno = ctx.params.trackno;
    const packageTypeMap = {
        FEDEX_BOX: '0',
        FEDEX_ENVELOPE: '1',
        FEDEX_PAK: '2',
        FEDEX_TUBE: '3',
        YOUR_PACKAGING: '4'
    };
    const fedex = new FedExAPI(fedexConfig);
    const track = util.promisify(fedex.track);
    let result: any = {};
    try {
        const shipment = await Shipment.findOne({
            where: {
                trackno
            }
        });
        const labels: any[] = [];
        if (!shipment) {
            throw 'can not find this package, check tracking number please';
        }
        labels.push(shipment.image);
        const detail = (await shipment.$get(
            'shipmentDetail'
        )) as ShipmentDetail;
        const pac = (await shipment.$get('pac')) as ShipmentPackage;
        if (!detail || !pac) {
            throw 'shipment information error';
        }
        result.senderAddress = {
            name: detail.shipperPersonName,
            phone: detail.shipperPhoneNumber,
            address: detail.shipperStreetLine1,
            address2:
                detail.shipperStreetLine2.length > 0
                    ? detail.shipperStreetLine2
                    : undefined,
            city: detail.shipperCity,
            province: detail.shipperStateOrProvinceCode,
            postcode: detail.shipperPostalCode,
            country: detail.shipperCountryCode
        };
        result.receiverAddress = {
            name: detail.recipientPersonName,
            phone: detail.recipientPhoneNumber,
            address: detail.recipientStreetLine1,
            address2:
                detail.recipientStreetLine2.length > 0
                    ? detail.recipientStreetLine2
                    : undefined,
            city: detail.recipientCity,
            province: detail.recipientStateOrProvinceCode,
            postcode: detail.recipientPostalCode,
            country: detail.recipientCountryCode
        };
        result.pac = {
            packageType: packageTypeMap[detail.packagingType]
        };
        if (detail.packagingType !== 'YOUR_PACKAGING') {
            result.pac.trackno = pac.trackno;
            result.pac.weightUnit = pac.weightUnits;
            result.pac.weight = pac.weight;
        } else {
            result.pac.weightUnit = pac.weightUnits;
            result.pac.dimensionUnit = pac.linearUnits;
            const packages: any[] = [];
            packages.push({
                trackno: pac.trackno,
                weight: pac.weight,
                length: pac.length,
                width: pac.width,
                height: pac.height
            });
            let shipmentChildren = await shipment.$get('children');
            shipmentChildren = Array.isArray(shipmentChildren)
                ? shipmentChildren
                : [shipmentChildren];
            for (const child of shipmentChildren) {
                const childPac = (await (child as Shipment).$get(
                    'pac'
                )) as ShipmentPackage;
                packages.push({
                    trackno: childPac.trackno,
                    weight: childPac.weight,
                    length: childPac.length,
                    width: childPac.width,
                    height: childPac.height
                });
                labels.push((child as Shipment).image);
            }
            result.pac.packages = packages;
        }
        result.labels = labels;
        const trackRes: ShipService.ITrackReply = await track({
            SelectionDetails: {
                PackageIdentifier: {
                    Type: 'TRACKING_NUMBER_OR_DOORTAG',
                    Value: '123456789012' // 测试sandbox服务器暂用此运单号
                }
            }
        });
        if (
            trackRes.HighestSeverity === 'ERROR' ||
            trackRes.HighestSeverity === 'FAILURE'
        ) {
            console.log('code:' + trackRes.Notifications[0].Code);
            console.log('message:' + trackRes.Notifications[0].Message);
            console.log('severity:' + trackRes.Notifications[0].Severity);
            console.log('source:' + trackRes.Notifications[0].Source);
            throw trackRes.Notifications[0].Message;
        }
        const timelines = sortTrackTimestamp(
            trackRes.CompletedTrackDetails[0].TrackDetails[0].DatesOrTimes
        );
        result.timelines = timelines;
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
            ShipTimestamp: new Date(date.getTime()).toISOString(),
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
            ShipTimestamp: new Date(date.getTime()).toISOString(),
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

function sortTrackTimestamp(
    trackTimestamps: ShipService.ITrackingDateOrTimestamp[]
): ShipService.ITrackingDateOrTimestamp[] {
    return trackTimestamps.sort(
        (
            a: ShipService.ITrackingDateOrTimestamp,
            b: ShipService.ITrackingDateOrTimestamp
        ) => {
            const astr = a.DateOrTimestamp;
            const bstr = b.DateOrTimestamp;
            if (!astr || !bstr) {
                throw 'timestamp error';
            }
            const aMilliseconds = Date.parse(astr);
            const bMilliseconds = Date.parse(bstr);
            if (aMilliseconds > bMilliseconds) return 1;
            else if (aMilliseconds < bMilliseconds) return -1;
            else return 0;
        }
    );
}

export default shipmentRouter;
