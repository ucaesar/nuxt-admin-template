import Router from 'koa-router';
const accountRouter = new Router();
const paypal = require('@paypal/checkout-server-sdk');

// Creating an environment
const clientId =
    'AZ_APXEyV36QHoYaK1VAyP5QytPLQ1qxLOMV42f4WT6Jui37sfq5BVkU8dmYmLC0t2t__geSMEcFjx2U';
const clientSecret =
    'EJOancj6mVUzkh8wtRcvBUukHKw_22M41QGVQ6UV40S_23qDpLUwZr3E7mAceoXGmKGvugmnrfZuXtG6';
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

accountRouter.get('/', ctx => {
    ctx.state = 200;
    ctx.response.type = 'text/json';
    ctx.response.body = { result: 'account get' };
});

accountRouter.get('/add', async ctx => {
    const request = new paypal.orders.OrdersCreateRequest();
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
        application_context: {
            return_url: 'http://localhost:3000/api/account/capture',
            cancel_url: 'http://localhost:3000/api/account/cancel'
        }
    });
    const result = (await client.execute(request)).result;
    // ctx.redirect('https://www.sandbox.paypal.com');
    let redirectUrl = '';
    for (const link of result.links) {
        if (link.rel === 'approve') {
            redirectUrl = link.href;
            break;
        }
    }
    ctx.redirect(redirectUrl);
});

accountRouter.get('/capture', async ctx => {
    const token = ctx.request.query.token;
    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});
    const response = await client.execute(request);
    ctx.state = 200;
    ctx.response.type = 'text/json';
    ctx.response.body = response;
});

export default accountRouter;
