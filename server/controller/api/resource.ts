import Router from 'koa-router';
const resourceRouter = new Router();
import Resource from '../../model/Resource';
import { CasbinRule } from '../../model/CasbinRule';
import { Op } from 'sequelize';
import _ from 'lodash';

/**
 * 获取Resource列表
 * url: /api/resource
 * method: GET
 * params: GET查询参数, start为分页起始位置, count为一页的数量, filter为对name做的匹配关键词
 */
resourceRouter.get('/', async ctx => {
    // 获取分页参数
    const start = ctx.request.query.start;
    const num = ctx.request.query.count;
    const total = await Resource.count();
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
    const results = await Resource.findAll({
        offset,
        limit,
        attributes: ['id', 'name', 'description', 'url', 'action'],
        where: {
            name: { [Op.like]: '%' + filter + '%' }
        }
    });

    ctx.response.type = 'text/json';
    ctx.response.status = 200;
    ctx.response.body = {
        results,
        total
    };
});

/**
 * 添加一个resource
 * url: /api/resource
 * method: POST
 * params: { name, description, url, action }
 * return: { id, name, description, url, action } 外加http code
 */
resourceRouter.post('/', async ctx => {
    const name: string = (ctx.req as any).body.name || '';
    const description: string = (ctx.req as any).body.description || '';
    const url: string = (ctx.req as any).body.url || '';
    const action: string = (ctx.req as any).body.action || '';
    if (name === '' || url === '' || action === '') {
        ctx.response.status = 401;
        ctx.response.body = 'name url action are all needed';
        return;
    }
    //检查name是否存在
    if ((await Resource.count({ where: { name } })) > 0) {
        ctx.response.status = 401;
        ctx.response.body = 'name exists';
        return;
    }
    //检查url和action的组合是否存在
    if ((await Resource.count({ where: { url, action } })) > 0) {
        ctx.response.status = 401;
        ctx.response.body = 'url action combination exists';
        return;
    }
    const newresource = await Resource.create({
        name,
        description,
        url,
        action
    });
    ctx.response.type = 'text/json';
    ctx.response.status = 200;
    ctx.response.body = {
        id: newresource.id,
        name: newresource.name,
        description: newresource.description,
        url: newresource.url,
        action: newresource.action
    };
});

/**
 * 删除指定id的resource
 * url: /api/resource/:id
 * method: DELETE
 * return: HTTP CODE
 */
resourceRouter.delete('/:id', async ctx => {
    const delId = ctx.params.id;
    // 找到要删除的resource
    const delResource = await Resource.findOne({
        where: {
            id: delId
        }
    });
    if (delResource) {
        // 清理casbin权限表
        await CasbinRule.destroy({
            where: {
                v1: delResource.url,
                v2: delResource.action
            }
        });
        // 执行删除
        await delResource.destroy();
        ctx.response.status = 200;
        ctx.response.body = 'deleted';
    } else {
        // 找不到此resource
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

/**
 * 编辑指定id的Resource
 * url: /api/resource-group/:id/ id为resource的id
 * method: PUT
 * params: { id?(可以不设置, 以url里的id为准), name, description, url, action }
 */
resourceRouter.put('/:id', async ctx => {
    const rid = await ctx.params.id;
    const nname: string = (ctx.req as any).body.name || '';
    const ndescription: string = (ctx.req as any).body.description || '';
    const nurl: string = (ctx.req as any).body.url || '';
    const naction: string = (ctx.req as any).body.action || '';
    const updateResource = await Resource.findOne({
        where: {
            id: rid
        }
    });
    // 存在非此id而name为此name的resource, 报401参数错
    if (
        await Resource.findOne({
            where: {
                id: { [Op.ne]: rid },
                name: nname
            }
        })
    ) {
        // name已经存在
        ctx.response.status = 401;
        ctx.response.body = 'this resource name exists';
        return;
    }
    if (updateResource) {
        const oldurl = updateResource.url;
        const oldaction = updateResource.action;

        // 更新casbin表
        const casbinrules = await CasbinRule.findAll({
            where: {
                v1: updateResource.url,
                v2: updateResource.action
            }
        });
        let i;
        for (i = 0; i < casbinrules.length; i++) {
            casbinrules[i].v1 = nurl;
            casbinrules[i].v2 = naction;
            await casbinrules[i].save();
        }
        // 更新resource表
        updateResource.name = nname;
        updateResource.description = ndescription;
        updateResource.url = nurl;
        updateResource.action = naction;
        await updateResource.save();
        ctx.response.status = 200;
        ctx.response.body = 'edit success';
    } else {
        // 找不到此resource
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});
export default resourceRouter;
