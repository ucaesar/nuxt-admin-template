<template>
    <v-app>
        <Message />
        <admin-navigator />
        <admin-toolbar />
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import _ from 'lodash';

import Message from '@/components/Message.vue';
import AdminNavigator from '@/components/admin/Navigator.vue';
import AdminToolbar from '@/components/admin/Toolbar.vue';

import * as Api from '@/api/user/permissions';

import { navConf, Navigation } from '@/conf/admin/navigation';

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

    filter(): Navigation[] {
        const navigations: Navigation[] = [];

        for (const conf of navConf) {
            const root = <string>_(conf)
                .keys()
                .head();
            const pathArray: string[] = [root];
            let nav: Navigation;

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

@Component({
    components: {
        AdminNavigator,
        AdminToolbar,
        Message
    }
})
class Admin extends Vue {
    async created() {
        try {
            const navigations = new NavigationFilter(
                await Api.permissions()
            ).filter();
            this.$store.commit('admin/SET_NAVIGATIONS', navigations);
        } catch (e) {}
    }
}
export default Admin;
</script>

<style>
</style>
