<template>
    <v-card>
        <v-data-table
            :value="value"
            :items="serverData.results"
            :server-items-length="serverData.total"
            :headers="headers"
            :show-select="selectAction"
            :footer-props="footerProps"
            :items-per-page="defaultItemsPerPage"
            :options.sync="pageOptions"
            class="elevation-1"
            @input="onSelect"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
                    <v-divider inset vertical class="mx-4" />
                    <new-action
                        v-if="newAction"
                        :text="$t('components.crudTable.newButtonText')"
                        class="mr-4"
                        @new="beforeNew"
                    />
                    <v-spacer></v-spacer>
                    <search-action
                        v-if="searchAction"
                        v-model="searchOption"
                        class="flex-grow-1"
                        @search="onSearch"
                    />
                </v-toolbar>
            </template>
            <template v-if="actionColumnState" v-slot:item.actions="{ item }">
                <template v-for="action in customActions">
                    <slot :name="action" :item="item" />
                </template>
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
            <template
                v-for="columnName in customColumns"
                v-slot:[`item.${columnName}`]="{ item }"
            >
                <slot :name="columnName" :item="item" />
            </template>
        </v-data-table>
        <confirm-dialog
            :visible="confirmDeleteDialogVisible"
            :title="$t('components.dialog.makeSureToDeleteTitle')"
            @close="onDelete"
        />
        <loading-overlay :loading="loading" :loading-text="loadingText" />
        <slot
            v-if="editorDialogVisible"
            name="editor"
            :visible="editorDialogVisible"
            :item-todo="itemTodo"
            :close-handler="onCloseEditorDialog"
        ></slot>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
import _ from 'lodash';

import SearchAction from './SearchAction.vue';
import NewAction from './NewAction.vue';
import EditAction from './EditAction.vue';
import DeleteAction from './DeleteAction.vue';

import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import LoadingOverlay from '@/components/common/LoadingOverlay.vue';

import {
    ITableDataFromServer,
    ICrudTableApi,
    IPaginationParams,
    DEFAULT_ITEMS_PER_PAGE,
    TableDataFromServer
} from '@/api/admin/crudTable';

import * as Message from '@/utils/message';
import { $t } from '@/utils/NuxtOptions';

const COMMON_TABLE_HEADER_TEXT = {
    get operations() {
        return {
            text: $t('components.crudTable.actionsHeaderText'),
            value: 'actions',
            sortable: false,
            align: 'center',
            width: '150px'
        };
    }
};

@Component({
    components: {
        SearchAction,
        NewAction,
        EditAction,
        DeleteAction,
        LoadingOverlay,
        ConfirmDialog
    }
})
class BaseCrudTable extends Vue {
    @Prop({ type: String, default: 'CRUDTable' }) readonly tableTitle!: string;
    @Prop({ type: Boolean, default: false }) readonly newAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly deleteAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly editAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly selectAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly searchAction!: boolean;
    @Prop({ type: Array, required: true }) readonly headersConf!: any[];
    @Prop({ type: Object, required: false }) readonly crudApi!: ICrudTableApi;
    @Prop({ type: Array }) readonly value!: any[];
    @Prop({ type: Array }) readonly customColumns!: string[];
    @Prop({ type: Array }) readonly customActions!: string[];

    get actionColumnState() {
        return this.deleteAction || this.editAction || this.customActions;
    }

    get headers() {
        const clonedHeaders = _.cloneDeep(this.headersConf);

        if (this.actionColumnState) {
            clonedHeaders.push(COMMON_TABLE_HEADER_TEXT.operations);
        }

        return clonedHeaders;
    }

    footerProps = {
        itemsPerPageOptions: [1, DEFAULT_ITEMS_PER_PAGE, 20, 50]
    };
    defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE;
    pageOptions = {};
    searchOption = '';
    loading = false;
    loadingText = '';
    confirmDeleteDialogVisible = false;
    editorDialogVisible = false;
    serverData = new TableDataFromServer();
    itemTodo: any | undefined = {};

    @Watch('pageOptions', { deep: true })
    onUpdatePageOptions() {
        this.loadPage();
    }

    get paginationParams(): IPaginationParams {
        const { page, itemsPerPage } = this.pageOptions as any;
        const params: IPaginationParams = {
            start: (page - 1) * itemsPerPage,
            count: itemsPerPage
        };

        if (this.searchOption !== '' && this.searchOption !== undefined) {
            params.filter = this.searchOption;
        }

        return params;
    }

    async loadPage() {
        this.loadingOverlay();

        try {
            this.serverData = await this.crudApi.$list(this.paginationParams);
        } catch (e) {
            Message.axiosError(e);
        }

        this.unOverlay();
    }

    beforeNew() {
        this.itemTodo = undefined;
        this.editorDialogVisible = true;
    }

    async beforeEdit(item) {
        if (!this.crudApi.$detail) return;

        this.loadingOverlay();

        try {
            this.itemTodo = await this.crudApi.$detail(item);
            this.editorDialogVisible = true;
        } catch (e) {
            Message.axiosError(e);
        } finally {
            this.unOverlay();
        }
    }

    async onNew(item) {
        if (!this.crudApi.$add) return;

        this.submittingOverlay();

        try {
            await this.crudApi.$add(item);
            Message.axiosSuccess();
            this.loadPage();
        } catch (e) {
            Message.axiosError(e);
        } finally {
            this.unOverlay();
        }
    }

    beforeDelete(item) {
        this.itemTodo = item;
        this.confirmDeleteDialogVisible = true;
    }

    async onDelete(value) {
        if (!this.crudApi.$delete) return;

        this.confirmDeleteDialogVisible = false;
        if (!value) return;

        this.submittingOverlay();

        try {
            await this.crudApi.$delete(this.itemTodo);
            Message.axiosSuccess();

            this.loadFirstPage();
        } catch (e) {
            Message.axiosError(e);
        } finally {
            this.unOverlay();
        }
    }

    async onEdit(item) {
        if (!this.crudApi.$edit) return;

        this.submittingOverlay();

        try {
            await this.crudApi.$edit(item);
            Message.axiosSuccess();
            this.loadPage();
        } catch (e) {
            Message.axiosError(e);
        } finally {
            this.unOverlay();
        }
    }

    onSelect(items) {
        this.$emit('input', items);
    }

    onSearch() {
        this.loadFirstPage();
    }

    loadingOverlay() {
        this.loading = true;
        this.loadingText = this.$t(
            'components.crudTable.loadingText'
        ) as string;
    }

    submittingOverlay() {
        this.loading = true;
        this.loadingText = this.$t(
            'components.crudTable.submittingText'
        ) as string;
    }

    unOverlay() {
        this.loading = false;
    }

    loadFirstPage() {
        this.pageOptions = Object.assign(_.cloneDeep(this.pageOptions), {
            page: 1
        });
    }

    onCloseEditorDialog(val) {
        this.editorDialogVisible = false;

        if (typeof val === 'boolean') return;

        if (typeof this.itemTodo === 'undefined') this.onNew(val);
        else this.onEdit(val);
    }

    reset() {
        this.searchOption = '';
        this.pageOptions = Object.assign(_.cloneDeep(this.pageOptions), {
            page: 1
        });
    }
}

export default BaseCrudTable;
</script>

<style>
</style>