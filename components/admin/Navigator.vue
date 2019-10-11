<template>
    <v-list dense nav>
        <template v-for="(item, i) in config">
            <!-- 单层菜单 -->
            <template v-if="!item.sub">
                <v-list-item :key="i" :to="item.path" router exact link>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <!-- 嵌套导航 -->
            <template v-else>
                <v-list-group :key="i" :prepend-icon="item.icon" no-action>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="subItem in item.sub"
                        :key="subItem.path"
                        :to="subItem.path"
                        router
                        link
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{
                                subItem.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </template>
        </template>
    </v-list>
</template>

<script>
export default {
    props: {
        config: {
            type: Array,
            default() {
                return []
            },
            required: true
        }
    }
}
</script>

<style></style>
