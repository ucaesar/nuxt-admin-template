<template>
    <v-container>
        <single-select-table :table-state="tableState" />
    </v-container>
</template>

<script lang="ts">
/* 
    api/resource-group/:id/children
    获取指定id的ResourceGroup的所有子group, id=1的group是所有子group的根
*/
import { Component, Vue } from 'nuxt-property-decorator';

import { $t } from '@/utils/NuxtOptions';
import { TableUIConf, TableState } from '@/api/admin/TableState';

@Component({
    layout: 'admin',
    components: {
        SingleSelectTable: () =>
            import('@/components/common/SingleSelectTable.vue')
    }
})
class ResourceGroupManager extends Vue {
    async asyncData() {
        const readResourceGroupUrl = '/api/resource-group/1/children';
        const headers = [
            {
                text: $t('superadmin.resourceGroupManager.groupNameHeaderText'),
                value: 'groupname',
                sortable: false
            },
            {
                text: $t(
                    'superadmin.resourceGroupManager.groupDescriptionHeaderText'
                ),
                value: 'description',
                sortable: false
            }
        ];
        const uiConf = new TableUIConf(headers);
        const tableState = new TableState(uiConf, readResourceGroupUrl);
        await tableState.loadPage({
            page: 1,
            itemsPerPage: uiConf.defaultItemsPerPage
        });
        return { tableState };
    }
}
export default ResourceGroupManager;
</script>

<style>
</style>