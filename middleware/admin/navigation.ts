import _ from 'lodash';
import consola from 'consola';

import { INavigation } from '@/models/admin/layout';

import { navConf } from '@/conf/admin/navigation';

class NavigationFilter {
    permissions: string[];

    constructor(permissions: string[]) {
        this.permissions = permissions;
    }

    check(path: string | string[]): boolean {
        let pathArray: string[] = [];

        if (typeof path === 'string') {
            pathArray = _.compact(path.split('/'));
        } else {
            pathArray = _.slice(path);
        }
        if (pathArray.length === 0) {
            pathArray.push('');
        }

        const wildcards = _(pathArray)
            .take(pathArray.length - 1)
            .unshift('')
            .concat('*')
            .join('/');
        const exact = this.composeUrl(pathArray);

        if (
            _.includes(this.permissions, wildcards) ||
            _.includes(this.permissions, exact)
        ) {
            return true;
        }

        return false;
    }

    composeUrl(pathArray: string[]): string {
        return _(pathArray.slice())
            .unshift('')
            .join('/');
    }

    filter(): INavigation[] {
        const navigations: INavigation[] = [];

        for (const conf of navConf) {
            const root = <string>_(conf)
                .keys()
                .head();
            const pathArray: string[] = [root];
            let nav: INavigation;

            if (!conf[root].sub) {
                // root
                if (!this.check(pathArray)) continue;
                nav = {
                    [root]: {
                        icon: conf[root].icon
                    }
                };
                navigations.push(nav);
            } else {
                nav = {
                    [root]: {
                        icon: conf[root].icon,
                        sub: []
                    }
                };
                for (const subItem of conf[root].sub!) {
                    pathArray.push(subItem);

                    if (this.check(pathArray)) nav[root].sub!.push(subItem);

                    pathArray.pop();
                }
                navigations.push(nav);
            }
        }

        return navigations;
    }
}

export default async function({ $axios, store }) {
    consola.info('middelware: navigation.ts');

    if (process.client) {
        try {
            const data = await $axios.$get('/api/user/permissions');
            const navs = new NavigationFilter(data as string[]).filter();
            store.commit('admin/SET_NAVIGATIONS', navs);
        } catch (error) {
            consola.error(error);
        }
    }
}
