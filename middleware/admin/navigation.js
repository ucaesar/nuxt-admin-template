const consola = require('consola')

export default async function({ $axios, redirect }) {
    consola.info('middleware: navigation.js')

    if (process.server) {
        try {
            const data = await $axios.$get('/api/user/authnavs')
            consola.info(data)
        } catch (error) {      
        }
    }
}
