<template>
    <base-crud-table
        :table-title="$t('superadmin.resourceTable.tableTitle')"
        v-bind="$attrs"
        :headers-conf="headersConf"
        :crud-api="api"
    >
        <template v-slot:editor="{ visible, itemTodo, closeHandler }">
            <resource-editor
                :visible="visible"
                :item="itemTodo"
                @close="closeHandler"
            />
        </template>
    </base-crud-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import ResourceEditor from './ResourceEditor.vue';

import BaseCrudTable from '@/components/common/CrudTable/BaseCrudTable.vue';

import { RESOURCE_TABLE_HEADER_TEXT } from '@/conf/superadmin/Resource';

import * as ResourceApi from '@/api/superadmin/Resource';
import { ICrudTableApi } from '@/api/admin/crudTable';

class Api implements ICrudTableApi {
    $list = ResourceApi.$list;
    $delete = ResourceApi.$delete;
    $add = ResourceApi.$add;
    $edit = ResourceApi.$edit;
    $detail = ResourceApi.$detail;
}

@Component({
    components: {
        BaseCrudTable,
        ResourceEditor
    },
    inheritAttrs: false
})
class CrudTable extends Vue {
    headersConf = [
        RESOURCE_TABLE_HEADER_TEXT.name,
        RESOURCE_TABLE_HEADER_TEXT.action,
        RESOURCE_TABLE_HEADER_TEXT.url,
        RESOURCE_TABLE_HEADER_TEXT.description
    ];
    api = new Api();
}

export default CrudTable;
</script>

<style>
</style>