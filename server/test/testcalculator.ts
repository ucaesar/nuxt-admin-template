const util = require('util');
const fs = require('fs');
import chai from 'chai';
const expect = require('chai').expect;
const FedExAPI = require('fedex-manager');
import * as ShipService from '../types/ShipService';
console.log(FedExAPI);

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

// const fedex = new FedExAPI({
//     environment: 'live', // or live
//     debug: true,
//     key: 'DtKE3OM6Kb5RrLHt',
//     password: 'jBpaXDAELGo1jIWwbtG62j4vD',
//     account_number: '510087500',
//     meter_number: '119118039',
//     imperial: true // set to false for metric
// });
const fedex = new FedExAPI({
    environment: 'sandbox', // or live
    debug: false,
    key: 'DtKE3OM6Kb5RrLHt',
    password: '78Ix3kkoKh7QdhyUP6jrIsH8z',
    account_number: '510087500',
    meter_number: '119118039',
    imperial: false // set to false for metric
});
// console.log(fedex);
// const get = {
//     ReturnTransitAndCommit: true,
//     RequestedShipment: {
//         DropoffType: 'REGULAR_PICKUP',
//         ServiceType: 'FEDEX_GROUND',
//         PackagingType: 'YOUR_PACKAGING',
//         Shipper: {
//             Contact: {
//                 PersonName: 'Sender Name',
//                 CompanyName: 'Company Name',
//                 PhoneNumber: '5555555555'
//             },
//             Address: {
//                 StreetLines: ['650 Princess Avenue'],
//                 City: 'Vancouver',
//                 StateOrProvinceCode: 'BC',
//                 PostalCode: 'V6A3E1',
//                 CountryCode: 'CA'
//             }
//         },
//         Recipient: {
//             Contact: {
//                 PersonName: 'Recipient Name',
//                 CompanyName: 'Company Receipt Name',
//                 PhoneNumber: '5555555555'
//             },
//             Address: {
//                 StreetLines: ['650 Princess Avenue'],
//                 City: 'Vancouver',
//                 StateOrProvinceCode: 'BC',
//                 PostalCode: 'V6A3E1',
//                 CountryCode: 'CA',
//                 Residential: false
//             }
//         },
//         ShippingChargesPayment: {
//             PaymentType: 'SENDER',
//             Payor: {
//                 ResponsibleParty: {
//                     AccountNumber: process.env.FDX_ACC_NUM
//                 }
//             }
//         },
//         PackageCount: '1',
//         RequestedPackageLineItems: {
//             SequenceNumber: 1,
//             GroupPackageCount: 1,
//             Weight: {
//                 Units: 'LB',
//                 Value: '50.0'
//             },
//             Dimensions: {
//                 Length: 108,
//                 Width: 5,
//                 Height: 5,
//                 Units: 'IN'
//             },
//             SpecialServicesRequested: [
//                 {
//                     SpecialServiceTypes: 'COD',
//                     CodDetail: {
//                         CodCollectionAmount: {
//                             Currency: 'CAD',
//                             Amount: 1
//                         },
//                         AddTransportationChargesDetail: {
//                             RateTypeBasis: 'ACCOUNT',
//                             ChargeBasis: 'COD_SURCHARGE',
//                             ChargeBasisLevel: 'CURRENT_PACKAGE'
//                         },
//                         CollectionType: 'ANY'
//                     },
//                     SignatureOptionDetail: {
//                         OptionType: 'ADULT'
//                     }
//                 }
//             ]
//         }
//     }
// };
// fedex.rates(get, (err, res) => {
//     if (err) {
//         console.log('results from server err');
//         console.log(err);
//     } else {
//         console.log('success');
//         console.log(res);
//     }
// });

// const get2 = {
//     InEffectAsOfTimestamp: new Date(
//         new Date().getTime() + 24 * 60 * 60 * 1000
//     ).toISOString(),
//     AddressesToValidate: [
//         {
//             Address: {
//                 StreetLines: ['9325 Center Lake Dr', 'Suite 100'],
//                 City: 'Charlotte',
//                 StateOrProvinceCode: 'NC',
//                 PostalCode: '28216',
//                 CountryCode: '00'
//             }
//         },
//         {
//             Address: {
//                 StreetLines: ['601 S College St'],
//                 City: 'Charlotte',
//                 StateOrProvinceCode: 'NC',
//                 PostalCode: '28202',
//                 CountryCode: 'US'
//             }
//         }
//     ]
// };

