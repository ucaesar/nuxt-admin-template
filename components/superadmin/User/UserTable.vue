<template>
    <base-crud-table
        :table-title="$t('superadmin.userTable.tableTitle')"
        v-bind="$attrs"
        :headers-conf="headersConf"
        :crud-api="api"
        @input="onSelect"
    >
        <template v-slot:editor="{ visible, itemTodo, closeHandler }">
            <user-editor
                :visible="visible"
                :item="itemTodo"
                @close="closeHandler"
            />
        </template>
    </base-crud-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import UserEditor from './UserEditor.vue';

import BaseCrudTable from '@/components/common/CrudTable/BaseCrudTable.vue';

import { ICrudTableApi } from '@/api/admin/crudTable';
import * as UserApi from '@/api/superadmin/User';

import { $t } from '@/utils/NuxtOptions';

class Api implements ICrudTableApi {
    $list = UserApi.$list;
    $delete = UserApi.$delete;
    $add = UserApi.$add;
    $edit = UserApi.$edit;
    $detail = UserApi.$detail;
}

const USER_TABLE_HEADER_TEXT = {
    get username() {
        return {
            text: $t('superadmin.userTable.usernameHeaderText'),
            value: 'username',
            sortable: false
        };
    }
};

@Component({
    components: {
        BaseCrudTable,
        UserEditor
    }
})
class UserTable extends Vue {
    headersConf = [USER_TABLE_HEADER_TEXT.username];
    api = new Api();

    onSelect(items) {
        this.$emit('input', items);
    }
}

export default UserTable;
</script>

<style>
</style>