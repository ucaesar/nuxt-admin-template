<template>
    <v-container>
        <user-table edit-action search-action />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import UserTable from '@/components/superadmin/User/UserTable.vue';

@Component({
    layout: 'admin',
    components: {
        UserTable
    }
})
class UserManager extends Vue {}

export default UserManager;
</script>

<style></style>