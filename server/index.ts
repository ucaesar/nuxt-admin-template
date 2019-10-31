import * as http from 'http'

import Koa from 'koa'

import serve from 'koa-static'

import bodyParser from 'koa-bodyparser'

import session from 'koa-session'

import Router from 'koa-router'

import { Nuxt, Builder } from 'nuxt'

import config from '../nuxt.config'

import auth from './middlewares/auth'

import urlWithoutLocale from './lib/utils'

import SessionAuthenticator from './SessionAuthenticator'

import sequelize from './db'

import apiRouter from './controller/api/api'

const app = new Koa()

const router = new Router()

app.keys = ['qwert12345']

const CONFIG: Partial<session.opts> = {
    key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 'session',
    // autoCommit: true /** (boolean) automatically commit headers (default true) */,
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

app.use(async (ctx, next)=>{
    ctx.respond = false
    await next()
})

app.use(serve('.'))

// app.use(bodyParser())

app.use(session(CONFIG, app))

// app.use(async (ctx,next)=>{
//     ctx.session = (<any>(ctx.req)).session
//     await next()
// })

// 在进入权限检验之前，要去掉url里的locale前缀
app.use(async (ctx, next) => {
    ctx.request.url = urlWithoutLocale(ctx.originalUrl)
    await next()
})

const authenticator = new SessionAuthenticator()
app.use(auth(authenticator))
app.use(apiRouter.routes())

// 往url里添加回之前去掉的locale部分后，再进入到nuxt
app.use(async (ctx, next) => {
    ctx.request.url = ctx.originalUrl
    await next()
})

// config.dev = app.env !== 'production'

// async function initNuxt(nuxt) {
//     // Instantiate nuxt.js
//     // Build in development
//     if (config.dev) {
//         const builder = new Builder(nuxt)
//         await builder.build()
//     } else {
//         await nuxt.ready()
//     }
// }

// const nuxt = new Nuxt(config)
// initNuxt(nuxt)

// app.use(async (ctx: any, next) => {
//     await next()
//     if (ctx.originalUrl.startsWith('/api')) {
//         return
//     }
//     ctx.status = 200
//     ctx.respond = false // Bypass Koa's built-in response handling
//     ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
//     try{
//         nuxt.render(ctx.req, ctx.res)
//     }catch(error) {
//         console.log('nuxt throw error:!!!!!!!!!!!!!!')
//         console.log(error)
//     }
// })

// app.listen(56556)

// export default app

export default function(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    next: Function
) {
    // req is the Node.js http request object
    // res is the Node.js http response object
    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    // console.log("koa logger: " + req.url)
    const urlstr: string = req.url ? req.url : ''
    if (
        !(
            urlstr.startsWith('/vuetify.css.map') ||
            urlstr.startsWith('/_loading') ||
            urlstr.startsWith('/sw.js') ||
            urlstr.startsWith('/__webpack_hmr') ||
            urlstr.startsWith('/_nuxt')
        )
    ) {
        let route_fn = app.callback()
        route_fn(req, res)
    }
    if (!urlstr.startsWith('/api/')) {
        next()
    }
}
