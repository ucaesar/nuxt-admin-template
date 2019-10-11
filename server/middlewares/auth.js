const path = require('path')
const casbin = require('casbin')
const { SequelizeAdapter } = require('casbin-sequelize-adapter')
const BaseAuthenticator = require('./BaseAuthenticator')
const BasicAuthenticator = require('./BasicAuthenticator')
const authorize = require('./authorization')
const authentic = require('./authentication')

module.exports = authenticator => {
    const authen = authenticator ? authenticator : new BasicAuthenticator()

    if (!(authen instanceof BaseAuthenticator)) {
        throw Error('authenticator must be extends from BaseAuthenticator')
    }

    return async function(context, next) {
        await authentic(context, authen)

        const adpt = await SequelizeAdapter.newAdapter({
            host: 'localhost',
            dialect: 'sqlite',
            storage: path.join(__dirname, '../test/database/nuxtauth.sqlite'),
            logging: false
        })

        // const enforcer = await casbin.newEnforcer(
        // 	path.join(__dirname, 'casbin/model.conf'),
        // 	path.join(__dirname, 'casbin/policy.csv')
        // );

        const enforcer = await casbin.newEnforcer(
            path.join(__dirname, 'casbin/model.conf'),
            adpt
        )

        const allowed = await authorize(context, enforcer)
        if (!allowed) {
            context.throw(403)
        }
        await next()
    }
}
