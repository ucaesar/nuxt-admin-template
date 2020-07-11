<template>
    <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';

import BaseCrudTable from '@/components/common/CrudTable/BaseCrudTable.vue';

import * as ShipmentApi from '@/api/expressweb/account/shipment';
import { ICrudTableApi } from '@/api/admin/crudTable';

import { CrudTableComponent } from '@/utils/crudTable';
import { $t } from '@/utils/NuxtOptions';

class Api implements ICrudTableApi {
    $list = ShipmentApi.$list;
    $delete = ShipmentApi.$delete;
    $add = ShipmentApi.$add;
    $edit = ShipmentApi.$edit;
    $detail = ShipmentApi.$detail;
}

@Component({
    components: {}
})
class ShipmentTable extends Vue {}

export default ShipmentTable;
</script>

<style>
</style>