<template>
    <div>
        <crud-server-data-table
            :server-data="serverData"
            :loading="loading"
            :loading-text="loadingText"
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
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import ResourceGroupEditor from './ResourceGroupEditor.vue';

import CrudServerDataTable from '@/components/common/Table/CRUDServerDataTable.vue';

import { TableDataFromServer, IPaginationParams } from '@/api/admin/table';
import * as ResourceGroupApi from '@/api/superadmin/ResourceGroup';

import { RESOURCEGROUP_TABLE_HEADER_TEXT } from '@/conf/superadmin/ResourceGroup';

@Component({
    components: {
        CrudServerDataTable,
        ResourceGroupEditor
    },
    inheritAttrs: false
})
class ResourceGroupTable extends Vue {
    serverData = new TableDataFromServer();
    loading = false;
    loadingText = '';
    headersConf = [
        RESOURCEGROUP_TABLE_HEADER_TEXT.groupname,
        RESOURCEGROUP_TABLE_HEADER_TEXT.description
    ];
    editorVisible = false;
    itemTodo = new ResourceGroupApi.ResourceGroup();

    async loadPage(params: IPaginationParams) {
        this.loadingOverlay();
        try {
            this.serverData = await ResourceGroupApi.$list(params);
        } catch (e) {}
        this.unOverlay();
    }

    loadingOverlay() {
        this.loading = true;
        this.loadingText = this.$t('components.table.loadingText') as string;
    }

    submittingOverlay() {
        this.loading = true;
        this.loadingText = this.$t('components.table.submittingText') as string;
    }

    unOverlay() {
        this.loading = false;
    }

    beforeNew() {
        this.itemTodo = new ResourceGroupApi.ResourceGroup();
        this.editorVisible = true;
    }
    async beforeEdit(item) {
        this.loadingOverlay();

        try {
            this.itemTodo = await ResourceGroupApi.$detail(item);
            this.editorVisible = true;
        } catch (e) {
        } finally {
            this.unOverlay();
        }
    }

    onDelete(item) {}
    onEdit(val: boolean | ResourceGroupApi.IResourceGroup) {
        this.editorVisible = false;
    }

    onSelect(items) {
        this.$emit('input', items);
    }
}
export default ResourceGroupTable;
</script>

<style>
</style>