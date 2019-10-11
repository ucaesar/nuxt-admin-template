const apiRouter = require('koa-router')();
const policyRouter = require('./policy');
const roleRouter = require('./role');
const userRouter = require('./user');

apiRouter.use('/api/policy', policyRouter.routes());
apiRouter.use('/api/role', roleRouter.routes());
apiRouter.use('/api/user', userRouter.routes());
module.exports = apiRouter;