// fedex.addressvalidation(get2, (err, res) => {
//     if (err) {
//         console.log('results from server err');
//         console.log(err);
//     } else {
//         // console.log('success');
//         // console.log(res);
//     }
// });
// console.log(process.env.FDX_ACC_NUM);
// console.log(fedex.options.account_number);
// fedex.rates(
//     {
//         ReturnTransitAndCommit: true,
//         CarrierCodes: ['FDXE', 'FDXG'],
//         RequestedShipment: {
//             DropoffType: 'REGULAR_PICKUP',
//             // ServiceType: 'FEDEX_GROUND',
//             PackagingType: 'YOUR_PACKAGING',
//             Shipper: {
//                 Contact: {
//                     PersonName: 'Sender Name',
//                     CompanyName: 'Company Name',
//                     PhoneNumber: '5555555555'
//                 },
//                 Address: {
//                     StreetLines: ['1436 Harwood St'],
//                     City: 'Vancouver',
//                     StateOrProvinceCode: 'BC',
//                     PostalCode: 'V6G 1X5',
//                     CountryCode: 'CA'
//                 }
//             },
//             Recipient: {
//                 Contact: {
//                     PersonName: 'Recipient Name',
//                     CompanyName: 'Company Receipt Name',
//                     PhoneNumber: '5555555555'
//                 },
//                 Address: {
//                     StreetLines: ['601 W Cordova St'],
//                     City: 'Vancouver',
//                     StateOrProvinceCode: 'BC',
//                     PostalCode: 'V6B 1G1',
//                     CountryCode: 'CA',
//                     Residential: false
//                 }
//             },
//             ShippingChargesPayment: {
//                 PaymentType: 'SENDER',
//                 Payor: {
//                     ResponsibleParty: {
//                         AccountNumber: fedex.options.account_number
//                     }
//                 }
//             },
//             // PackageCount: '1',
//             // RequestedPackageLineItems: {
//             //     SequenceNumber: 1,
//             //     GroupPackageCount: 1,
//             //     Weight: {
//             //         Units: 'LB',
//             //         Value: '50.0'
//             //     },
//             //     Dimensions: {
//             //         Length: 108,
//             //         Width: 5,
//             //         Height: 5,
//             //         Units: 'IN'
//             //     }
//             // }
//         }
//     },
//     function(err, res) {
//         if (err) {
//             return console.log(err);
//         }

//         console.log(res);
//     }
// );

/**
 * Ship
 */
