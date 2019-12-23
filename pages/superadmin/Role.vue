<template>
    <v-container>
        <role-table new-action delete-action edit-action search-action />
        <crud-table new-action>
            <template v-slot:editor="editorProps">
                {{ editorProps.prop.editorDialogVisible }}
            </template>
        </crud-table>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import RoleTable from '@/components/superadmin/Role/RoleTable.vue';
import CrudTable from '@/components/common/CrudTable/CrudTable.vue';

@Component({
    layout: 'admin',
    components: {
        RoleTable,
        CrudTable
    }
})
class RoleManager extends Vue {}

export default RoleManager;
</script>

<style></style>
