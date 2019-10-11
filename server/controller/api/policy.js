const policyRouter = require('koa-router')()
const getEnforcer = require('../../lib/enforcer')

policyRouter.get('/', async (ctx, next) => {
    const e = await getEnforcer()
    ctx.response.type = 'text/json'
    ctx.response.body = e.getPolicy()
    // await next();
})

module.exports = policyRouter
