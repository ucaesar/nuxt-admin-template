import { MutationTree, ActionTree } from 'vuex/types/index';
import _ from 'lodash';

import { INavigation } from '@/models/admin/layout';

import { navConf } from '@/conf/admin/navigation';

import * as Api from '@/api/user/permissions';

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

export const state = () => ({
    drawer: true,
    navigations: [] as INavigation[]
});

export type AdminState = ReturnType<typeof state>;

export const mutations: MutationTree<AdminState> = {
    SET_DRAWER: (state: AdminState, drawer: boolean) => {
        state.drawer = drawer;
    },
    SET_NAVIGATIONS: (state: AdminState, navigations: INavigation[]) => {
        state.navigations = navigations;
    }
};

export const actions: ActionTree<AdminState, AdminState> = {
    toogleDrawer({ commit, state }) {
        commit('SET_DRAWER', !state.drawer);
    },
    async setNavigations({ commit }) {
        try {
            const navigations = new NavigationFilter(
                await Api.permissions()
            ).filter();
            commit('SET_NAVIGATIONS', navigations);
        } catch (e) {}
    }
};
