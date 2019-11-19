<template>
    <v-data-table
        :items="serverData.results"
        :server-items-length="serverData.total"
        :headers="tableState.uiConf.headers"
        :loading="tableState.uiConf.loading"
        :footer-props="tableState.uiConf.footerProps"
        :items-per-page="tableState.uiConf.defaultItemsPerPage"
        single-select
        show-select
        :options.sync="options"
        class="elevation-1"
    ></v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import { ITableDataFromServer } from '@/api/admin/table';

@Component
class SingleSelectTable extends Vue {
    @Prop({ type: Object, required: true }) readonly serverData: ITableDataFromServer;

    @Watch('options', { deep: true })
    onUpdateOptions(val) {
        this.$emit('load-page', val);
    }

    options = {};
}

export default SingleSelectTable;
</script>

<style>
</style>