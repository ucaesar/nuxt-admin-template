<template>
    <v-container>
        <role-table new-action delete-action edit-action search-action />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';

import RoleTable from '@/components/superadmin/Role/RoleTable.vue';

const adminStore = namespace('admin');

@Component({
    layout: 'admin',
    components: {
        RoleTable
    }
})
class RoleManager extends Vue {
    @adminStore.Mutation('SET_PAGETITLE') setPageTitle;

    mounted() {
        this.setPageTitle(this.$t('superadmin.pageTitle.role'));
    }
}

export default RoleManager;
</script>

<style></style>
