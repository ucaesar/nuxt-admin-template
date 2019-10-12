const urlWithoutLocale = require('../lib/utils').urlWithoutLocale
module.exports = async function(context, enforcer) {
    const { username: sub } = context.state.currentUser
    // const { originalUrl: obj, method: act } = context
    const obj = urlWithoutLocale(context.originalUrl)
    const act = context.method
    const allowed = await enforcer.enforce(sub, obj, act)
    return allowed
}
