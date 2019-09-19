const roleRouter = require("koa-router")();
const getEnforcer = require("../../lib/enforcer");

roleRouter.get("/", async (ctx, next) => {
    const e = await getEnforcer();
    ctx.response.type = "text/json";
	ctx.response.body = e.getAllRoles();
	// await next();
});

module.exports = roleRouter;
