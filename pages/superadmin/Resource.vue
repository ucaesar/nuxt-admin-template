<template>
    <v-container>
        <resource-table new-action delete-action edit-action search-action />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';

import ResourceTable from '@/components/superadmin/Resource/ResourceTable.vue';

const adminStore = namespace('admin');

@Component({
    layout: 'admin',
    components: {
        ResourceTable
    }
})
class ResourceManager extends Vue {
    @adminStore.Mutation('SET_PAGETITLE') setPageTitle;

    mounted() {
        this.setPageTitle(this.$t('superadmin.pageTitle.resource'));
    }
}
export default ResourceManager;
</script>

<style>
</style>