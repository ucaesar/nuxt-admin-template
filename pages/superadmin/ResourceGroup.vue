<template>
    <v-container>
        <single-select-table :value="resourceGroups" :table-conf="tableConf" />
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

import { $t } from '@/utils/t';
import {
    ResourceGroup,
    readResourceGroups
} from '@/api/superadmin/ResourceGroup';
import { TableDataFromServer } from '@/api/admin';
import { DEFAULT_ITEMS_PER_PAGE } from '@/conf/admin/table';

@Component({
    layout: 'admin',
    components: {
        SingleSelectTable: () =>
            import('@/components/common/SingleSelectTable.vue')
    }
})
class ResourceGroupManager extends Vue {
    async asyncData({ $axios }) {
        let resourceGroups: TableDataFromServer = { result: [], total: 0 };
        try {
            resourceGroups = await readResourceGroups({
                page: 1,
                itemsPerPage: DEFAULT_ITEMS_PER_PAGE
            });
        } catch (error) {
            consola.error(error);
        }
        return { resourceGroups };
    }

    tableConf = {
        loading: false,
        footerProps: {
            itemsPerPageOptions: [1, DEFAULT_ITEMS_PER_PAGE, 20, 50]
        },
        headers: [
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
        ]
    };
}
export default ResourceGroupManager;
</script>

<style>
</style>