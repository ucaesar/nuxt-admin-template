<template>
    <v-navigation-drawer :value="drawer" fixed app class="nav">
        <v-list dense nav>
            <template v-for="navigation in navigations">
                <template v-for="(value, name) in navigation">
                    <!-- 单层菜单 -->
                    <template v-if="!value.sub">
                        <v-list-item :key="name" :to="composeUrl([name])" router exact link>
                            <v-list-item-action>
                                <v-icon>{{ value.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    // $t('admin.navigator["' + item.path + '"]')
                                    getNavigationTitle([name])
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>

                    <!-- 嵌套导航 -->
                    <template v-else>
                        <v-list-group
                            :key="name"
                            :prepend-icon="value.icon"
                            no-action
                        >
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        getNavigationTitle([name])
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item
                                v-for="subItem in value.sub"
                                :key="subItem"
                                :to="composeUrl([name, subItem])"
                                router
                                link
                            >
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        // $t('admin.navigator["' + subItem + '"]')
                                        getNavigationTitle([name, subItem])
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-group>
                    </template>
                </template>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import _ from 'lodash';

const adminStore = namespace('admin');

@Component
class Navigator extends Vue {
    @adminStore.State('drawer') drawer;
    @adminStore.State('navigations') navigations;

    composeUrl(pathArray: string[]): string {
        return _(pathArray.slice())
            .unshift('')
            .join('/');
    }

    getNavigationTitle(pathArray: string[]): string {
        const path = this.composeUrl(pathArray);
        return this.$t('admin.navigator["' + path + '"]').toString();
    }
}

export default Navigator;
</script>

<style>
.nav {
    padding-top: 64px;
}
</style>
