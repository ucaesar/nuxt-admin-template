import policyRouter from './policy';
import roleRouter from './role';
import userRouter from './user';
import resourceGroupRouter from './resource-group';
import resourceRouter from './resource';
import shipmentRouter from './shipment';
import accountRouter from './account';
import Router from 'koa-router';

const apiRouter = new Router();

apiRouter.use('/', async (ctx, next) => {
    ctx.respond = true;
    await next();
});
apiRouter.use('/api/policy', policyRouter.routes());
apiRouter.use('/api/role', roleRouter.routes());
apiRouter.use('/api/user', userRouter.routes());
apiRouter.use('/api/resource-group', resourceGroupRouter.routes());
apiRouter.use('/api/resource', resourceRouter.routes());
apiRouter.use('/api/shipment', shipmentRouter.routes());
apiRouter.use('/api/account', accountRouter.routes());
export default apiRouter;
