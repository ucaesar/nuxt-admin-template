<template>
    <v-container>
        <resource-group-table :resource-groups="resourceGroups" />
    </v-container>
</template>

<script lang="ts">
/* 
    api/resource-group/:id/children
    获取指定id的ResourceGroup的所有子group, id=1的group是所有子group的根
*/
import consola from 'consola';
import { Component, Vue } from 'nuxt-property-decorator';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import { ResourceGroup, ResourceGroupList } from '@/models/superadmin';

@Component({
    layout: 'admin',
    components: {
        ResourceGroupTable: () =>
            import('@/components/superadmin/ResourceGroupTable.vue')
    }
})
class ResourceGroupManager extends Vue {
    async asyncData({ $axios }: { $axios: NuxtAxiosInstance }) {
        const url = 'api/resource-group/1/children';
        let resourceGroups: ResourceGroupList = { result: [], total: 0 };
        try {
            resourceGroups = (await $axios.$get(url)) as ResourceGroupList;
        } catch (error) {
            consola.error(`error from get(${url})`, error);
        }
        return { resourceGroups };
    }
}
export default ResourceGroupManager;
</script>

<style>
</style>