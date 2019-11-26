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
        </v-data-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import ServerDataTable from '@/components/common/Table/ServerDataTable.vue';

import * as ResourceApi from '@/api/superadmin/Resource';
import { IPageOptions } from '@/api/admin/table';

import { COMMON_TABLE_HEADER_TEXT } from '@/conf/admin/table';
import { RESOURCE_TABLE_HEADER_TEXT } from '@/conf/superadmin/Resource';

@Component
class ResourceTable extends ServerDataTable {
    @Prop({ type: Boolean, default: false }) readonly newAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly deleteAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly editAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly selectAction!: boolean;

    async loadPage() {
        this.loading = true;
        try {
            this.serverData = await ResourceApi.$list(this
                .pageOptions as IPageOptions);
        } catch (e) {}
        this.loading = false;
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