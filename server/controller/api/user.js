const userRouter = require('koa-router')();
// const getEnforcer = require("../../lib/enforcer");
const User = require('../../model/user');

userRouter.get('/', async (ctx, next) => {
	// const e = await getEnforcer();
	ctx.response.type = 'text/json';
	ctx.response.body = await User.findAll({
		attributes: ['id', 'username']
	});
	// await next();
});

module.exports = userRouter;
