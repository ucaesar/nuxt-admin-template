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
import { ResourceGroup } from '@/models/superadmin';
import { TableDataFromServer } from '@/models/admin';

@Component({
    layout: 'admin',
    components: {
        SingleSelectTable: () =>
            import('@/components/common/SingleSelectTable.vue')
    }
})
class ResourceGroupManager extends Vue {
    async asyncData({ $axios }: { $axios: NuxtAxiosInstance }) {
        const url = 'api/resource-group/1/children';
        let resourceGroups: TableDataFromServer = { result: [], total: 0 };
        try {
            resourceGroups = (await $axios.$get(url)) as TableDataFromServer;
        } catch (error) {
            consola.error(`error from get(${url})`, error);
        }
        return { resourceGroups };
    }

    tableConf = {
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