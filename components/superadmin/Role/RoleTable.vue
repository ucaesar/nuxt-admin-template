<template>
    <base-crud-table
        ref="crudTable"
        :table-title="$t('superadmin.roleTable.tableTitle')"
        v-bind="$attrs"
        :headers-conf="headersConf"
        :crud-api="api"
        @input="onSelect"
    >
        <template v-slot:editor="{ visible, itemTodo, closeHandler }">
            <role-editor
                :visible="visible"
                :item="itemTodo"
                @close="closeHandler"
            />
        </template>
    </base-crud-table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';

import RoleEditor from './RoleEditor.vue';

import BaseCrudTable from '@/components/common/CrudTable/BaseCrudTable.vue';

import { ROLE_TABLE_HEADER_TEXT } from '@/conf/superadmin/Role';

import * as RoleApi from '@/api/superadmin/Role';
import { ICrudTableApi } from '@/api/admin/crudTable';

import { CrudTableComponent } from '@/utils/crudTable';

class Api implements ICrudTableApi {
    $list = RoleApi.$list;
    $delete = RoleApi.$delete;
    $add = RoleApi.$add;
    $edit = RoleApi.$edit;
    $detail = RoleApi.$detail;
}

@Component({
    components: {
        BaseCrudTable,
        RoleEditor
    },
    inheritAttrs: false
})
class CrudTable extends Vue {
    @Ref('crudTable') readonly crudTable!: CrudTableComponent;

    headersConf = [
        ROLE_TABLE_HEADER_TEXT.roleName,
        ROLE_TABLE_HEADER_TEXT.description
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