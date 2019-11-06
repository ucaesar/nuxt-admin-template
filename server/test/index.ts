import * as http from 'http';
import bodyParser from 'body-parser';
import connect from 'connect';
import Koa from 'koa';
import serve from 'koa-static';
import session from 'koa-session';
import Router from 'koa-router';
import auth from '../middlewares/auth';
import urlWithoutLocale from '../lib/utils';
import SessionAuthenticator from '../SessionAuthenticator';
import { sequelize, connectdb } from '../db';
import apiRouter from '../controller/api/api';

const koa_app = new Koa();

const router = new Router();

koa_app.keys = ['qwert12345'];

const CONFIG: Partial<session.opts> = {
    key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 'session',
    // autoCommit: false /** (boolean) automatically commit headers (default true) */,
    overwrite: true /** (boolean) can overwrite or not (default true) */,
    httpOnly: true /** (boolean) httpOnly or not (default true) */,
    signed: false /** (boolean) signed or not (default true) */,
    rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
    renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
} as Partial<session.opts>;

async function initServer() {
    await connectdb(sequelize);

    // 默认koa不处理所有的respnose,在apiRouter里，才把respond设为真让koa处理response
    koa_app.use(async (ctx, next) => {
        // ctx.respond = false;
        await next();
    });

    koa_app.use(serve('.'));

    // app.use(bodyParser())

    koa_app.use(session(CONFIG, koa_app));

    // 在进入权限检验之前，要去掉url里的locale前缀
    koa_app.use(async (ctx, next) => {
        ctx.request.url = urlWithoutLocale(ctx.originalUrl);
        await next();
    });

    const authenticator = new SessionAuthenticator();
    koa_app.use(auth(authenticator));
    koa_app.use(apiRouter.routes());

    // 往url里添加回之前去掉的locale部分后，再进入到nuxt
    koa_app.use(async (ctx, next) => {
        ctx.request.url = ctx.originalUrl;
        await next();
    });
}

export async function initConnect(app: connect.Server) {
    const r = await initServer();
    app.use(bodyParser.json());
    let fn: (
        req: http.IncomingMessage,
        res: http.ServerResponse
    ) => void = async function(req, res) {
        let koa_fn = koa_app.callback();
        await koa_fn(req, res);
    };

    app.use(fn);
}
