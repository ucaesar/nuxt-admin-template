<template>
    <base-crud-table
        ref="crudTable"
        :table-title="$t('superadmin.resourceTable.tableTitle')"
        v-bind="$attrs"
        :headers-conf="headersConf"
        :crud-api="api"
        @input="onSelect"
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
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';

import ResourceEditor from './ResourceEditor.vue';

import BaseCrudTable from '@/components/common/CrudTable/BaseCrudTable.vue';

import * as ResourceApi from '@/api/superadmin/Resource';
import { ICrudTableApi } from '@/api/admin/crudTable';

import { CrudTableComponent } from '@/utils/crudTable';
import { $t } from '@/utils/NuxtOptions';

class Api implements ICrudTableApi {
    $list = ResourceApi.$list;
    $delete = ResourceApi.$delete;
    $add = ResourceApi.$add;
    $edit = ResourceApi.$edit;
    $detail = ResourceApi.$detail;
}

const RESOURCE_TABLE_HEADER_TEXT = {
    get name() {
        return {
            text: $t('superadmin.resourceTable.nameHeaderText'),
            value: 'name',
            sortable: false,
            width: '200px'
        };
    },
    get action() {
        return {
            text: $t('superadmin.resourceTable.actionHeaderText'),
            value: 'action',
            sortable: false,
            width: '150px'
        };
    },
    get url() {
        return {
            text: $t('superadmin.resourceTable.urlHeaderText'),
            value: 'url',
            sortable: false
        };
    },
    get description() {
        return {
            text: $t('superadmin.resourceTable.descriptionHeaderText'),
            value: 'description',
            sortable: false
        };
    }
};

@Component({
    components: {
        BaseCrudTable,
        ResourceEditor
    },
    inheritAttrs: false
})
class CrudTable extends Vue {
    @Ref('crudTable') readonly crudTable!: CrudTableComponent;

    headersConf = [
        RESOURCE_TABLE_HEADER_TEXT.name,
        RESOURCE_TABLE_HEADER_TEXT.action,
        RESOURCE_TABLE_HEADER_TEXT.url,
        RESOURCE_TABLE_HEADER_TEXT.description
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