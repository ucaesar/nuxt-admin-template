import Router from 'koa-router';
import fedexConfig from '../../FedexConfig';
import { any } from 'bluebird';
const shipmentRouter = new Router();
const util = require('util');
const FedExAPI = require('fedex-manager');

shipmentRouter.post('/create', async ctx => {
    // const name: string = (ctx.req as any).body.name || '';
    // const description: string = (ctx.req as any).body.description || '';
    // const url: string = (ctx.req as any).body.url || '';
    // const action: string = (ctx.req as any).body.action || '';
    // if (name === '' || url === '' || action === '') {
    //     ctx.response.status = 401;
    //     ctx.response.body = 'name url action are all needed';
    //     return;
    // }
    // const req = (ctx.req as any).body;
    // console.log(req);
    const fedex = new FedExAPI(fedexConfig);
    const date = new Date();
    let result: any = 'a';
    const ship = util.promisify(fedex.ship);
    const sender: any = (ctx.req as any).body.senderAddress;
    const receiver: any = (ctx.req as any).body.receiverAddress;
    const requestedshipment = {
        RequestedShipment: {
            ShipTimestamp: new Date(
                date.getTime() + 24 * 60 * 60 * 1000
            ).toISOString(),
            DropoffType: 'REGULAR_PICKUP',
            ServiceType: 'FEDEX_GROUND',
            PackagingType: 'YOUR_PACKAGING',
            Shipper: {
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
            },
            Recipient: {
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
            },
            ShippingChargesPayment: {
                PaymentType: 'SENDER',
                Payor: {
                    ResponsibleParty: {
                        AccountNumber: fedex.options.account_number
                    }
                }
            },
            LabelSpecification: {
                LabelFormatType: 'COMMON2D',
                ImageType: 'PDF',
                LabelStockType: 'PAPER_4X6'
            },
            PackageCount: '1',
            RequestedPackageLineItems: [
                {
                    SequenceNumber: 1,
                    GroupPackageCount: 1,
                    Weight: {
                        Units: 'LB',
                        Value: '50.0'
                    },
                    Dimensions: {
                        Length: 108,
                        Width: 5,
                        Height: 5,
                        Units: 'IN'
                    }
                }
            ]
        }
    };

    const res = await ship({
        RequestedShipment: bulidRequestShipments(ctx).master
    });
    result = {
        label:
            res.CompletedShipmentDetail.CompletedPackageDetails[0].Label
                .Parts[0].Image
    };
    ctx.response.type = 'text/json';
    ctx.response.status = 200;
    ctx.response.body = { result };
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
    const dropoff = 'REGULAR_PICKUP';
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
        masterItem.PackageCount = packsInfo.Length;
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
        RequestedPackageLineItems: [{
            SequenceNumber: 1,
            GroupPackageCount: 1,
            Weight: {
                Units: '',
                Value: ''
            }
        }]
    };
}
export default shipmentRouter;
