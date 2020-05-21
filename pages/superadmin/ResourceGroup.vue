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
import { Component, Vue, namespace } from 'nuxt-property-decorator';

import ResourceGroupTable from '@/components/superadmin/ResourceGroup/ResourceGroupTable.vue';

const adminStore = namespace('admin');

@Component({
    layout: 'admin',
    components: {
        ResourceGroupTable
    }
})
class ResourceGroupManager extends Vue {
    @adminStore.Mutation('SET_PAGETITLE') setPageTitle;

    mounted() {
        this.setPageTitle(this.$t('superadmin.pageTitle.resourceGroup'));
    }
}
export default ResourceGroupManager;
</script>

<style></style>