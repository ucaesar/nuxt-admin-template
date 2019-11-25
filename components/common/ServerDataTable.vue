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
    ></v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';

import { TableDataFromServer, DEFAULT_ITEMS_PER_PAGE } from '@/api/admin/table';

@Component
class ServerDataTable extends Vue {
    @Watch('pageOptions', { deep: true })
    loadPage() {}

    get headers():any[] {
        return [];
    }

    footerProps = {
        itemsPerPageOptions: [1, DEFAULT_ITEMS_PER_PAGE, 20, 50]
    };
    defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE;
    pageOptions = {};
    serverData = new TableDataFromServer();
    loading = false;
    selected: any[] = [];
}

export default ServerDataTable;
</script>

<style>
</style>