const date = new Date();
let masterid = '';
const masterItem = {
    RequestedShipment: {
        ShipTimestamp: new Date(
            date.getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
        DropoffType: 'DROP_BOX',
        ServiceType: 'STANDARD_OVERNIGHT',
        // ServiceType: 'FEDEX_GROUND',
        PackagingType: 'YOUR_PACKAGING',
        TotalWeight: {
            Units: 'KG',
            Value: 1
        },
        Shipper: {
            Contact: {
                PersonName: 'Sender Name',
                CompanyName: 'Company Name',
                PhoneNumber: '5555555555'
            },
            Address: {
                StreetLines: ['3845 William St'],
                City: 'Burnaby',
                StateOrProvinceCode: 'BC',
                PostalCode: 'V5C 3J1',
                CountryCode: 'CA'
            }
        },
        Recipient: {
            Contact: {
                PersonName: 'Recipient Name',
                CompanyName: 'Company Receipt Name',
                PhoneNumber: '5555555555'
            },
            Address: {
                StreetLines: ['1111 Mainland St'],
                City: 'Vancouver',
                StateOrProvinceCode: 'BC',
                PostalCode: 'V6B 2T9',
                CountryCode: 'CA',
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
        PackageCount: '3',
        RequestedPackageLineItems: [
            {
                SequenceNumber: 1,
                GroupPackageCount: 1,
                Weight: {
                    Units: 'KG',
                    Value: 1
                },
                Dimensions: {
                    Length: 5,
                    Width: 5,
                    Height: 5,
                    Units: 'CM'
                }
            }
        ]
    }
};
const childItem = {
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
                StreetLines: ['3845 William St'],
                City: 'Burnaby',
                StateOrProvinceCode: 'BC',
                PostalCode: 'V5C 3J1',
                CountryCode: 'CA'
            }
        },
        Recipient: {
            Contact: {
                PersonName: 'Recipient Name',
                CompanyName: 'Company Receipt Name',
                PhoneNumber: '5555555555'
            },
            Address: {
                StreetLines: ['1111 Mainland St'],
                City: 'Vancouver',
                StateOrProvinceCode: 'BC',
                PostalCode: 'V6B 2T9',
                CountryCode: 'CA',
                Residential: false
            }
        },
        // ShippingChargesPayment: {
        //     PaymentType: 'SENDER',
        //     Payor: {
        //         ResponsibleParty: {
        //             AccountNumber: fedex.options.account_number
        //         }
        //     }
        // },
        LabelSpecification: {
            LabelFormatType: 'COMMON2D',
            ImageType: 'PDF',
            LabelStockType: 'PAPER_4X6'
        },
        MasterTrackingId: {},
        PackageCount: '2',
        RequestedPackageLineItems: [
            {
                SequenceNumber: 2,
                GroupPackageCount: 1,
                Weight: {
                    Units: 'LB',
                    Value: '50.0'
                },
                Dimensions: {
                    Length: 5,
                    Width: 5,
                    Height: 5,
                    Units: 'IN'
                }
            }
        ]
    }
};
// fedex.ship(masterItem, function(err, res) {
//     if (err) {
//         return console.log(util.inspect(err, { depth: null }));
//     }

//     //   console.log(util.inspect(res, {depth: null}));
//     if (res.HighestSeverity === 'ERROR'|| res.HighestSeverity === 'FAILURE') {
//         console.log('code:' + res.Notifications[0].Code);
//         console.log('message:' + res.Notifications[0].Message);
//         console.log('severity:' + res.Notifications[0].Severity);
//         console.log('source:' + res.Notifications[0].Source);
//         return;
//     }
//     masterid = res.CompletedShipmentDetail.MasterTrackingId;
//     childItem.RequestedShipment.MasterTrackingId = masterid;
//     console.log(masterid);
//     const a =
//         res.CompletedShipmentDetail.CompletedPackageDetails[0].Label.Parts[0]
//             .Image;
//     const b = Buffer.from(a, 'base64');
//     console.log(b);
//     fs.writeFile('aaa.pdf', b, 'binary', function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('The master file was saved!');
//         }
//     });
//     // fedex.ship(childItem, function(err, res) {
//     //     if (err) {
//     //         return console.log(util.inspect(err, { depth: null }));
//     //     }
//     //     const a =
//     //         res.CompletedShipmentDetail.CompletedPackageDetails[0].Label
//     //             .Parts[0].Image;
//     //     const b = Buffer.from(a, 'base64');
//     //     console.log(b);
//     //     fs.writeFile('bbb.pdf', b, 'binary', function(err) {
//     //         if (err) {
//     //             console.log(err);
//     //         } else {
//     //             console.log('The child file was saved!');
//     //         }
//     //     });
//     // });
// });

/**
 * Rate
 */
