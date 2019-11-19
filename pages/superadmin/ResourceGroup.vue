<template>
    <v-container>
        <div class="mb-4">
            <v-btn color="primary" 
                ><v-icon>mdi-plus</v-icon
                >{{
                    $t(
                        'superadmin.resourceGroupManager.newResourceGroupButtonText'
                    )
                }}</v-btn
            >
            <v-btn color="primary" class="ml-2"
                ><v-icon>mdi-pencil</v-icon
                >{{
                    $t(
                        'superadmin.resourceGroupManager.editResourceGroupButtonText'
                    )
                }}</v-btn
            >
            <v-btn color="primary" class="ml-2"
                ><v-icon>mdi-delete</v-icon
                >{{
                    $t(
                        'superadmin.resourceGroupManager.removeResourceGroupButtonText'
                    )
                }}</v-btn
            >
        </div>
        <resource-group-table
            :server-data="resourceGroups"
            :loading="loading"
            @load-page="loadPage"
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
import {
    TableDataFromServer,
    DEFAULT_ITEMS_PER_PAGE,
    IPageOptions
} from '@/api/admin/table';
import ResourceGroupTable from '@/components/superadmin/ResourceGroupTable.vue';

@Component({
    layout: 'admin',
    components: {
        ResourceGroupTable
    }
})
class ResourceGroupManager extends Vue {
    loading = false;
    resourceGroups = new TableDataFromServer();
    pageOptions: IPageOptions = {
        page: 1,
        itemsPerPage: DEFAULT_ITEMS_PER_PAGE
    };

    async loadPage(pageOptions: IPageOptions) {
        this.pageOptions = pageOptions;
        this.loading = true;
        try {
            await this.resourceGroups.read(
                '/api/resource-group/1/children',
                pageOptions
            );
        } catch (e) {}
        this.loading = false;
    }
}
export default ResourceGroupManager;
</script>

<style>
</style>