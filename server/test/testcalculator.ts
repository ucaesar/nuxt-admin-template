const util = require('util');
import chai from 'chai';
const expect = require('chai').expect;
// const FedExAPI = require('node-shipping-fedex');
const FedExAPI = require('fedex-manager');
console.log(FedExAPI);
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
    debug: true,
    key: 'DtKE3OM6Kb5RrLHt',
    password: 'hS8OZSrhAnlcMafNaRFSDRVUo',
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
console.log(fedex.options.account_number);
fedex.rates(
    {
        ReturnTransitAndCommit: true,
        CarrierCodes: ['FDXE', 'FDXG'],
        RequestedShipment: {
            DropoffType: 'REGULAR_PICKUP',
            // ServiceType: 'FEDEX_GROUND',
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
            // ShippingChargesPayment: {
            //     PaymentType: 'SENDER',
            //     Payor: {
            //         ResponsibleParty: {
            //             AccountNumber: fedex.options.account_number
            //         }
            //     }
            // },
            PackageCount: '1',
            RequestedPackageLineItems: {
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
        }
    },
    function(err, res) {
        if (err) {
            return console.log(err);
        }

        console.log(res);
    }
);


/**
 * Ship
 */
const date = new Date();
fedex.ship({
  RequestedShipment: {
    ShipTimestamp: new Date(date.getTime() + (24*60*60*1000)).toISOString(),
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
        StreetLines: [
          'Address Line 1'
        ],
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
        StreetLines: [
          'Address Line 1'
        ],
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
    RequestedPackageLineItems: [{
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
    }]
  }
}, function(err, res) {
  if(err) {
    return console.log(util.inspect(err, {depth: null}));
  }

  console.log(util.inspect(res, {depth: null}));
});