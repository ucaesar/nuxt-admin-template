import Router from 'koa-router';
const resourceGroupRouter = new Router();
import getEnforcer from '../../lib/enforcer';
import ResourceGroup from '../../model/ResouceGroup';
import { isArray } from 'util';
import { Sequelize } from 'sequelize-typescript';

// 获取指定id的ResourceGroup的所有子group
resourceGroupRouter.get('/:id/children', async (ctx, next) => {
    const parentId = ctx.params.id;
    const parentGroup = await ResourceGroup.findOne({
        where: {
            id: parentId
        }
    });
    if (parentGroup) {
        let children = await parentGroup.$get('children',{
            where:{
                id:{}
            }
        });
        children = Array.isArray(children) ? children : [children];
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = children;
    } else {
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

export default resourceGroupRouter;
