<template>
    <div>
        <crud-server-data-table
            ref="roleTable"
            :table-title="$t('superadmin.roleTable.tableTitle')"
            :server-data="serverData"
            :headers-conf="headersConf"
            v-bind="$attrs"
            @load-page="loadPage"
            @new="beforeNew"
            @delete="onDelete"
            @edit="beforeEdit"
            @input="onSelect"
        />
        <role-editor
            :visible="editorVisible"
            :item="itemTodo"
            @close="onEdit"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'nuxt-property-decorator';

import RoleEditor from './RoleEditor.vue';

import CrudServerDataTable from '@/components/common/Table/CRUDServerDataTable.vue';

import { ROLE_TABLE_HEADER_TEXT } from '@/conf/superadmin/Role';

import { TableDataFromServer, IPaginationParams } from '@/api/admin/table';
import * as RoleApi from '@/api/superadmin/Role';

import { CrudTableComponent } from '@/utils/crudTable';

@Component({
    components: {
        CrudServerDataTable,
        RoleEditor
    },
    inheritAttrs: false
})
class RoleTable extends Vue {
    @Ref('roleTable') readonly roleTable!: CrudTableComponent;

    serverData = new TableDataFromServer();
    headersConf = [
        ROLE_TABLE_HEADER_TEXT.roleName,
        ROLE_TABLE_HEADER_TEXT.description
    ];
    editorVisible = false;
    itemTodo = new RoleApi.Role();

    async loadPage(params: IPaginationParams) {
        this.roleTable.loadingOverlay();
        try {
            this.serverData = await RoleApi.$list(params);
        } catch (e) {}
        this.roleTable.unOverlay();
    }

    beforeNew() {
        this.itemTodo = new RoleApi.Role();
        this.editorVisible = true;
    }
    beforeEdit(item) {
        this.itemTodo = item;
        this.editorVisible = true;
    }

    async onDelete(item) {
        this.roleTable.submittingOverlay();
        try {
            await RoleApi.$delete(item);
            this.roleTable.resetPagination();
        } catch (e) {}
        this.roleTable.unOverlay();
    }

    async onEdit(val: boolean | RoleApi.Role) {
        this.editorVisible = false;

        if (typeof val === 'boolean') return;

        this.roleTable.submittingOverlay();
        try {
            if (val.id !== -1) await RoleApi.$edit(val);
            else await RoleApi.$add(val);
            await this.roleTable.loadPage();
        } catch (e) {
        } finally {
            this.roleTable.unOverlay();
        }
    }

    onSelect(items) {
        this.$emit('input', items);
    }
}

export default RoleTable;
</script>

<style>
</style>