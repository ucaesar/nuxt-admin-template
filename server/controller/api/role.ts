import Router from 'koa-router';
const roleRouter = new Router();
// const consola = require('consola')
import _ from 'lodash';
import getEnforcer from '../../lib/enforcer';
import Role from '../../model/Role';

// 获取所有role
roleRouter.get('/', async ctx => {
    const start = ctx.request.query.start;
    const num = ctx.request.query.num;
    // consola.info(start + ' ' + num)
    const e = await getEnforcer();
    // let result = e.getAllRoles().sort();
    let result = _.map(e.getAllRoles().sort(), function(str: string) {
        return { name: str };
    });
    const total = result.length;
    if (start && start >= 0 && start < total && num && num > 0) {
        result = _.slice(result, start, start + num);
    }
    ctx.response.type = 'text/json';
    ctx.response.body = {
        result,
        total
    };
    // await next();
});

// 删除一个role
roleRouter.delete('/:name', async ctx => {
    const e = await getEnforcer();
    const name = ctx.params.name;
    const result = await e.deleteRole(name);
    ctx.response.type = 'text/json';
    ctx.response.body = {
        result,
        name
    };
});

// 增加一个role
// roleRouter.put('/:name', async ctx => {
//     const e = await getEnforcer();
//     const name = ctx.params.name;
//     let result = name.substr(name.length - 1, name.length) === 'R';
//     if (result) {
//         const roles = e.getAllRoles();
//         result = !_.includes(roles, name);
//     }
//     if (result) {
//         result = await e.addGroupingPolicy(name, 'anonymousR');
//     }
//     ctx.response.type = 'text/json';
//     ctx.response.body = {
//         result,
//         name
//     };
// });

// 增加一个role
roleRouter.post('/', async ctx => {
    const e = await getEnforcer();
    const name: string = (ctx.req as any).body.rolename || '';
    const description: string = (ctx.req as any).body.description || '';
    let result = name.substr(name.length - 1, name.length) === 'R';
    if (result) {
        const roles = e.getAllRoles();
        result = !_.includes(roles, name);
    }
    if (result) {
        let r = await Role.findOne({
            where: { rolename: name }
        });
        if(r) {
            result = false;
        }
    }
    if (result) {
        result = await e.addGroupingPolicy(name, 'anonymousR');
    }
    ctx.response.type = 'text/json';
    ctx.response.body = {
        result,
        name
    };
});
export default roleRouter;
