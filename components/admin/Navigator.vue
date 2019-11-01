<template>
    <v-navigation-drawer :value="drawer" fixed app class="nav">
        <v-list dense nav>
            <template v-for="(item, i) in navigations">
                <!-- 单层菜单 -->
                <template v-if="!item.sub">
                    <v-list-item :key="i" :to="item.path" router exact link>
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{
                                $t('admin.navigator["' + item.path + '"]')
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <!-- 嵌套导航 -->
                <template v-else>
                    <v-list-group :key="i" :prepend-icon="item.icon" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    $t('admin.navigator["' + item.path + '"]')
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item
                            v-for="subItem in item.sub"
                            :key="subItem"
                            :to="subItem"
                            router
                            link
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    $t('admin.navigator["' + subItem + '"]')
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </template>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

const adminStore = namespace('admin')

@Component
class Navigator extends Vue {
    @adminStore.State('drawer') drawer
    @adminStore.State('navigations') navigations
}

export default Navigator
</script>

<style></style>
