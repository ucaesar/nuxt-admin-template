const paypal = require('@paypal/checkout-server-sdk');

// Creating an environment
let clientId =
    'AULSxeAupnBA5LJZ14TbuayPuakem4Y0_eYg4FmXu_rL10-gLCQxG3VdO8xICxocFYdLAqoweda4ta8J';
let clientSecret =
    'EFRdk2PvbVczvwmTJLGuI0hhkq38uJe3ZboB0dTfYNLl7EB-yBIsDYlrBnjrN1PCb_EymRFQrixm5LQS';
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// Construct a request object and set desired parameters
// Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
let request = new paypal.orders.OrdersCreateRequest();
request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
        {
            amount: {
                currency_code: 'CAD',
                value: '200.00'
            }
        }
    ],
    // redirect_urls: {
    //     return_url: 'http://www.expressweb.test/return',
    //     cancel_url: 'http://www.expressweb.test/cancel'
    // }
    application_context: {
        return_url: 'http://www.baidu.com',
        cancel_url: 'http://www.github.com'
    }
});

// Call API with your client and get a response for your call
let createOrder = async function() {
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Order: ${JSON.stringify(response.result)}`);
};
createOrder();

let captureOrder = async function(orderId) {
    request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Capture: ${JSON.stringify(response.result)}`);
};

// let capture = captureOrder('43C03629LP388773K');

// let Response = {
//     statusCode: 201,
//     headers: {
//         'cache-control': 'max-age=0, no-cache, no-store, must-revalidate',
//         'content-length': '501',
//         'content-type': 'application/json',
//         date: 'Wed, 29 Jul 2020 03:28:38 GMT',
//         'paypal-debug-id': '65373eb5f58e5',
//         connection: 'close'
//     },
//     result: {
//         id: '6E307438UP097883U',
//         links: [
//             {
//                 href:
//                     'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U',
//                 rel: 'self',
//                 method: 'GET'
//             },
//             {
//                 href:
//                     'https://www.sandbox.paypal.com/checkoutnow?token=6E307438UP097883U',
//                 rel: 'approve',
//                 method: 'GET'
//             },
//             {
//                 href:
//                     'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U',
//                 rel: 'update',
//                 method: 'PATCH'
//             },
//             {
//                 href:
//                     'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U/capture',
//                 rel: 'capture',
//                 method: 'POST'
//             }
//         ],
//         status: 'CREATED'
//     }
// };
// let Order = {
//     id: '6E307438UP097883U',
//     links: [
//         {
//             href:
//                 'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U',
//             rel: 'self',
//             method: 'GET'
//         },
//         {
//             href:
//                 'https://www.sandbox.paypal.com/checkoutnow?token=6E307438UP097883U',
//             rel: 'approve',
//             method: 'GET'
//         },
//         {
//             href:
//                 'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U',
//             rel: 'update',
//             method: 'PATCH'
//         },
//         {
//             href:
//                 'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U/capture',
//             rel: 'capture',
//             method: 'POST'
//         }
//     ],
//     status: 'CREATED'
// };

