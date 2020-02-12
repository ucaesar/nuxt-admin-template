<template>
    <v-container>
        <role-table new-action delete-action edit-action search-action />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import RoleTable from '@/components/superadmin/Role/RoleTable.vue';

@Component({
    layout: 'admin',
    components: {
        RoleTable
    }
})
class RoleManager extends Vue {}

export default RoleManager;
</script>

<style lang="scss">
    @import '@/assets/styles/variables.scss';
</style>
