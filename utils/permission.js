const _ = require('lodash')

// path: ['superadmin', 'rolemanager'] || '/superadmin/rolemanager'
// authNavs: ['/superadmin', '/superadmin/*']

class Permission {
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

        console.log('pathArray', pathArray)

        const wildcards = _(pathArray)
            .take(pathArray.length - 1)
            .unshift('')
            .concat('*')
            .join('/')
        console.log('wildcards: ', wildcards)

        const exact = _(pathArray)
            .unshift('')
            .join('/')
        console.log('exact: ', exact)

        if (
            _.includes(this.authNavs, wildcards) ||
            _.includes(this.authNavs, exact)
        ) {
            return true
        }
        return false
    }
}

export default Permission
