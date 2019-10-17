const roleRouter = require('koa-router')()
const consola = require('consola')
const _ = require('lodash')
const getEnforcer = require('../../lib/enforcer')

// 获取所有role
roleRouter.get('/', async (ctx, next) => {
    const e = await getEnforcer()
    ctx.response.type = 'text/json'
    ctx.response.body = {
        result: e.getAllRoles().sort(),
        total: e.getAllRoles().length
    }
    // await next();
})

// 删除一个role
roleRouter.delete('/:name', async ctx => {
    const e = await getEnforcer()
    const name = ctx.params.name
    const result = await e.deleteRole(name)
    ctx.response.type = 'text/json'
    ctx.response.body = {
        result,
        name
    }
})

roleRouter.put('/:name', async ctx => {
    const e = await getEnforcer()
    const name = ctx.params.name
    let result = (name.substr(name.length -1,name.length) === 'R')
    if(result) {
        const roles = e.getAllRoles()
        result = !(_.includes(roles, name))
    }
    if(result) {
        result = await e.addGroupingPolicy(name, 'anonymousR')
    }
    ctx.response.type = 'text/json'
    ctx.response.body = {
        result,
        name
    }
})
module.exports = roleRouter
