import _ from 'lodash'
import consola from 'consola'
import navConf from '@/conf/admin/navigation'

class NavigationFilter {
    permissions: string[]
    constructor(permissions: string[]) {
        this.permissions = permissions
    }
}

export default async function({ $axios, store }) {
    consola.info('middelware: navigation.ts')

    if (process.server) {
        try {
            const data = await $axios.$get('/api/user/permissions')
            new NavigationFilter(data as string[])
        } catch (error) {
            consola.error(error)
        }
    }
}
