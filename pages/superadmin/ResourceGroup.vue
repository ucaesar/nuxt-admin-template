<template>
    <v-container>
        <resource-group-table
            new-action
            delete-action
            edit-action
            search-action
        />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

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

<style lang="scss">
    @import '@/assets/styles/variables.scss';
</style>