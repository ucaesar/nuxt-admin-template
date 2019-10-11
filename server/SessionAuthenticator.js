const BaseAuthenticator = require('./middlewares/BaseAuthenticator')
const { encode, decode, encodeWithoutDate } = require('./lib/encryption')
const User = require('./model/user')
const SuperAdmin = require('./model/SuperAdmin')

class SessionAthenticator extends BaseAuthenticator {
    // constructor() {
    // 	super();
    // }
    async getUser(context) {
        const sessionKey = context.session.x_session

        if (!sessionKey) {
            context.state.currentUser = { id: '-1', username: 'anonymous' }
        } else {
            const { id: uid, timespan } = decode(sessionKey)
            if (Date.now() - timespan > 1000 * 60 * 5) {
                context.session.x_session = null
                context.state.currentUser = { id: '-1', username: 'anonymous' }
                return
            }
            let u = await User.findOne({
                where: {
                    id: uid
                }
            })
            if (!u) {
                u = await SuperAdmin.findOne({
                    where: {
                        id: uid
                    }
                })
            }
            if (!u) {
                context.state.currentUser = { id: '-1', username: 'anonymous' }
                return
            }
            const rs = await u.getRoles()
            const navs = await u.getPagePaths()
            context.state.currentUser = {
                id: u.id,
                username: u.username,
                roles: rs,
                authNavs: navs
            }
        }
    }

    async login(context) {
        context.session.x_session = null
        context.state.currentUser = { id: '-1', username: 'anonymous' }
        // const username = context.getUsername;
        // const password = context.getPassword;
        // 暂时把login和adminlogin来的全部统一到isSuper去
        // const isSuper = context.originalUrl === "/adminlogin";
        const isSuper = true
        // const username = isSuper ? "superadmin" : "aaa";
        // const password = isSuper ? "superadmin" : "aaa";
        const username = context.request.body.username || ''
        const password = context.request.body.password || ''
        const a = isSuper ? SuperAdmin : User
        const u = await a.findOne({
            atrributes: ['id', 'username'],
            where: {
                username,
                password: encodeWithoutDate(password)
            }
        })
        if (u) {
            context.session.x_session = encode(u.id)
            const rs = await u.getRoles()
            const navs = await u.getPagePaths()
            context.state.currentUser = {
                id: u.id,
                username: u.username,
                roles: rs,
                authNavs: navs
            }
        }
    }

    logout(context) {
        context.session.x_session = null
        context.state.currentUser = { id: '-1', username: 'anonymous' }
    }
}

module.exports = SessionAthenticator
