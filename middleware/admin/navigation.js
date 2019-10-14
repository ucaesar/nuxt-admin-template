const consola = require('consola')

export default async function({ $axios }) {
    consola.info('middleware: navigation.js')

    if (process.server) {
        const data = await $axios.$get('/api/user/authnavs')
        consola.info(data)
    }
}
