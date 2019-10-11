const consola = require('consola')

export default function({ req, store }) {
    consola.info('middleware: navigation.js')

    const authNavs = req.ctx.state.currentUser.authNavs
    consola.info(authNavs)

    const navigations = []

    store.commit('admin/SET_NAVIGATIONS', navigations)
}
