import Router from 'koa-router';
const resourceGroupRouter = new Router();
import ResourceGroup from '../../model/ResouceGroup';
import { Op } from 'sequelize';

// 获取指定id的ResourceGroup的所有子group
resourceGroupRouter.get('/:id/children', async (ctx, next) => {
    const parentId = ctx.params.id;
    // 获取父group
    const parentGroup = await ResourceGroup.findOne({
        where: {
            id: parentId
        }
    });
    if (parentGroup) {
        // 得到父group下的所有子group
        let children = await parentGroup.$get('children', {
            attributes: ['id', 'groupname', 'description'],
            where: {
                id: { [Op.ne]: parentId }
            }
        });
        // 如果子group为单个,sequelize默认返回的是单个实例,需要包进一个数组后再作为返回结果
        children = Array.isArray(children) ? children : [children];
        ctx.response.type = 'text/json';
        ctx.response.status = 200;
        ctx.response.body = children;
    } else {
        // 找不到父group
        ctx.response.status = 404;
        ctx.response.body = 'not found';
    }
});

// 往指定id的ResourceGroup添加一个子group
resourceGroupRouter.post('/:id/children', async ctx => {
    const parentId = ctx.params.id;
    const groupname: string = (ctx.req as any).body.groupname || '';
    const description: string = (ctx.req as any).body.description || '';

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

// 删除指定id的ResourceGroup
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
resourceGroupRouter.get('/:id/resource', async ctx => {});

export default resourceGroupRouter;
