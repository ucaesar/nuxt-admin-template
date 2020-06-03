import Router from 'koa-router';
import fedexConfig from '../../FedexConfig';
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
    const fedex = new FedExAPI({
        environment: 'sandbox', // or live
        debug: false,
        key: 'DtKE3OM6Kb5RrLHt',
        password: 'hS8OZSrhAnlcMafNaRFSDRVUo',
        account_number: '510087500',
        meter_number: '119118039',
        imperial: false // set to false for metric
    });
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
    const requestedshipment2 = {
        RequestedShipment: {
            ShipTimestamp: new Date(
                date.getTime() + 24 * 60 * 60 * 1000
            ).toISOString(),
            DropoffType: 'REGULAR_PICKUP',
            ServiceType: 'FEDEX_GROUND',
            PackagingType: 'YOUR_PACKAGING',
            Shipper: {
                Contact: {
                    PersonName: 'Sender Name',
                    CompanyName: 'Company Name',
                    PhoneNumber: '5555555555'
                },
                Address: {
                    StreetLines: ['Address Line 1'],
                    City: 'Collierville',
                    StateOrProvinceCode: 'TN',
                    PostalCode: '38017',
                    CountryCode: 'US'
                }
            },
            Recipient: {
                Contact: {
                    PersonName: 'Recipient Name',
                    CompanyName: 'Company Receipt Name',
                    PhoneNumber: '5555555555'
                },
                Address: {
                    StreetLines: ['Address Line 1'],
                    City: 'Charlotte',
                    StateOrProvinceCode: 'NC',
                    PostalCode: '28202',
                    CountryCode: 'US',
                    Residential: false
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
    // const res = await ship(requestedshipment2);
    const res = await ship({
        RequestedShipment: {
            ShipTimestamp: new Date(
                date.getTime() + 24 * 60 * 60 * 1000
            ).toISOString(),
            DropoffType: 'REGULAR_PICKUP',
            ServiceType: 'FEDEX_GROUND',
            PackagingType: 'YOUR_PACKAGING',
            Shipper: {
                Contact: {
                    PersonName: 'Sender Name',
                    CompanyName: 'Company Name',
                    PhoneNumber: '5555555555'
                },
                Address: {
                    StreetLines: ['Address Line 1'],
                    City: 'Collierville',
                    StateOrProvinceCode: 'TN',
                    PostalCode: '38017',
                    CountryCode: 'US'
                }
            },
            Recipient: {
                Contact: {
                    PersonName: 'Recipient Name',
                    CompanyName: 'Company Receipt Name',
                    PhoneNumber: '5555555555'
                },
                Address: {
                    StreetLines: ['Address Line 1'],
                    City: 'Charlotte',
                    StateOrProvinceCode: 'NC',
                    PostalCode: '28202',
                    CountryCode: 'US',
                    Residential: false
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

export default shipmentRouter;
