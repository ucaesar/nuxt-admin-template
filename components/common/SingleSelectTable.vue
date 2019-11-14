<template>
    <div>
        <v-data-table
            :items="value.result"
            :server-items-length="value.total"
            :headers="tableConf.headers"
            class="elevation-1"
        ></v-data-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { TableDataFromServer, TableConf } from '@/models/admin';

@Component
class SingleSelectTable extends Vue {
    @Prop({ type: Object, required: true }) readonly value: TableDataFromServer;
    @Prop({ type: Object, required: true }) readonly tableConf: TableConf;
}

export default SingleSelectTable;
</script>

<style>
</style>