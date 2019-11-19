<template>
    <v-container>
        <resource-group-table
            :server-data="resourceGroups"
            :loading="loading"
        />
    </v-container>
</template>

<script lang="ts">
/* 
    api/resource-group/:id/children
    获取指定id的ResourceGroup的所有子group, id=1的group是所有子group的根
*/
import { Component, Vue } from 'nuxt-property-decorator';

import { $t } from '@/utils/NuxtOptions';
import { TableDataFromServer, DEFAULT_ITEMS_PER_PAGE } from '@/api/admin/table';
import ResourceGroupTable from '@/components/superadmin/ResourceGroupTable.vue';

@Component({
    layout: 'admin',
    components: {
        ResourceGroupTable
    }
})
class ResourceGroupManager extends Vue {
    async asyncData() {
        const readResourceGroupUrl = '/api/resource-group/1/children';
        const resourceGroups = new TableDataFromServer();
        try {
            await resourceGroups.read(readResourceGroupUrl, {
                page: 1,
                itemsPerPage: DEFAULT_ITEMS_PER_PAGE
            });
        } catch (e) {}

        return { resourceGroups };
    }

    loading = false;
}
export default ResourceGroupManager;
</script>

<style>
</style>