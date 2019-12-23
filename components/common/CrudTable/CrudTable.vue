<template>
    <v-card>
        <v-data-table
            :items="serverData.results"
            :server-items-length="serverData.total"
            :headers="headers"
            :show-select="selectAction"
            :footer-props="footerProps"
            :items-per-page="defaultItemsPerPage"
            :options.sync="pageOptions"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
                    <v-divider inset vertical class="mx-4" />
                    <new-action
                        v-if="newAction"
                        :text="$t('components.crudTable.newButtonText')"
                        class="mr-4"
                        @new="editorDialogVisible = !editorDialogVisible"
                    />
                    <v-spacer></v-spacer>
                    <search-action
                        v-if="searchAction"
                        v-model="searchOption"
                        class="flex-grow-1"
                    />
                </v-toolbar>
            </template>
            <template v-if="actionColumnState" v-slot:item.actions="{ item }">
                <edit-action v-if="editAction" :item="item" @edit="onEdit" />
                <delete-action v-if="deleteAction" :item="item" />
            </template>
        </v-data-table>
        <confirm-dialog
            :visible="confirmDeleteDialogVisible"
            :title="$t('components.dialog.makeSureToDeleteTitle')"
        />
        <loading-overlay :loading="loading" :loading-text="loadingText" />
        <slot name="editor" :prop="{ editorDialogVisible }"></slot>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import _ from 'lodash';

import SearchAction from './SearchAction.vue';
import NewAction from './NewAction.vue';
import EditAction from './EditAction.vue';
import DeleteAction from './DeleteAction.vue';
import LoadingOverlay from './LoadingOverlay.vue';

import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

import {
    ITableDataFromServer,
    ICrudTableApi,
    IPaginationParams,
    DEFAULT_ITEMS_PER_PAGE
} from '@/api/admin/crudTable';

import { COMMON_TABLE_HEADER_TEXT } from '@/conf/admin/table';

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
class CrudTable extends Vue {
    @Prop({ type: String, default: 'CRUDTable' }) readonly tableTitle!: string;
    @Prop({ type: Boolean, default: false }) readonly newAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly deleteAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly editAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly selectAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly searchAction!: boolean;
    @Prop({ type: Array, required: false }) readonly headersConf!: any[];
    @Prop({
        type: Object,
        required: false,
        default() {
            return { results: [], total: 0 };
        }
    })
    readonly serverData!: ITableDataFromServer;
    @Prop({ type: Object, required: false }) readonly api!: ICrudTableApi;

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
    loading = false;
    loadingText = '';
    confirmDeleteDialogVisible = false;
    editorDialogVisible = false;

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
}

export default CrudTable;
</script>

<style>
</style>