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
            :show-select="selectAction"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <new-action
                        v-if="newAction"
                        :text="$t('superadmin.resourceTable.newButtonText')"
                        @new="beforeNew"
                    />
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
        <resource-editor
            :visible="editorDialogVisible"
            :item="itemTodo"
            @close="onEdit"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import ResourceEditor from './ResourceEditor.vue';

import NewAction from '@/components/common/Table/NewAction.vue';
import EditAction from '@/components/common/Table/EditAction.vue';
import DeleteAction from '@/components/common/Table/DeleteAction.vue';
import ServerDataTable from '@/components/common/Table/ServerDataTable.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

import * as ResourceApi from '@/api/superadmin/Resource';
import { IPageOptions } from '@/api/admin/table';

import { COMMON_TABLE_HEADER_TEXT } from '@/conf/admin/table';
import { RESOURCE_TABLE_HEADER_TEXT } from '@/conf/superadmin/Resource';

@Component({
    components: {
        NewAction,
        DeleteAction,
        EditAction,
        ConfirmDialog,
        ResourceEditor
    }
})
class ResourceTable extends ServerDataTable {
    @Prop({ type: Boolean, default: false }) readonly newAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly deleteAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly editAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly selectAction!: boolean;

    askToDeleteDialogVisible = false;
    editorDialogVisible = false;
    itemTodo = new ResourceApi.Resource();

    async loadPage() {
        this.loading = true;
        try {
            this.serverData = await ResourceApi.$list(this
                .pageOptions as IPageOptions);
        } catch (e) {}
        this.loading = false;
    }

    beforeNew() {
        this.itemTodo = new ResourceApi.Resource();
        this.editorDialogVisible = true;
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
    onEdit(val: boolean | ResourceApi.IResource) {
        this.editorDialogVisible = false;
    }

    get actionColumnState() {
        return this.deleteAction || this.editAction;
    }

    get headers() {
        const headers = [
            RESOURCE_TABLE_HEADER_TEXT.name,
            RESOURCE_TABLE_HEADER_TEXT.action,
            RESOURCE_TABLE_HEADER_TEXT.url,
            RESOURCE_TABLE_HEADER_TEXT.descripton
        ];
        if (this.actionColumnState) {
            headers.push(COMMON_TABLE_HEADER_TEXT.actions);
        }
        return headers;
    }
}

export default ResourceTable;
</script>

<style>
</style>