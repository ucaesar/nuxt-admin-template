import Router from 'koa-router';
const resourceGroupRouter = new Router();
import ResourceGroup from '../../model/ResourceGroup';
import { Op } from 'sequelize';
import _ from 'lodash';
import Resource from '../../model/Resource';

/**
 * 获取指定id的ResourceGroup的所有子group
 * url: /api/resource-group/:id/children/ id为group的id, id为1时表示获取所有顶层group
 * method: GET
 */
resourceGroupRouter.get('/:id/children', async (ctx, next) => {
    const parentId = ctx.params.id;
    // 获取父group
    const parentGroup = await ResourceGroup.findOne({
        where: {
            id: parentId
        }
    });
    if (parentGroup) {
        // 获取分页参数
        const start = ctx.request.query.start;
        const num = ctx.request.query.count;
        // 得到父group下的所有子group
        let children = await parentGroup.$get('children', {
            attributes: ['id', 'groupname', 'description'],
            where: {
                id: { [Op.ne]: parentId }
            }
        });
        // 如果子group为单个,sequelize默认返回的是单个实例,需要包进一个数组后再作为返回结果
        children = Array.isArray(children) ? children : [children];
        const total = children.length;
        let result = children;
        if (
            start &&
            Number(start) >= 0 &&
            Number(start) < total &&
            num &&
            Number(num) > 0
        ) {
            result = _.slice(
                result,
                Number(start),
                Number(start) + Number(num)
            );
        }
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = {
            results: result,
            total
        };
    } else {
        // 找不到父group
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

/**
 * 往指定id的ResourceGroup添加一个子group
 * url: /api/resource-group/:id/children/ id为group的id, id为1时表示添加顶层group
 * method: POST
 * params: { groupname, description, resources: [ { id: 1 }, { id: 2 }, ... ] }
 * return: { id, groupname, description } 外加http code
 */
resourceGroupRouter.post('/:id/children', async ctx => {
    const parentId = ctx.params.id;
    const groupname: string = (ctx.req as any).body.groupname || '';
    const description: string = (ctx.req as any).body.description || '';
    const resoures = (ctx.req as any).body.resources;

    if (
        await ResourceGroup.findOne({
            where: {
                groupname
            }
        })
    ) {
        // groupname已经存在
        ctx.response.status = 401;
        ctx.response.body = 'this groupname exists';
        return;
    }
    let i;
    for (i = 0; i < resoures.length; i++) {
        if (
            !(await Resource.findOne({
                where: {
                    id: resoures[i].id
                }
            }))
        ) {
            ctx.response.status = 401;
            return;
        }
    }
    // 获取父group
    const parentGroup = await ResourceGroup.findOne({
        where: {
            id: parentId
        }
    });
    if (parentGroup) {
        const newgroup = await ResourceGroup.create({
            groupname,
            description
        });
        for (i = 0; i < resoures.length; i++) {
            const r = await Resource.findOne({
                where: {
                    id: resoures[i].id
                }
            });
            if (r) {
                await newgroup.$add('resources', r);
            }
        }
        // 往父group里添加新建立的group
        await parentGroup.$add('children', newgroup);
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = newgroup;
    } else {
        // 找不到父group
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

/**
 * 删除指定id的ResourceGroup
 * url: /api/resource-group/:id id为要删除的group的id
 * method: DELETE
 */
resourceGroupRouter.delete('/:id', async ctx => {
    const delId = ctx.params.id;
    // 找到要删除的group
    const delGroup = await ResourceGroup.findOne({
        where: {
            id: delId
        }
    });
    if (delGroup) {
        // 得到父group下的所有子group
        await delGroup.destroy();
        ctx.response.status = 200;
        ctx.response.body = 'deleted';
    } else {
        // 找不到此group
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

// 获取指定id的ResourceGroup下的所有resource
// resourceGroupRouter.get('/:id/resource', async ctx => {});

/**
 * 获取指定id的ResourceGroup
 * url: /api/resource-group/:id/ id为group的id
 * method: GET
 * return: { id, groupname, description, resources: [ {id, name, description, url, acition }, {id, name, description, url, acition }, ... ] }
 */
resourceGroupRouter.get('/:id/', async ctx => {
    const id = ctx.params.id;
    // 找到此group
    const group = await ResourceGroup.findOne({
        attributes: ['id', 'groupname', 'description'],
        where: {
            id
        }
    });

    if (group) {
        let rs = await group.$get('resources', {
            attributes: ['id', 'name', 'description', 'url', 'action']
        });
        rs = Array.isArray(rs) ? rs : [rs];
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = {
            id: group.id,
            groupname: group.groupname,
            description: group.description,
            resources: rs
        };
    } else {
        // 找不到此group
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

/**
 * 编辑指定id的ResourceGroup
 * url: /api/resource-group/:id/ id为group的id
 * method: PUT
 * params: { id?(可以不设置, 以url里的id为准), groupname, description, resources: [ { id }, { id }, ... ] }
 */
resourceGroupRouter.put('/:id/', async ctx => {
    const gid = ctx.params.id;
    const groupname: string = (ctx.req as any).body.groupname || '';
    const description: string = (ctx.req as any).body.description || '';
    let resources = (ctx.req as any).body.resources;
    // 找到此group
    const group = await ResourceGroup.findOne({
        attributes: ['id', 'groupname', 'description'],
        where: {
            id: gid
        }
    });
    // 存在非此id而groupname为此groupname的group, 报401参数错
    if (
        await ResourceGroup.findOne({
            where: {
                id: { [Op.ne]: gid },
                groupname
            }
        })
    ) {
        // groupname已经存在
        ctx.response.status = 401;
        ctx.response.body = 'this groupname exists';
        return;
    }
    if (group) {
        group.groupname = groupname;
        group.description = description;
        let currentResources = await group.$get('resources');
        currentResources = Array.isArray(currentResources)
            ? currentResources
            : [currentResources];
        // 删除不存在参数resources里的rseource
        let i, j;
        for (i = 0; i < currentResources.length; i++) {
            const cid = currentResources[i].id;
            let exist = false;
            for (j = 0; j < resources.length; j++) {
                if (cid === resources[j].id) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                await group.$remove('resources', currentResources[i]);
            }
        }
        // 添加参数resources里的所有resource到group里
        for (i = 0; i < resources.length; i++) {
            const r = await Resource.findOne({
                where: {
                    id: resources[i].id
                }
            });
            let t = await group.$get('resources', {
                where: {
                    id: resources[i].id
                }
            });
            t = Array.isArray(t) ? t : [t];
            // 该resource存在在数据库里, 而且不在group的resources里, 就执行关系的添加操作
            if (r && t.length <= 0) {
                await group.$add('resources', r);
            }
        }
    } else {
        // 找不到此group
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

/**
 * 给指定id的group添加一个或者多个resource  POST请求，body参数名为resouces,为要添加resource的数组
 * url: /api/resource-group/:id/resource/ id为group的id
 * method: POST
 * params: resources [{ id: 1 }, { id: 2 }]
 */
resourceGroupRouter.post('/:id/resource', async ctx => {
    const gid = ctx.params.id;
    const resources = (ctx.req as any).body.resources;
    const group = await ResourceGroup.findOne({
        where: {
            id: gid
        }
    });
    if (group) {
        if (!Array.isArray(resources)) {
            ctx.response.status = 401;
            return;
        }
        let i;
        for (i = 0; i < resources.length; i++) {
            if (
                !(await Resource.findOne({
                    where: {
                        id: resources[i].id
                    }
                }))
            ) {
                ctx.response.status = 401;
                return;
            }
        }
        for (i = 0; i < resources.length; i++) {
            const r = await Resource.findOne({
                where: {
                    id: resources[i].id
                }
            });
            if (r) {
                await group.$add('resources', r);
            }
        }
        ctx.response.status = 200;
        ctx.response.body = 'added success';
    } else {
        // 找不到指定id的group
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

/**
 * 指定id的group删除一个或者多个resource  POST请求，body参数名为resouces,为要删除resource的数组
 * url: /api/resource-group/:id/resource/ id为group的id
 * method: DELETE
 * params: resources [{ id: 1 }, { id: 2 }]
 */
resourceGroupRouter.delete('/:id/resource', async ctx => {
    const gid = ctx.params.id;
    const resoures = (ctx.req as any).body.resources;
    if (!Array.isArray(resoures)) {
        ctx.response.status = 401;
        return;
    }
    const group = await ResourceGroup.findOne({
        where: {
            id: gid
        }
    });
    if (group) {
        let i;
        for (i = 0; i < resoures.length; i++) {
            if (
                !(await Resource.findOne({
                    where: {
                        id: resoures[i].id
                    }
                }))
            ) {
                ctx.response.status = 401;
                return;
            }
        }
        for (i = 0; i < resoures.length; i++) {
            const r = await Resource.findOne({
                where: {
                    id: resoures[i].id
                }
            });
            if (r) {
                await group.$remove('resources', r);
            }
        }
        ctx.response.status = 200;
        ctx.response.body = 'deleted success';
    } else {
        // 找不到指定id的group
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});
export default resourceGroupRouter;
