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
                <delete-button :selected="selected" />
            </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
            <delete-action :item="item" />
        </template>
    </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';

import DeleteButton from './DeleteButton.vue';
import DeleteAction from './DeleteAction.vue';

import { IPageOptions } from '@/api/admin/table';
import ServerDataTable from '@/components/common/ServerDataTable.vue';
import * as ResourceGroupApi from '@/api/superadmin/ResourceGroup';
import { RESOURCEGROUP_TABLE_HEADER_TEXT } from '@/conf/superadmin/ResourceGroup';

@Component({
    components: {
        DeleteButton,
        DeleteAction
    }
})
class ResourceGroupTable extends ServerDataTable {
    async loadPage() {
        this.loading = true;
        try {
            this.serverData = await ResourceGroupApi.$list(this
                .pageOptions as IPageOptions);
        } catch (e) {}
        this.loading = false;
    }

    headers = [
        RESOURCEGROUP_TABLE_HEADER_TEXT.groupname,
        RESOURCEGROUP_TABLE_HEADER_TEXT.description,
        RESOURCEGROUP_TABLE_HEADER_TEXT.actions
    ];
}

export default ResourceGroupTable;
</script>