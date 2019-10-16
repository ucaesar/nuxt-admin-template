import navConf from '@/conf/admin/navigation'

const consola = require('consola')
const _ = require('lodash')

// path: ['superadmin', 'rolemanager'] || '/superadmin/rolemanager'
// authNavs: ['/superadmin', '/superadmin/*']

class NavigationFilter {
    constructor(authNavs) {
        this.authNavs = authNavs
    }

    check(path) {
        if (!_.isString(path) && !_.isArray(path)) {
            throw new TypeError(
                `Parameter 'path' should be either String or Array`
            )
        }

        let pathArray = []
        if (_.isString(path)) {
            pathArray = _.compact(path.split('/'))
        } else {
            pathArray = _.slice(path)
        }
        if (pathArray.length === 0) {
            pathArray.push('')
        }

        const wildcards = _(pathArray)
            .take(pathArray.length - 1)
            .unshift('')
            .concat('*')
            .join('/')

        const exact = this.getURL(pathArray)

        if (
            _.includes(this.authNavs, wildcards) ||
            _.includes(this.authNavs, exact)
        ) {
            return true
        }
        return false
    }

    getURL(pathArray) {
        return _(pathArray.slice())
            .unshift('')
            .join('/')
    }

    filter() {
        const navigations = []

        for (const conf of navConf) {
            const root = _(conf)
                .keys()
                .head()
            const pathArray = [root]
            const nav = { icon: conf[root].icon, path: this.getURL(pathArray) }

            if (!conf[root].sub) {
                // root
                if (!this.check(pathArray)) continue
                navigations.push(nav)
            } else {
                _.assign(nav, { sub: [] })
                for (const sub of conf[root].sub) {
                    pathArray.push(sub)

                    const subPath = this.getURL(pathArray)
                    if (this.check(subPath)) nav.sub.push(subPath)

                    pathArray.pop(sub)
                }
                navigations.push(nav)
            }
        }

        return navigations
    }
}

export default async function({ $axios, store }) {
    consola.info('middleware: navigation.js')

    if (process.server) {
        try {
            const navs = new NavigationFilter(
                await $axios.$get('/api/user/authnavs')
            ).filter()
            store.commit('admin/SET_NAVIGATIONS', navs)
        } catch (error) {
            consola.error(error)
        }
    }
}
