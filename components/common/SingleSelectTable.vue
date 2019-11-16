<template>
    <div>
        <v-data-table
            :items="value.result"
            :server-items-length="value.total"
            :headers="tableConf.headers"
            :loading="tableConf.loading"
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

import { TableDataFromServer } from '@/api/admin';
import { DEFAULT_ITEMS_PER_PAGE, TableConf } from '@/conf/admin/table';

@Component
class SingleSelectTable extends Vue {
    @Prop({ type: Object, required: true }) readonly value: TableDataFromServer;
    @Prop({ type: Object, required: true }) readonly tableConf: TableConf;

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