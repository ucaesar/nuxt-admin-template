<template>
    <base-crud-table
        :table-title="$t('superadmin.resourceGroupTable.tableTitle')"
        v-bind="$attrs"
        :headers-conf="headersConf"
        :crud-api="api"
        @input="onSelect"
    >
        <template v-slot:editor="{ visible, itemTodo, closeHandler }">
            <resource-group-editor
                :visible="visible"
                :item="itemTodo"
                @close="closeHandler"
            />
        </template>
    </base-crud-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import ResourceGroupEditor from './ResourceGroupEditor.vue';

import BaseCrudTable from '@/components/common/CrudTable/BaseCrudTable.vue';

import { RESOURCEGROUP_TABLE_HEADER_TEXT } from '@/conf/superadmin/ResourceGroup';

import * as ResourceGroupApi from '@/api/superadmin/ResourceGroup';
import { ICrudTableApi } from '@/api/admin/crudTable';

class Api implements ICrudTableApi {
    $list = ResourceGroupApi.$list;
    $delete = ResourceGroupApi.$delete;
    $add = ResourceGroupApi.$add;
    $edit = ResourceGroupApi.$edit;
    $detail = ResourceGroupApi.$detail;
}

@Component({
    components: {
        BaseCrudTable,
        ResourceGroupEditor
    },
    inheritAttrs: false
})
class CrudTable extends Vue {
    headersConf = [
        RESOURCEGROUP_TABLE_HEADER_TEXT.groupname,
        RESOURCEGROUP_TABLE_HEADER_TEXT.description
    ];
    api = new Api();

    onSelect(items) {
        this.$emit('input', items);
    }
}

export default CrudTable;
</script>

<style>
</style>