const rateDate = new Date();
const rateItem = {
    RequestedShipment: {
        ShipTimestamp: new Date(
            rateDate.getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
        DropoffType: 'DROP_BOX',
        ServiceType: 'STANDARD_OVERNIGHT',
        // ServiceType: 'FEDEX_GROUND',
        PackagingType: 'YOUR_PACKAGING',
        TotalWeight: {
            Units: 'KG',
            Value: 2
        },
        Shipper: {
            Contact: {
                PersonName: 'aaaaa',
                CompanyName: 'Company Name',
                PhoneNumber: '666666'
            },
            Address: {
                StreetLines: ['3845 William St'],
                City: 'Burnaby',
                StateOrProvinceCode: 'BC',
                PostalCode: 'V5C 3J1',
                CountryCode: 'CA'
            }
        },
        Recipient: {
            Contact: {
                PersonName: 'bbbbb',
                CompanyName: 'Company Receipt Name',
                PhoneNumber: '888888'
            },
            Address: {
                StreetLines: ['1111 Mainland St'],
                City: 'Vancouver',
                StateOrProvinceCode: 'BC',
                PostalCode: 'V6B 2T9',
                CountryCode: 'CA',
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
        PackageCount: '2',
        RequestedPackageLineItems: [
            {
                SequenceNumber: 1,
                GroupPackageCount: 1,
                Weight: {
                    Units: 'KG',
                    Value: 1
                },
                Dimensions: {
                    Length: 5,
                    Width: 5,
                    Height: 5,
                    Units: 'CM'
                }
            },
            {
                SequenceNumber: 2,
                GroupPackageCount: 1,
                Weight: {
                    Units: 'KG',
                    Value: 20
                },
                Dimensions: {
                    Length: 5,
                    Width: 5,
                    Height: 5,
                    Units: 'CM'
                }
            }
        ]
    }
};

// fedex.rates(rateItem, (err, res) => {
//     if (err) {
//         console.log('results from server err');
//         console.log(err);
//     } else {
//         console.log('success');
//         console.log(res);
//         const fee =
//             res.RateReplyDetails[0].RatedShipmentDetails[0].ShipmentRateDetail
//                 .TotalBaseCharge.Amount;
//         console.log(fee);
//     }
// });

// fedex.track(
//     {
//         SelectionDetails: {
//             PackageIdentifier: {
//                 Type: 'TRACKING_NUMBER_OR_DOORTAG',
//                 Value: '123456789012'
//             }
//         }
//     },
//     function(err, res) {
//         if (err) {
//             return console.log(err);
//         }

//         console.log(res);
//         const response = res as ShipService.ITrackReply;
//         const sorted = sortTrackTimestamp(response.CompletedTrackDetails[0].TrackDetails[0].DatesOrTimes);
//         console.log(sorted);
//     }
// );

fedex.deleteshipment({
    TrackingId: {
        TrackingIdType: 'FEDEX', // EXPRESS || FEDEX || GROUND || USPS
        TrackingNumber: '794619051432'
    },
    DeletionControl: 'DELETE_ALL_PACKAGES' // or DELETE_ONE_PACKAGE or LEGACY
}, function(err, res) {
  if (err) {
    return console.log(util.inspect(err, {depth: null}));
  }

  console.log(util.inspect(res, {depth: 4}));
});

// const tracker = require('delivery-tracker');
// const courier = tracker.courier(tracker.COURIER.FEDEX.CODE);
// const trace_number = '774557410164';
// courier.trace(trace_number, function(err, result) {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(result);
// });

// const xml2js = require('xml2js');
// const parser = new xml2js.Parser();
// const path = require('path');
// const filepath = path.join(
//     __dirname,
//     '..',
//     '..',
//     'node_modules',
//     'fedex-manager',
//     'lib',
//     'wsdl',
//     'RateService_v24.wsdl'
// );
// fs.readFile(filepath, function(err, data) {
//     if (err) {
//         console.log('read file error');
//         return;
//     }
//     parser.parseString(data, function(err, result) {
//         if (err) {
//             console.log('parse xml error');
//             return;
//         }
//         console.dir(result);
//         console.log('Done');
//     });
// });

// import FedExAPI from 'node-shipping-fedex';
// const FedExAPI = require('node-shipping-fedex');
// const fedex1 = new FedExAPI({
//     environment: 'sandbox', // or live
//     debug: false,
//     key: 'DtKE3OM6Kb5RrLHt',
//     password: 'hS8OZSrhAnlcMafNaRFSDRVUo',
//     account_number: '510087500',
//     meter_number: '119118039',
//     imperial: false // set to false for metric
// });
// fedex1.track(
//     {
//         SelectionDetails: {
//             PackageIdentifier: {
//                 Type: 'TRACKING_NUMBER_OR_DOORTAG',
//                 Value: '774557410164'
//             }
//         }
//     },
//     function(err, res) {
//         if (err) {
//             return console.log(err);
//         }

//         console.log(res);
//     }
// );
