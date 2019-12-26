import Router from 'koa-router';
import SessionAuthenticator from '../../SessionAuthenticator';
const userRouter = new Router();
// const getEnforcer = require("../../lib/enforcer");
import User from '../../model/User';
import { Op, where } from 'sequelize';

/**
 * 获取User列表
 * url: /api/user
 * method: GET
 * params: GET查询参数, start为分页起始位置, count为一页的数量, filter为对name做的匹配关键词
 */
userRouter.get('/', async (ctx, next) => {
    // const e = await getEnforcer();
    const start = ctx.request.query.start;
    const num = ctx.request.query.count;
    const total = await User.count();
    const filter = ctx.request.query.filter ? ctx.request.query.filter : '';
    let offset = 0;
    let limit = total;
    if (start && Number(start) >= 0 && Number(start) < total) {
        offset = Number(start);
    }
    if (num && Number(num) > 0) {
        if (offset + Number(num) <= total) {
            limit = Number(num);
        } else {
            limit = total - offset;
        }
    }
    const results = await User.findAll({
        offset,
        limit,
        attributes: ['id', 'username'],
        where: {
            username: { [Op.like]: '%' + filter + '%' }
        }
    });
    ctx.response.type = 'text/json';
    ctx.response.status = 200;
    ctx.response.body = {
        results,
        total
    };
    // await next();
});

// 返回当前用户能够访问的路径
userRouter.get('/permissions', ctx => {
    const u = ctx.state.currentUser;
    ctx.state = 200;
    ctx.response.type = 'text/json';
    ctx.response.body = u.authNavs;
});

const authenticator = new SessionAuthenticator();
userRouter.post('/login', async (ctx, next) => {
    // ctx.session.x_session = encode('2e592d50-d535-11e9-881c-31c34ad71a1b');
    // ctx.session.username = "aaa";
    // ctx.state.currentUser = { username: "aaa" };
    await authenticator.login(ctx);
    // 根据currentUser的内容返回登陆是否成功的结果
    ctx.response.type = 'text/json';
    const loginResult =
        ctx.state.currentUser && ctx.state.currentUser.username !== 'anonymous';
    // 登陆成功，返回200状态，否则返回401
    ctx.status = loginResult ? 200 : 401;
    const url = loginResult ? '/superadmin' : '/';
    ctx.response.body = {
        redirect: url
    };
    // await next()
});

userRouter.post('/logout', ctx => {
    authenticator.logout(ctx);
    ctx.status = 200;
    ctx.response.type = 'text/json';
    ctx.response.body = {
        redirect: '/login'
    };
    // await next()
});

// 暂时统一到api/login接口去
userRouter.post('/adminlogin', async (ctx, next) => {
    // ctx.session.x_session = encode('2e592d50-d535-11e9-881c-31c34ad71a1b');
    // ctx.session.username = "aaa";
    // ctx.state.currentUser = { username: "aaa" };
    await authenticator.login(ctx);
    // 登陆后跳转
    ctx.redirect('/testusermain');
    // await next();
});

export default userRouter;
