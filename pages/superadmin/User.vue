<template>
    <v-container>
        <user-table edit-action search-action />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';

import UserTable from '@/components/superadmin/User/UserTable.vue';

const adminStore = namespace('admin');

@Component({
    layout: 'admin',
    components: {
        UserTable
    }
})
class UserManager extends Vue {
    @adminStore.Mutation('SET_PAGETITLE') setPageTitle;

    mounted() {
        this.setPageTitle(this.$t('superadmin.pageTitle.user'));
    }
}

export default UserManager;
</script>

<style></style>