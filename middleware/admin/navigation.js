import Permission from '@/utils/permission'

const consola = require('consola')

export default async function({ $axios, redirect }) {
    consola.info('middleware: navigation.js')

    if (process.server) {
        try {
            const data = await $axios.$get('/api/user/authnavs')
            consola.info(data)

            const permission = new Permission(['/', '/superadmin', '/superadmin/*'])
            console.log(permission.check('/'))
            console.log(permission.check(['']))
            console.log(permission.check('/superadmin'))
            console.log(permission.check(['superadmin', 'rolemanager']))
        } catch (error) {
        }
    }
}
