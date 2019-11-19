<template>
    <v-data-table
        :items="serverData.results"
        :server-items-length="serverData.total"
        :headers="headers"
        :loading="loading"
        :footer-props="footerProps"
        :items-per-page="defaultItemsPerPage"
        single-select
        show-select
        :options.sync="options"
        class="elevation-1"
    ></v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import {
    ITableDataFromServer,
    DEFAULT_ITEMS_PER_PAGE
} from '@/api/admin/table';

@Component
class SingleSelectTable extends Vue {
    @Prop({ type: Object, required: true })
    readonly serverData!: ITableDataFromServer;

    @Prop({ type: Boolean })
    readonly loading!: boolean;

    @Watch('options', { deep: true })
    onUpdateOptions(newOptions) {
        this.$emit('load-page', newOptions);
    }

    footerProps = {
        itemsPerPageOptions: [1, DEFAULT_ITEMS_PER_PAGE, 20, 50]
    };
    defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE;
    headers: any[] = [];
    options = {};
}

export default SingleSelectTable;
</script>

<style>
</style>