import urlWithoutLocale from '../lib/utils'
export default async function(context, enforcer): Promise<boolean> {
    const { username: sub } = context.state.currentUser
    // const { originalUrl: obj, method: act } = context
    const obj = urlWithoutLocale(context.originalUrl)
    const act = context.method
    const allowed = await enforcer.enforce(sub, obj, act)
    return allowed
}
