import Router from 'koa-router'
const userRouter = new Router()
// const getEnforcer = require("../../lib/enforcer");
import User from '../../model/user'

userRouter.get('/', async (ctx, next) => {
    // const e = await getEnforcer();
    ctx.response.type = 'text/json'
    ctx.response.body = await User.findAll({
        attributes: ['id', 'username']
    })
    // await next();
})

// 返回当前用户能够访问的路径
userRouter.get('/permissions', ctx => {
    const u = ctx.state.currentUser
    ctx.state = 200
    ctx.response.type = 'text/json'
    ctx.response.body = u.authNavs
})

export default userRouter
