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
        <template v-slot:fee="{ item }">
            {{ moneyText(item) }}
        </template>
        <template v-slot:createdAt="{ item }">
            {{ dateText(item) }}
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

import { getCountryNameByCode } from '@/conf/expressweb/countries';
import { getProvinceNameByCode } from '@/conf/expressweb/provinces';

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
            width: '150px'
        };
    },
    get createdTime() {
        return {
            text: $t('expressweb.account.shipment.createdTimeHeaderText'),
            value: 'createdAt',
            sortable: false,
            width: '250px'
        };
    },
    get fee() {
        return {
            text: $t('expressweb.account.shipment.moneyHeaderText'),
            value: 'fee',
            sortable: false,
            width: '150px'
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
        SHIPMENT_TABLE_HEADER_TEXT.fee,
        SHIPMENT_TABLE_HEADER_TEXT.senderInfo,
        SHIPMENT_TABLE_HEADER_TEXT.receiverInfo
    ];

    customColumnNames = [
        'senderAddress',
        'receiverAddress',
        'fee',
        'createdAt'
    ];

    api = new Api();

    addressText(item: ShipmentApi.IAddress) {
        const country = getCountryNameByCode(item.country);
        const province = getProvinceNameByCode(item.country, item.province);
        return `${item.name} @ ${item.city}, ${province}, ${country}`;
    }

    moneyText(item: ShipmentApi.IShipment) {
        return `${item.fee.amount} ${item.fee.currency}`;
    }

    dateText(item: ShipmentApi.IShipment) {
        return new Date(Date.parse(item.createdAt)).toLocaleString(
            this.$i18n.locale
        );
    }
}

export default ShipmentTable;
</script>

<style>
</style>