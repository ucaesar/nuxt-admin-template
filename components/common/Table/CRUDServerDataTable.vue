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
                <v-toolbar flat color="white">
                    <new-action
                        v-if="newAction"
                        :text="$t('components.table.newButtonText')"
                        class="mr-4"
                        @new="onNew"
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
                <edit-action v-if="editAction" :item="item" @edit="onEdit" />
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
        <loading-overlay :loading="loading" :loading-text="loadingText" />
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
import _ from 'lodash';

import SearchAction from './SearchAction.vue';
import NewAction from './NewAction.vue';
import EditAction from './EditAction.vue';
import DeleteAction from './DeleteAction.vue';
import LoadingOverlay from './LoadingOverlay.vue';

import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

import {
    ITableDataFromServer,
    IPaginationParams,
    DEFAULT_ITEMS_PER_PAGE
} from '@/api/admin/table';

import { COMMON_TABLE_HEADER_TEXT } from '@/conf/admin/table';

import { $t } from '@/utils/NuxtOptions';

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
class CRUDServerDataTable extends Vue {
    @Prop({ type: Boolean, default: false }) readonly newAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly deleteAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly editAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly selectAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly searchAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
    @Prop({ type: Array, required: true }) readonly headersConf!: any[];
    @Prop({ type: Object, required: true })
    readonly serverData!: ITableDataFromServer;
    @Prop({ type: Array }) readonly value!: any[];
    @Prop({ type: String, default: 'Loading...' }) readonly loadingText: string;

    @Watch('pageOptions', { deep: true })
    onUpdatePageOptions() {
        this.onLoadPage();
    }

    get actionColumnState() {
        return this.deleteAction || this.editAction;
    }

    get headers() {
        const clonedHeaders = _.cloneDeep(this.headersConf);

        if (this.actionColumnState) {
            clonedHeaders.push(COMMON_TABLE_HEADER_TEXT.actions);
        }

        return clonedHeaders;
    }

    footerProps = {
        itemsPerPageOptions: [1, DEFAULT_ITEMS_PER_PAGE, 20, 50]
    };
    defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE;
    pageOptions = {};
    searchOption = '';
    askToDeleteDialogVisible = false;
    itemTodo = {};

    computePaginationParams(): IPaginationParams {
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

    onLoadPage() {
        this.$emit('load-page', this.computePaginationParams());
    }

    beforeDelete(item) {
        this.itemTodo = item;
        this.askToDeleteDialogVisible = true;
    }

    onNew() {
        this.$emit('new');
    }

    onDelete(value) {
        this.askToDeleteDialogVisible = false;
        if (value) {
            this.$emit('delete', this.itemTodo);
        }
    }

    onEdit(item) {
        this.$emit('edit', item);
    }

    onSelect(items) {
        this.$emit('input', items);
    }

    onSearch() {
        this.pageOptions = Object.assign(_.cloneDeep(this.pageOptions), {
            page: 1
        });
    }
}

export default CRUDServerDataTable;
</script>

<style>
</style>