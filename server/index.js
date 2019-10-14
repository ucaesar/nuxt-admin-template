'use strict'

const Koa = require('koa')

const serve = require('koa-static')

const bodyParser = require('koa-bodyparser')

const session = require('koa-session')

const router = require('koa-router')()

const { Nuxt, Builder } = require('nuxt')

const config = require('../nuxt.config')

const auth = require('./middlewares/auth')

const urlWithoutLocale = require('./lib/utils').urlWithoutLocale

const SessionAuthenticator = require('./SessionAuthenticator')

// const { encode, decode } = require("../lib/encryption");

const { sequelize } = require('./db')

const apiRouter = require('./controller/api/api')

const app = new Koa()

app.keys = ['qwert12345']

const CONFIG = {
    key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 'session',
    autoCommit: true /** (boolean) automatically commit headers (default true) */,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: false /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
    renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
}

sequelize
    .authenticate()
    .then(() => {
        console.log('database connected')
    })
    .catch(err => {
        console.error('database connect failed' + err)
    })

sequelize
    .sync()
    .then(() => {
        console.log('init db ok')
    })
    .catch(err => {
        console.log('init db error', err)
    })

app.use(serve('.'))

app.use(bodyParser())

app.use(session(CONFIG, app))

// 在进入权限检验之前，要去掉url里的locale前缀
app.use(async (ctx, next) => {
    ctx.request.url = urlWithoutLocale(ctx.originalUrl)
    await next()
})

const authenticator = new SessionAuthenticator()
app.use(auth(authenticator))

router.post('/api/login', async (ctx, next) => {
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

// 暂时统一到api/login接口去
router.post('/adminlogin', async (ctx, next) => {
    // ctx.session.x_session = encode('2e592d50-d535-11e9-881c-31c34ad71a1b');
    // ctx.session.username = "aaa";
    // ctx.state.currentUser = { username: "aaa" };
    await authenticator.login(ctx)
    // 登陆后跳转
    ctx.redirect('/testusermain')
    // await next();
})

router.post('/api/logout', async (ctx, next) => {
    authenticator.logout(ctx)
    ctx.status = 200
    ctx.response.type = 'text/json'
    ctx.response.body = {
        result: true
    }
    // await next()
})

// 测试login成功后的跳转
router.get('/testusermain', (ctx, next) => {
    const { username } = ctx.state.currentUser
    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>hello ' + username + ' auth</h1>'
    // ctx.response.body = "<h1>hello " + " auth</h1>";
})

app.use(router.routes())
app.use(apiRouter.routes())

// 往url里添加回之前去掉的locale部分后，再进入到nuxt
app.use(async (ctx, next) => {
    ctx.request.url = ctx.originalUrl
    await next()
})

config.dev = app.env !== 'production'

async function initNuxt(nuxt) {
    // Instantiate nuxt.js

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }
}

const nuxt = new Nuxt(config)
initNuxt(nuxt)

app.use(async (ctx, next) => {
    await next()
    if (ctx.originalUrl.startsWith('/api')) {
        return
    }
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
})

module.exports = app
