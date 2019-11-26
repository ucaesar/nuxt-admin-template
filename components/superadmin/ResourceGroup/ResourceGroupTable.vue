<template>
    <div>
        <v-data-table
            v-model="selected"
            :items="serverData.results"
            :server-items-length="serverData.total"
            :headers="headers"
            :loading="loading"
            :footer-props="footerProps"
            :items-per-page="defaultItemsPerPage"
            :options.sync="pageOptions"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <new-action v-if="newAction" @edit="beforeEdit" />
                </v-toolbar>
            </template>

            <template v-if="actionColumnState" v-slot:item.actions="{ item }">
                <edit-action
                    v-if="editAction"
                    :item="item"
                    @edit="beforeEdit"
                />
                <delete-action
                    v-if="deleteAction"
                    :item="item"
                    @delete="beforeDelete"
                />
            </template>
        </v-data-table>
        <confirm-dialog
            :visible="askToDeleteDialogVisible"
            :title="$t('components.dialog.makeSureToDeleteTitle')"
            @close="onDelete"
        />
        <resource-group-editor
            :visible="editorDialogVisible"
            :item="itemTodo"
            @close="onEdit"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator';

import NewAction from './NewAction.vue';
import ResourceGroupEditor from './ResourceGroupEditor.vue';

import EditAction from '@/components/common/table/EditAction.vue';
import DeleteAction from '@/components/common/table/DeleteAction.vue';
import ServerDataTable from '@/components/common/Table/ServerDataTable.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

import { IPageOptions } from '@/api/admin/table';

import * as ResourceGroupApi from '@/api/superadmin/ResourceGroup';
import { COMMON_TABLE_HEADER_TEXT } from '@/conf/admin/table';
import { RESOURCEGROUP_TABLE_HEADER_TEXT } from '@/conf/superadmin/ResourceGroup';

@Component({
    components: {
        NewAction,
        DeleteAction,
        EditAction,
        ConfirmDialog,
        ResourceGroupEditor
    }
})
class ResourceGroupTable extends ServerDataTable {
    @Prop({ type: Boolean, default: false }) readonly newAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly deleteAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly editAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly selectAction!: boolean;

    askToDeleteDialogVisible = false;
    editorDialogVisible = false;
    itemTodo = new ResourceGroupApi.ResourceGroup();

    async loadPage() {
        this.loading = true;
        try {
            this.serverData = await ResourceGroupApi.$list(this
                .pageOptions as IPageOptions);
        } catch (e) {}
        this.loading = false;
    }

    beforeDelete(item) {
        this.itemTodo = item;
        this.askToDeleteDialogVisible = true;
    }
    onDelete(val) {
        this.askToDeleteDialogVisible = false;
    }

    beforeEdit(item) {
        this.itemTodo = item;
        this.editorDialogVisible = true;
    }
    onEdit(val: boolean | ResourceGroupApi.IResourceGroup) {
        this.editorDialogVisible = false;
    }

    get actionColumnState() {
        return this.deleteAction || this.editAction || this.selectAction;
    }

    get headers() {
        const headers = [
            RESOURCEGROUP_TABLE_HEADER_TEXT.groupname,
            RESOURCEGROUP_TABLE_HEADER_TEXT.description
        ];

        if (this.actionColumnState) {
            headers.push(COMMON_TABLE_HEADER_TEXT.actions);
        }

        return headers;
    }
}

export default ResourceGroupTable;
</script>