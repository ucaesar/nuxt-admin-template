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
    </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import ServerDataTable from '@/components/common/ServerDataTable.vue';

class ResourceTable extends ServerDataTable {
    async loadPage() {
        this.loading = true;

        this.loading = false;
    }

    headers = []
}

export default ResourceTable;
</script>

<style>
</style>