<template>
    <div>
        <crud-server-data-table
            ref="resourceTable"
            :table-title="$t('superadmin.resourceTable.tableTitle')"
            :server-data="serverData"
            :headers-conf="headersConf"
            v-bind="$attrs"
            @load-page="loadPage"
            @new="beforeNew"
            @delete="onDelete"
            @edit="beforeEdit"
            @input="onSelect"
        />
        <resource-editor
            :visible="editorVisible"
            :item="itemTodo"
            @close="onEdit"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'nuxt-property-decorator';

import ResourceEditor from './ResourceEditor.vue';

import CrudServerDataTable from '@/components/common/Table/CRUDServerDataTable.vue';

import { TableDataFromServer, IPaginationParams } from '@/api/admin/table';
import * as ResourceApi from '@/api/superadmin/Resource';

import { RESOURCE_TABLE_HEADER_TEXT } from '@/conf/superadmin/Resource';

@Component({
    components: {
        CrudServerDataTable,
        ResourceEditor
    },
    inheritAttrs: false
})
class ResourceTable extends Vue {
    @Ref('resourceTable') readonly resourceTable!: any;

    serverData = new TableDataFromServer();
    loading = false;
    headersConf = [
        RESOURCE_TABLE_HEADER_TEXT.name,
        RESOURCE_TABLE_HEADER_TEXT.action,
        RESOURCE_TABLE_HEADER_TEXT.url,
        RESOURCE_TABLE_HEADER_TEXT.descripton
    ];
    editorVisible = false;
    itemTodo = new ResourceApi.Resource();
    pageParams: IPaginationParams;

    async loadPage(params: IPaginationParams) {
        this.pageParams = params;
        this.resourceTable.loadingOverlay();
        try {
            this.serverData = await ResourceApi.$list(params);
        } catch (e) {}
        this.resourceTable.unOverlay();
    }

    beforeNew() {
        this.itemTodo = new ResourceApi.Resource();
        this.editorVisible = true;
    }
    beforeEdit(item) {
        this.itemTodo = item;
        this.editorVisible = true;
    }

    async onDelete(item) {
        this.resourceTable.submittingOverlay();
        try {
            await ResourceApi.$delete(item);
            this.resourceTable.resetPagination();
        } catch (e) {}
        this.resourceTable.unOverlay();
    }

    async onEdit(val: boolean | ResourceApi.Resource) {
        this.editorVisible = false;

        if (typeof val === 'boolean') return;

        this.resourceTable.submittingOverlay();
        try {
            if (val.id !== -1) await ResourceApi.$edit(val);
            else await ResourceApi.$add(val);
            await this.loadPage(this.pageParams);
        } catch (e) {
        } finally {
            this.resourceTable.unOverlay();
        }
    }

    onSelect(items) {
        this.$emit('input', items);
    }
}

export default ResourceTable;
</script>

<style>
</style>