<template>
    <div>
        <v-data-table
            :items="resourceGroups.result"
            :server-items-length="resourceGroups.total"
            :headers="headers"
            class="elevation-1"
        ></v-data-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { ResourceGroup, ResourceGroupList } from '@/models/superadmin';
import { $t } from '@/utils/t';

@Component
class ResourceGroupTable extends Vue {
    @Prop({ type: Object, required: true }) resourceGroups!: ResourceGroupList;
    headers = [
        {
            text: $t('superadmin.resourceGroupManager.groupNameHeaderText'),
            value: 'groupname',
            sortable: false
        },
        {
            text: $t('superadmin.resourceGroupManager.groupDescriptionHeaderText'),
            value: 'description',
            sortable: false
        }
    ];
}

export default ResourceGroupTable;
</script>

<style>
</style>