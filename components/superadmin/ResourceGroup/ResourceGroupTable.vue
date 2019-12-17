<template>
    <div>
        <crud-server-data-table
            ref="resourceGroupTable"
            :table-title="$t('superadmin.resourceGroupTable.tableTitle')"
            :server-data="serverData"
            :headers-conf="headersConf"
            v-bind="$attrs"
            @load-page="loadPage"
            @new="beforeNew"
            @delete="onDelete"
            @edit="beforeEdit"
            @input="onSelect"
        />
        <resource-group-editor
            :visible="editorVisible"
            :item="itemTodo"
            @close="onEdit"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'nuxt-property-decorator';

import ResourceGroupEditor from './ResourceGroupEditor.vue';

import CrudServerDataTable from '@/components/common/Table/CRUDServerDataTable.vue';

import { TableDataFromServer, IPaginationParams } from '@/api/admin/table';
import * as ResourceGroupApi from '@/api/superadmin/ResourceGroup';

import { RESOURCEGROUP_TABLE_HEADER_TEXT } from '@/conf/superadmin/ResourceGroup';

import { CrudTableComponent } from '@/utils/crudTable';
import * as Message from '@/utils/message';

@Component({
    components: {
        CrudServerDataTable,
        ResourceGroupEditor
    },
    inheritAttrs: false
})
class ResourceGroupTable extends Vue {
    @Ref('resourceGroupTable') readonly resourceGroupTable!: CrudTableComponent;

    serverData = new TableDataFromServer();
    headersConf = [
        RESOURCEGROUP_TABLE_HEADER_TEXT.groupname,
        RESOURCEGROUP_TABLE_HEADER_TEXT.description
    ];
    editorVisible = false;
    itemTodo = new ResourceGroupApi.ResourceGroup();

    async loadPage(params: IPaginationParams) {
        this.resourceGroupTable.loadingOverlay();
        try {
            this.serverData = await ResourceGroupApi.$list(params);
        } catch (e) {}
        this.resourceGroupTable.unOverlay();
    }

    beforeNew() {
        this.itemTodo = new ResourceGroupApi.ResourceGroup();
        this.editorVisible = true;
    }
    async beforeEdit(item) {
        this.resourceGroupTable.loadingOverlay();

        try {
            this.itemTodo = await ResourceGroupApi.$detail(item);
            this.editorVisible = true;
        } catch (e) {
        } finally {
            this.resourceGroupTable.unOverlay();
        }
    }

    async onDelete(item) {
        this.resourceGroupTable.submittingOverlay();
        try {
            await ResourceGroupApi.$delete(item);
            // await this.loadPage(this.pageParams);
            this.resourceGroupTable.resetPagination();
        } catch (e) {}
        this.resourceGroupTable.unOverlay();
    }
    async onEdit(val: boolean | ResourceGroupApi.IResourceGroup) {
        this.editorVisible = false;

        if (typeof val === 'boolean') return;

        this.resourceGroupTable.submittingOverlay();
        try {
            if (val.id !== -1) await ResourceGroupApi.$edit(val);
            else await ResourceGroupApi.$add(val);
            await this.resourceGroupTable.loadPage();
        } catch (e) {
        } finally {
            this.resourceGroupTable.unOverlay();
        }
    }

    onSelect(items) {
        this.$emit('input', items);
    }
}
export default ResourceGroupTable;
</script>

<style>
</style>