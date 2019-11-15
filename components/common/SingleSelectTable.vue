<template>
    <div>
        <v-data-table
            :loading="loading"
            :items="value.result"
            :server-items-length="value.total"
            :headers="tableConf.headers"
            :footer-props="tableConf.footerProps"
            :items-per-page="defaultItemsPerPage"
            single-select
            show-select
            :options.sync="options"
            class="elevation-1"
        ></v-data-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { TableDataFromServer, TableConf } from '@/models/admin';
import { DEFAULT_ITEMS_PER_PAGE } from '@/conf/admin/table';

@Component
class SingleSelectTable extends Vue {
    @Prop({ type: Object, required: true }) readonly value: TableDataFromServer;
    @Prop({ type: Object, required: true }) readonly tableConf: TableConf;
    @Prop({ type: Boolean, required: true }) readonly loading: boolean;

    @Watch('options', { deep: true })
    onUpdateOptions(val) {
        this.$emit('load-page', val);
    }

    options = {};
    defaultItemsPerPage = DEFAULT_ITEMS_PER_PAGE;
}

export default SingleSelectTable;
</script>

<style>
</style>