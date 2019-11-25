<template>
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
                <new-action v-if="newAction" />
            </v-toolbar>
        </template>

        <template v-if="actionColumnState" v-slot:item.actions="{ item }">
            <edit-action v-if="editAction" />
            <delete-action v-if="deleteAction" :item="item" />
        </template>
    </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator';

import DeleteAction from './DeleteAction.vue';
import NewAction from './NewAction.vue';
import EditAction from './EditAction.vue';

import { IPageOptions } from '@/api/admin/table';
import ServerDataTable from '@/components/common/ServerDataTable.vue';
import * as ResourceGroupApi from '@/api/superadmin/ResourceGroup';
import { RESOURCEGROUP_TABLE_HEADER_TEXT } from '@/conf/superadmin/ResourceGroup';

@Component({
    components: {
        NewAction,
        DeleteAction,
        EditAction
    }
})
class ResourceGroupTable extends ServerDataTable {
    @Prop({ type: Boolean, default: false }) readonly newAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly deleteAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly editAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly selectAction!: boolean;

    async loadPage() {
        this.loading = true;
        try {
            this.serverData = await ResourceGroupApi.$list(this
                .pageOptions as IPageOptions);
        } catch (e) {}
        this.loading = false;
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
            headers.push(RESOURCEGROUP_TABLE_HEADER_TEXT.actions);
        }

        return headers;
    }
}

export default ResourceGroupTable;
</script>