<template>
    <base-crud-table
        ref="crudTable"
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
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';

import ResourceGroupEditor from './ResourceGroupEditor.vue';

import BaseCrudTable from '@/components/common/CrudTable/BaseCrudTable.vue';

import * as ResourceGroupApi from '@/api/superadmin/ResourceGroup';
import { ICrudTableApi } from '@/api/admin/crudTable';

import { CrudTableComponent } from '@/utils/crudTable';
import { $t } from '@/utils/NuxtOptions';

class Api implements ICrudTableApi {
    $list = ResourceGroupApi.$list;
    $delete = ResourceGroupApi.$delete;
    $add = ResourceGroupApi.$add;
    $edit = ResourceGroupApi.$edit;
    $detail = ResourceGroupApi.$detail;
}

const RESOURCEGROUP_TABLE_HEADER_TEXT = {
    get groupname() {
        return {
            text: $t('superadmin.resourceGroupTable.groupNameHeaderText'),
            value: 'groupname',
            sortable: false,
            width: '300px'
        };
    },
    get description() {
        return {
            text: $t('superadmin.resourceGroupTable.descriptionHeaderText'),
            value: 'description',
            sortable: false
        };
    }
};

@Component({
    components: {
        BaseCrudTable,
        ResourceGroupEditor
    },
    inheritAttrs: false
})
class CrudTable extends Vue {
    @Ref('crudTable') readonly crudTable!: CrudTableComponent;

    headersConf = [
        RESOURCEGROUP_TABLE_HEADER_TEXT.groupname,
        RESOURCEGROUP_TABLE_HEADER_TEXT.description
    ];
    api = new Api();

    onSelect(items) {
        this.$emit('input', items);
    }

    reset() {
        this.crudTable.reset();
    }
}

export default CrudTable;
</script>

<style>
</style>