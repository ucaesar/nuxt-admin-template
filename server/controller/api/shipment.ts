import Router from 'koa-router';
import fedexConfig from '../../FedexConfig';
import { exception } from 'console';
const shipmentRouter = new Router();
const util = require('util');
const FedExAPI = require('fedex-manager');

shipmentRouter.post('/create', async ctx => {
    const fedex = new FedExAPI(fedexConfig);
    let result: any = 'a';
    const ship = util.promisify(fedex.ship);

    try {
        const packages = bulidRequestShipments(ctx);
        const res = await ship({
            RequestedShipment: packages.master
        });
        if (res.HighestSeverity === 'ERROR') {
            console.log('code:' + res.Notifications[0].Code);
            console.log('message:' + res.Notifications[0].Message);
            console.log('severity:' + res.Notifications[0].Severity);
            console.log('source:' + res.Notifications[0].Source);
            throw res.Notifications[0].Message;
        }
        const masterid = res.CompletedShipmentDetail.MasterTrackingId;
        result = {
            labels: [
                res.CompletedShipmentDetail.CompletedPackageDetails[0].Label
                    .Parts[0].Image
            ]
        };
        for (const child of packages.children) {
            (child as any).MasterTrackingId = masterid;
            const res = await ship({
                RequestedShipment: child
            });
            if (res.HighestSeverity === 'ERROR') {
                console.log('code:' + res.Notifications[0].Code);
                console.log('message:' + res.Notifications[0].Message);
                console.log('severity:' + res.Notifications[0].Severity);
                console.log('source:' + res.Notifications[0].Source);
                throw res.Notifications[0].Message;
            }
            result.labels.push(
                res.CompletedShipmentDetail.CompletedPackageDetails[0].Label
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
function bulidRequestShipments(ctx) {
    const packageTypeMap = {
        '0': 'FEDEX_BOX',
        '1': 'FEDEX_ENVELOPE',
        '2': 'FEDEX_PAK',
        '3': 'FEDEX_TUBE',
        '4': 'YOUR_PACKAGING'
    };
    const result = { master: {}, children: [] };
    const date = new Date();
    const sender: any = (ctx.req as any).body.senderAddress;
    const receiver: any = (ctx.req as any).body.receiverAddress;
    const packtype = (ctx.req as any).body.pac.packageType;
    const dropoff = 'DROP_BOX';
    const service = 'STANDARD_OVERNIGHT';
    const packagetype = packageTypeMap[packtype];
    const shipper = {
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
    const recipient = {
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
    const payment = {
        PaymentType: 'SENDER',
        Payor: {
            ResponsibleParty: {
                AccountNumber: fedexConfig.account_number
            }
        }
    };
    const label = {
        LabelFormatType: 'COMMON2D',
        ImageType: 'PDF',
        LabelStockType: 'PAPER_4X6'
    };
    const masterItem = newRequest(
        dropoff,
        service,
        packagetype,
        shipper,
        recipient,
        payment,
        label
    );
    if (packagetype !== 'YOUR_PACKAGING') {
        masterItem.PackageCount = '1';
        masterItem.RequestedPackageLineItems = [
            {
                SequenceNumber: 1,
                GroupPackageCount: 1,
                Weight: {
                    Units: (ctx.req as any).body.pac.weightUnit.toUpperCase(),
                    Value: (ctx.req as any).body.pac.weight
                }
            }
        ];
    }
    if (packagetype === 'YOUR_PACKAGING') {
        const packsInfo = (ctx.req as any).body.pac.packages;
        const childrenInfo = (packsInfo as any[]).slice(1, packsInfo.length);

        masterItem.PackageCount = packsInfo.length;
        (masterItem as any).TotalWeight.Units = (ctx.req as any).body.pac.weightUnit.toUpperCase();
        let totalWeight: number = 0.0;
        (packsInfo as any[]).forEach(element => {
            totalWeight = totalWeight + parseFloat(element.weight);
        });
        (masterItem as any).TotalWeight.Value = totalWeight;
        masterItem.RequestedPackageLineItems = [
            {
                SequenceNumber: 1,
                GroupPackageCount: 1,
                Weight: {
                    Units: (ctx.req as any).body.pac.weightUnit.toUpperCase(),
                    Value: (ctx.req as any).body.pac.packages[0].weight
                },
                Dimensions: {
                    Length: (ctx.req as any).body.pac.packages[0].length,
                    Width: (ctx.req as any).body.pac.packages[0].width,
                    Height: (ctx.req as any).body.pac.packages[0].height,
                    Units: (ctx.req as any).body.pac.dimensionUnit.toUpperCase()
                }
            }
        ];

        let i = 2;
        childrenInfo.forEach(element => {
            const childitem = newRequest(
                dropoff,
                service,
                packagetype,
                shipper,
                recipient,
                payment,
                label
            );
            childitem.PackageCount = packsInfo.length;
            (childitem as any).TotalWeight.Units = (ctx.req as any).body.pac.weightUnit.toUpperCase();
            (childitem as any).TotalWeight.Value = totalWeight;
            childitem.RequestedPackageLineItems = [
                {
                    SequenceNumber: i,
                    GroupPackageCount: 1,
                    Weight: {
                        Units: (ctx.req as any).body.pac.weightUnit.toUpperCase(),
                        Value: element.weight
                    },
                    Dimensions: {
                        Length: element.length,
                        Width: element.width,
                        Height: element.height,
                        Units: (ctx.req as any).body.pac.dimensionUnit.toUpperCase()
                    }
                }
            ];
            (result.children as any[]).push(childitem);
            i = i + 1;
        });
    }
    result.master = masterItem;
    return result;
}
function newRequest(
    dropoff,
    service,
    packagetype,
    shipper,
    recipient,
    payment,
    label
) {
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
                Units: '',
                Value: ''
            },
            Shipper: shipper,
            Recipient: recipient,
            ShippingChargesPayment: payment,
            LabelSpecification: label,
            MasterTrackingId: {},
            PackageCount: '',
            RequestedPackageLineItems: [
                {
                    SequenceNumber: 1,
                    GroupPackageCount: 1,
                    Weight: {
                        Units: '',
                        Value: ''
                    },
                    Dimensions: {
                        Length: '',
                        Width: '',
                        Height: '',
                        Units: ''
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
            PackageCount: '',
            RequestedPackageLineItems: [
                {
                    SequenceNumber: 1,
                    GroupPackageCount: 1,
                    Weight: {
                        Units: '',
                        Value: ''
                    }
                }
            ]
        };
}
export default shipmentRouter;
