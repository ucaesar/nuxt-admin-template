import Router from 'koa-router';
const policyRouter = new Router();
import getEnforcer from '../../lib/enforcer';

policyRouter.get('/', async (ctx, next) => {
    const e = await getEnforcer();
    ctx.response.type = 'text/json';
    ctx.response.body = e.getPolicy();
    // await next();
});

export default policyRouter;
