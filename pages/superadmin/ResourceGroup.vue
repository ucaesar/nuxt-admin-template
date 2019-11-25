<template>
    <v-container>
        <resource-group-table new-action delete-action edit-action />
    </v-container>
</template>

<script lang="ts">
/* 
    api/resource-group/:id/children
    获取指定id的ResourceGroup的所有子group, id=1的group是所有子group的根
*/
import { Component, Vue } from 'nuxt-property-decorator';

import { $t } from '@/utils/NuxtOptions';

import ResourceGroupTable from '@/components/superadmin/ResourceGroup/ResourceGroupTable.vue';

@Component({
    layout: 'admin',
    components: {
        ResourceGroupTable
    }
})
class ResourceGroupManager extends Vue {}
export default ResourceGroupManager;
</script>

<style>
</style>