// let Response = {
//     statusCode: 201,
//     headers: {
//         'cache-control': 'max-age=0, no-cache, no-store, must-revalidate',
//         'content-length': '1428',
//         'content-type': 'application/json',
//         date: 'Wed, 29 Jul 2020 04:12:39 GMT',
//         'paypal-debug-id': '8929fc5855c14',
//         connection: 'close'
//     },
//     result: {
//         id: '6E307438UP097883U',
//         purchase_units: [
//             {
//                 reference_id: 'default',
//                 shipping: {
//                     name: { full_name: 'John Doe' },
//                     address: {
//                         address_line_1: '1 Maire-Victorin',
//                         admin_area_2: 'Toronto',
//                         admin_area_1: 'ON',
//                         postal_code: 'M5A 1E1',
//                         country_code: 'CA'
//                     }
//                 },
//                 payments: {
//                     captures: [
//                         {
//                             id: '37329593NC169014N',
//                             status: 'COMPLETED',
//                             amount: { currency_code: 'CAD', value: '100.00' },
//                             final_capture: true,
//                             seller_protection: {
//                                 status: 'ELIGIBLE',
//                                 dispute_categories: [
//                                     'ITEM_NOT_RECEIVED',
//                                     'UNAUTHORIZED_TRANSACTION'
//                                 ]
//                             },
//                             seller_receivable_breakdown: {
//                                 gross_amount: {
//                                     currency_code: 'CAD',
//                                     value: '100.00'
//                                 },
//                                 paypal_fee: {
//                                     currency_code: 'CAD',
//                                     value: '3.20'
//                                 },
//                                 net_amount: {
//                                     currency_code: 'CAD',
//                                     value: '96.80'
//                                 }
//                             },
//                             links: [
//                                 {
//                                     href:
//                                         'https://api.sandbox.paypal.com/v2/payments/captures/37329593NC169014N',
//                                     rel: 'self',
//                                     method: 'GET'
//                                 },
//                                 {
//                                     href:
//                                         'https://api.sandbox.paypal.com/v2/payments/captures/37329593NC169014N/refund',
//                                     rel: 'refund',
//                                     method: 'POST'
//                                 },
//                                 {
//                                     href:
//                                         'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U',
//                                     rel: 'up',
//                                     method: 'GET'
//                                 }
//                             ],
//                             create_time: '2020-07-29T04:12:39Z',
//                             update_time: '2020-07-29T04:12:39Z'
//                         }
//                     ]
//                 }
//             }
//         ],
//         payer: {
//             name: { given_name: 'John', surname: 'Doe' },
//             email_address: 'sb-l49zp2742291@personal.example.com',
//             payer_id: 'R4PUAJWAUGG8G',
//             address: { country_code: 'CA' }
//         },
//         links: [
//             {
//                 href:
//                     'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U',
//                 rel: 'self',
//                 method: 'GET'
//             }
//         ],
//         status: 'COMPLETED'
//     }
// };
// let Capture = {
//     id: '6E307438UP097883U',
//     purchase_units: [
//         {
//             reference_id: 'default',
//             shipping: {
//                 name: { full_name: 'John Doe' },
//                 address: {
//                     address_line_1: '1 Maire-Victorin',
//                     admin_area_2: 'Toronto',
//                     admin_area_1: 'ON',
//                     postal_code: 'M5A 1E1',
//                     country_code: 'CA'
//                 }
//             },
//             payments: {
//                 captures: [
//                     {
//                         id: '37329593NC169014N',
//                         status: 'COMPLETED',
//                         amount: { currency_code: 'CAD', value: '100.00' },
//                         final_capture: true,
//                         seller_protection: {
//                             status: 'ELIGIBLE',
//                             dispute_categories: [
//                                 'ITEM_NOT_RECEIVED',
//                                 'UNAUTHORIZED_TRANSACTION'
//                             ]
//                         },
//                         seller_receivable_breakdown: {
//                             gross_amount: {
//                                 currency_code: 'CAD',
//                                 value: '100.00'
//                             },
//                             paypal_fee: { currency_code: 'CAD', value: '3.20' },
//                             net_amount: { currency_code: 'CAD', value: '96.80' }
//                         },
//                         links: [
//                             {
//                                 href:
//                                     'https://api.sandbox.paypal.com/v2/payments/captures/37329593NC169014N',
//                                 rel: 'self',
//                                 method: 'GET'
//                             },
//                             {
//                                 href:
//                                     'https://api.sandbox.paypal.com/v2/payments/captures/37329593NC169014N/refund',
//                                 rel: 'refund',
//                                 method: 'POST'
//                             },
//                             {
//                                 href:
//                                     'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U',
//                                 rel: 'up',
//                                 method: 'GET'
//                             }
//                         ],
//                         create_time: '2020-07-29T04:12:39Z',
//                         update_time: '2020-07-29T04:12:39Z'
//                     }
//                 ]
//             }
//         }
//     ],
//     payer: {
//         name: { given_name: 'John', surname: 'Doe' },
//         email_address: 'sb-l49zp2742291@personal.example.com',
//         payer_id: 'R4PUAJWAUGG8G',
//         address: { country_code: 'CA' }
//     },
//     links: [
//         {
//             href:
//                 'https://api.sandbox.paypal.com/v2/checkout/orders/6E307438UP097883U',
//             rel: 'self',
//             method: 'GET'
//         }
//     ],
//     status: 'COMPLETED'
// };
