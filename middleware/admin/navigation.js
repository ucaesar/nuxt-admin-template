const consola = require('consola')

export default function({ req, store }) {
    consola.info('middleware: navigation.js')

    if (process.server) {
        consola.info('server!')

        const navigations = []

        store.commit('admin/SET_NAVIGATIONS', navigations)
    }
}
