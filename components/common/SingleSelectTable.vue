<template>
    <v-data-table
        :items="tableState.serverData.result"
        :server-items-length="tableState.serverData.total"
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

import { TableState } from '@/api/admin/TableState';

@Component
class SingleSelectTable extends Vue {
    @Prop({ type: Object, required: true }) readonly tableState: TableState;

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