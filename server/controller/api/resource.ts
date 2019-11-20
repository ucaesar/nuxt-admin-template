import Router from 'koa-router';
const resourceRouter = new Router();
import Resource from '../../model/Resource';
import { Op } from 'sequelize';
import _ from 'lodash';

// 获取Resource列表 GET请求，参数可选，为start，num
resourceRouter.get('/', async ctx => {
    // 获取分页参数
    const start = ctx.request.query.start;
    const num = ctx.request.query.count;
    const total = await Resource.count();
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
        attributes: ['id', 'name', 'description', 'url', 'action']
    });

    ctx.response.type = 'text/json';
    ctx.response.status = 200;
    ctx.response.body = {
        results,
        total
    };
});

// 添加一个resource  POST请求，参数为name, description, url, action
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
    ctx.response.body = newresource;
});

// 删除指定id的resource
resourceRouter.delete('/:id', async ctx => {
    const delId = ctx.params.id;
    // 找到要删除的resource
    const delResource = await Resource.findOne({
        where: {
            id: delId
        }
    });
    if (delResource) {
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

export default resourceRouter;
