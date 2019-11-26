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

// 新建一个role
/*
    url: /api/role/
    method: POST
    params: POST参数rolename和description
*/
roleRouter.post('/', async ctx => {
    const e = await getEnforcer();
    const name: string = (ctx.req as any).body.rolename || '';
    const description: string = (ctx.req as any).body.description || '';
    // role的名称必须以大写R结尾
    let result = name.substr(name.length - 1, name.length) === 'R';
    // casbin权限表里不能有此name
    if (result) {
        const roles = e.getAllRoles();
        result = !_.includes(roles, name);
    }
    // role表里不能有此name
    if (result) {
        let r = await Role.findOne({
            where: { rolename: name }
        });
        if (r) {
            result = false;
        }
    }
    if (result) {
        let newrole = await Role.create({ rolename: name, description });
        //找到匿名角色，为所有角色的父角色
        let anonymousRole = await Role.findOne({
            where: {
                rolename: 'anonymousR'
            }
        });
        if (anonymousRole) {
            // 在role表和casbin权限表里建立与匿名角色的继承关系
            await newrole.$add('parents', anonymousRole);
            result = await e.addGroupingPolicy(name, 'anonymousR');
        }
    }
    ctx.response.type = 'text/json';
    ctx.response.body = {
        result,
        name
    };
});

// 往指定id的role上挂父roles
/*
    url: /api/role/:id/parents/
    method: POST
    params: parents [{ id: 1 }, { id: 2 }]
*/
roleRouter.post('/:id/parents/', async ctx => {
    const rid = ctx.params.id;
    const parents = (ctx.req as any).body.parents;
    let r = await Role.findOne({
        where: { id: rid }
    });
    if (r) {
        const e = await getEnforcer();
        const ps = await e.getImplicitRolesForUser(r.rolename);
        if (!Array.isArray(parents)) {
            ctx.response.status = 401;
            return;
        }
        let i;
        for (i = 0; i < parents.length; i++) {
            if (
                !(await Role.findOne({
                    where: {
                        id: parents[i].id
                    }
                }))
            ) {
                ctx.response.status = 401;
                return;
            }
        }
        for (i = 0; i < parents.length; i++) {
            const pr = await Role.findOne({
                where: {
                    id: parents[i].id
                }
            });
            if (pr) {
                if (_.findIndex(ps, pr.rolename) < 0) {
                    // await group.$add('resources', r);
                    await e.addGroupingPolicy(r.rolename, pr.rolename);
                    await r.$add('parents', pr);
                }
            }
        }
        ctx.response.status = 200;
        ctx.response.body = 'not found';
    } else {
        // 找不到指定id的role
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

export default roleRouter;
