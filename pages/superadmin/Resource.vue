<template>
    <v-container>
        <resource-table new-action delete-action edit-action />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import ResourceTable from '@/components/superadmin/Resource/ResourceTable.vue'

@Component({
    layout: 'admin',
    components: {
        ResourceTable
    }
})
class ResourceManager extends Vue {}
export default ResourceManager;
</script>

<style>
</style>