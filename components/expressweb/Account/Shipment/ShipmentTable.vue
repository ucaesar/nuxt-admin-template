<template>
    <base-crud-table
        :table-title="$t('expressweb.account.shipment.tableTitle')"
        v-bind="$attrs"
        :headers-conf="headersConf"
        :crud-api="api"
        :custom-column-names="customColumnNames"
    >
        <template v-slot:senderAddress="{ item }">
            {{ addressText(item.senderAddress) }}
        </template>
        <template v-slot:receiverAddress="{ item }">
            {{ addressText(item.receiverAddress) }}
        </template>
    </base-crud-table>
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

const SHIPMENT_TABLE_HEADER_TEXT = {
    get trackno() {
        return {
            text: $t('expressweb.account.shipment.trackNumberHeaderText'),
            value: 'trackno',
            sortable: false,
            width: '200px'
        };
    },
    get createdTime() {
        return {
            text: $t('expressweb.account.shipment.createdTimeHeaderText'),
            value: 'createdAt',
            sortable: false,
            width: '300px'
        };
    },
    get senderInfo() {
        return {
            text: $t('expressweb.account.shipment.senderInfoHeaderText'),
            value: 'senderAddress',
            sortable: false
        };
    },
    get receiverInfo() {
        return {
            text: $t('expressweb.account.shipment.receiverInfoHeaderText'),
            value: 'receiverAddress',
            sortable: false
        };
    }
};

@Component({
    components: {
        BaseCrudTable
    },
    inheritAttrs: false
})
class ShipmentTable extends Vue {
    headersConf = [
        SHIPMENT_TABLE_HEADER_TEXT.trackno,
        SHIPMENT_TABLE_HEADER_TEXT.createdTime,
        SHIPMENT_TABLE_HEADER_TEXT.senderInfo,
        SHIPMENT_TABLE_HEADER_TEXT.receiverInfo
    ];

    customColumnNames = ['senderAddress', 'receiverAddress'];

    api = new Api();

    addressText(item: ShipmentApi.IAddress) {
        return `${item.name}, ${item.city}, ${item.province}, ${item.country}`;
    }
}

export default ShipmentTable;
</script>

<style>
</style>