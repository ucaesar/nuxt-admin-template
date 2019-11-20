import Router from 'koa-router';
const resourceRouter = new Router();
import Resource from '../../model/Resource';
import { Op } from 'sequelize';
import _ from 'lodash';

// 获取Resource列表
resourceRouter.get('/', async (ctx, next) => {
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
    const results = await Resource.findAll({ offset, limit });

    ctx.response.type = 'text/json';
    ctx.response.status = 200;
    ctx.response.body = {
        results,
        total
    };
});

export default resourceRouter;
