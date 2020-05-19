import Router from 'koa-router';
import getEnforcer from '../../lib/enforcer';
const policyRouter = new Router();

policyRouter.get('/', async (ctx, next) => {
    const e = await getEnforcer();
    ctx.response.type = 'text/json';
    ctx.response.body = e.getPolicy();
    // await next();
});

export default policyRouter;
