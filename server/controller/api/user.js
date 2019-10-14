const userRouter = require('koa-router')()
// const getEnforcer = require("../../lib/enforcer");
const User = require('../../model/user')

userRouter.get('/', async (ctx, next) => {
    // const e = await getEnforcer();
    ctx.response.type = 'text/json'
    ctx.response.body = await User.findAll({
        attributes: ['id', 'username']
    })
    // await next();
})

// 返回当前用户能够访问的路径
userRouter.get('/authnavs', ctx => {
    const u = ctx.state.currentUser
    ctx.state = 200
    ctx.response.type = 'text/json'
    ctx.response.body = u.authNavs
})

module.exports = userRouter
