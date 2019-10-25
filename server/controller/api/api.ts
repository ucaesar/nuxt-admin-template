import policyRouter from './policy'
import roleRouter from './role'
import userRouter from './user'
import Router from 'koa-router'
const apiRouter = new Router()

apiRouter.use('/api/policy', policyRouter.routes())
apiRouter.use('/api/roles', roleRouter.routes())
apiRouter.use('/api/user', userRouter.routes())
export default apiRouter
