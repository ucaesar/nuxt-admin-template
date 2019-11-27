<template>
    <div>
        <v-data-table></v-data-table>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ITableDataFromServer } from '@/api/admin/table';

@Component
class CRUDServerDataTable extends Vue {
    @Prop({ type: Boolean, default: false }) readonly newAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly deleteAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly editAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly selectAction!: boolean;
    @Prop({ type: Boolean, default: false }) readonly searchAction!: boolean;
    @Prop({ type: Array, required: true }) readonly headers!: any[];
    @Prop({ type: Object, required: true })
    readonly serverData!: ITableDataFromServer;
    @Prop({ type: Object }) readonly value!: any[];
}

export default CRUDServerDataTable;
</script>

<style>
</style>