import policyRouter from './policy';
import roleRouter from './role';
import userRouter from './user';
import resourceGroupRouter from './resource-group';
import Router from 'koa-router';

const apiRouter = new Router();

apiRouter.use('/', async (ctx, next) => {
    ctx.respond = true;
    await next();
});
apiRouter.use('/api/policy', policyRouter.routes());
apiRouter.use('/api/roles', roleRouter.routes());
apiRouter.use('/api/user', userRouter.routes());
apiRouter.use('/api/resource-group', resourceGroupRouter.routes());
export default apiRouter;
