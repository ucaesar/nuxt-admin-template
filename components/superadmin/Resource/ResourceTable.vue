<template>
    <div>
        <crud-server-data-table
            :table-title="$t('superadmin.resourceTable.tableTitle')"
            :server-data="serverData"
            :loading="loading"
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
import { Component, Vue, Prop } from 'nuxt-property-decorator';

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

    async loadPage(params: IPaginationParams) {
        this.loading = true;
        try {
            this.serverData = await ResourceApi.$list(params);
        } catch (e) {}
        this.loading = false;
    }

    beforeNew() {
        this.itemTodo = new ResourceApi.Resource();
        this.editorVisible = true;
    }
    beforeEdit(item) {
        this.itemTodo = item;
        this.editorVisible = true;
    }

    onDelete(item) {}
    onEdit(val: boolean | ResourceApi.Resource) {
        this.editorVisible = false;
    }

    onSelect(items) {
        this.$emit('input', items);
    }
}

export default ResourceTable;
</script>

<style>
</style>