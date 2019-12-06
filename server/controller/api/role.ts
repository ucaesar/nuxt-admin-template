import Router from 'koa-router';
const roleRouter = new Router();
// const consola = require('consola')
import _ from 'lodash';
import getEnforcer from '../../lib/enforcer';
import Role from '../../model/Role';
import ResourceGroup from '../../model/ResourceGroup';
import Resource from '../../model/Resource';
import { Op } from 'sequelize';

/**
 * 获取Role列表
 * url: /api/role
 * method: GET
 * params: GET查询参数, start为分页起始位置, count为一页的数量, filter为对name做的匹配关键词
 */
roleRouter.get('/', async ctx => {
    const start = ctx.request.query.start;
    const num = ctx.request.query.count;
    // // consola.info(start + ' ' + num)
    // const e = await getEnforcer();
    // // let result = e.getAllRoles().sort();
    // let result = _.map(e.getAllRoles().sort(), function(str: string) {
    //     return { name: str };
    // });
    // const total = result.length;
    // if (start && start >= 0 && start < total && num && num > 0) {
    //     result = _.slice(result, start, start + num);
    // }
    const total = await Role.count();
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
    const results = await Role.findAll({
        offset,
        limit,
        attributes: ['id', 'rolename', 'description'],
        where: {
            rolename: { [Op.like]: '%' + filter + '%' }
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

/**
 * 获取指定id的Role
 * url: /api/role/:id/ id为role的id
 * method: GET
 * return: { id, rolename, description,
 *           parents: [ {id, rolename, description },  ... ],
 *           groups: [{id, groupname, description }, ... ]
 *         }
 */
roleRouter.get('/:id/', async ctx => {
    const id = ctx.params.id;
    const role = await Role.findOne({
        attributes: ['id', 'rolename', 'description'],
        where: {
            id
        }
    });
    if (role) {
        let parents = await role.$get('parents', {
            attributes: ['id', 'rolename', 'description']
        });
        parents = Array.isArray(parents) ? parents : [parents];
        let groups = await role.$get('resourceGroups', {
            attributes: ['id', 'groupname', 'description']
        });
        groups = Array.isArray(groups) ? groups : [groups];
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = {
            id: role.id,
            rolename: role.rolename,
            description: role.description,
            parents,
            groups
        };
    } else {
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

/**
 *  删除一个role
 *  url: /api/role/:id/ id为要删除的role的id
 *  method: DELETE
 *  return: http code
 */
roleRouter.delete('/:id', async ctx => {
    const delId = ctx.params.id;
    const delRole = await Role.findOne({
        where: {
            id: delId
        }
    });
    if (delRole) {
        const e = await getEnforcer();
        const name = delRole.rolename;
        await e.deleteRole(name);
        await delRole.destroy();
        // ctx.response.type = 'text/json';
        // ctx.response.body = {
        //     result,
        //     name
        // };
        ctx.response.status = 200;
        ctx.response.body = 'deleted';
    } else {
        // 找不到此role
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
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

/**
 *  新建一个role
 *  url: /api/role/
 *  method: POST
 *  params: { rolename, description,
 *            parents: [ { id: 1 }, { id: 2 }, ... ],
 *            groups: [ { id: 1 }, { id: 2 }, ... ]
 *          }
 *  return: { id, rolename, description } 外加http code
 */
roleRouter.post('/', async ctx => {
    const e = await getEnforcer();
    const name: string = (ctx.req as any).body.rolename || '';
    const description: string = (ctx.req as any).body.description || '';
    const parents = (ctx.req as any).body.parents;
    const groups = (ctx.req as any).body.groups;
    // 检验parents和groups参数是否为数组
    if (!Array.isArray(groups) || !Array.isArray(parents)) {
        ctx.response.status = 401;
        return;
    }
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
    if (!result) {
        ctx.response.status = 401;
        return;
    }

    let newrole = await Role.create({ rolename: name, description });
    // 如果不指定parents, 默认parent就是anonymousR, 否则按parents数组添加父role
    if (parents.length <= 0) {
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
    } else {
        let i;
        // 每个parent必须存在
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
                await e.addGroupingPolicy(newrole.rolename, pr.rolename);
                await newrole.$add('parents', pr);
            }
        }
    }
    // 依次添加groups
    let i;
    const permissions = await e.getImplicitPermissionsForUser(newrole.rolename);
    for (i = 0; i < groups.length; i++) {
        const group = await ResourceGroup.findOne({
            where: {
                id: groups[i].id
            }
        });
        // 添加group的时候, 该group下的所有resource必须在casbin表里和该新role挂钩
        if (group) {
            let resources = await group.$get('resources');
            resources = Array.isArray(resources) ? resources : [resources];
            let j;
            for (j = 0; j < resources.length; j++) {
                const res = resources[j] as Resource;
                // 当前资源不在casbin表查出的该newrole的隐藏权限里时，
                // 再往casbin表里添加该role与resource的权限，防止casbin表过度膨胀
                if (
                    _.findIndex(permissions, [
                        newrole.rolename,
                        res.url,
                        res.action
                    ]) < 0
                ) {
                    await e.addPolicy(newrole.rolename, res.url, res.action);
                }
            }
            // 建立新role与group的关系
            await newrole.$add('resourceGroups', group);
        }
    }
    await newrole.save();
    ctx.response.type = 'text/json';
    ctx.response.body = {
        id: newrole.id,
        rolename: newrole.rolename,
        description: newrole.description
    };
});

/**
 * 编辑指定id的Role
 * url: /api/role/:id/ id为role的id
 * method: PUT
 * params: { id?(可以不设置, 以url里的id为准), rolename, description,
 *           parents: [ { id: 1 }, { id: 2 }, ... ],
 *           groups: [ { id: 1 }, { id: 2 }, ... ]
 *         }
 */
roleRouter.put('/:id', async ctx => {
    const rid = ctx.params.id;
    const name: string = (ctx.req as any).body.rolename || '';
    const description: string = (ctx.req as any).body.description || '';
    const parents = (ctx.req as any).body.parents;
    const groups = (ctx.req as any).body.groups;
    const e = await getEnforcer();
});

// 往指定id的role上挂父roles
/**
 *   url: /api/role/:id/parents/
 *   method: POST
 *   params: parents [{ id: 1 }, { id: 2 }]
 */
roleRouter.post('/:id/parents/', async ctx => {
    const rid = ctx.params.id;
    const parents = (ctx.req as any).body.parents;
    let r = await Role.findOne({
        where: { id: rid }
    });
    if (r) {
        if (!Array.isArray(parents)) {
            ctx.response.status = 401;
            return;
        }
        const e = await getEnforcer();
        const ps = await e.getImplicitRolesForUser(r.rolename);
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
        ctx.response.body = 'ok';
    } else {
        // 找不到指定id的role
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

/**
 * 往指定id的role上挂ResourceGroup
 * url: /api/role/:id/resource-groups/
 * method: POST
 * params: groups [{ id: 1 }, { id: 2 }]
 */
roleRouter.post('/:id/resource-groups/', async ctx => {
    const rid = ctx.params.id;
    const groups = (ctx.req as any).body.groups;
    let r = await Role.findOne({
        where: { id: rid }
    });
    if (r) {
        if (!Array.isArray(groups)) {
            ctx.response.status = 401;
            return;
        }
        const e = await getEnforcer();
        const permissions = await e.getImplicitPermissionsForUser(r.rolename);
        let i;
        for (i = 0; i < groups.length; i++) {
            if (
                !(await ResourceGroup.findOne({
                    where: {
                        id: groups[i].id
                    }
                }))
            ) {
                ctx.response.status = 401;
                return;
            }
        }
        for (i = 0; i < groups.length; i++) {
            const group = await ResourceGroup.findOne({
                where: {
                    id: groups[i].id
                }
            });
            if (group) {
                let resources = await group.$get('resources');
                resources = Array.isArray(resources) ? resources : [resources];
                let j;
                for (j = 0; j < resources.length; j++) {
                    const res = resources[j] as Resource;
                    if (
                        _.findIndex(permissions, [
                            r.rolename,
                            res.url,
                            res.action
                        ]) < 0
                    ) {
                        await e.addPolicy(r.rolename, res.url, res.action);
                    }
                }
                await r.$add('resourceGroups', group);
            }
        }
        r.save();
        ctx.response.status = 200;
        ctx.response.body = 'ok';
    } else {
        // 找不到指定id的role
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

export default roleRouter;
