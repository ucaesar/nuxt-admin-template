import Router from 'koa-router'
import SessionAuthenticator from '../../SessionAuthenticator'
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


const authenticator = new SessionAuthenticator()
userRouter.post('/login', async (ctx, next) => {
    // ctx.session.x_session = encode('2e592d50-d535-11e9-881c-31c34ad71a1b');
    // ctx.session.username = "aaa";
    // ctx.state.currentUser = { username: "aaa" };
    await authenticator.login(ctx)
    // 根据currentUser的内容返回登陆是否成功的结果
    ctx.response.type = 'text/json'
    const loginResult =
        ctx.state.currentUser && ctx.state.currentUser.username !== 'anonymous'
    // 登陆成功，返回200状态，否则返回401
    ctx.status = loginResult ? 200 : 401
    const url = loginResult ? '/superadmin' : '/'
    ctx.response.body = {
        redirect: url
    }
    // await next()
})

userRouter.post('/logout', ctx => {
    authenticator.logout(ctx)
    ctx.status = 200
    ctx.response.type = 'text/json'
    ctx.response.body = {
        redirect: '/login'
    }
    // await next()
})

// 暂时统一到api/login接口去
userRouter.post('/adminlogin', async (ctx, next) => {
    // ctx.session.x_session = encode('2e592d50-d535-11e9-881c-31c34ad71a1b');
    // ctx.session.username = "aaa";
    // ctx.state.currentUser = { username: "aaa" };
    await authenticator.login(ctx)
    // 登陆后跳转
    ctx.redirect('/testusermain')
    // await next();
})

export default userRouter
