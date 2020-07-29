<template>
    <span>
        <span>
            <v-icon small @click="onClick">mdi-eye</v-icon>
        </span>
        <v-dialog v-model="visible" persistent max-width="1200" scrollable>
            <v-card v-if="visible">
                <v-toolbar class="headline" flat>
                    {{
                        $t('expressweb.account.shipment.detailDialogTitleText')
                    }}
                    <v-spacer></v-spacer>

                    <v-btn icon @click="visible = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <template v-slot:extension>
                        <v-tabs v-model="tab" align-with-title>
                            <v-tab>{{
                                $t(
                                    'expressweb.account.shipment.statusTabHeaderText'
                                )
                            }}</v-tab>
                            <v-tab>{{
                                $t(
                                    'expressweb.account.shipment.labelTabHeaderText'
                                )
                            }}</v-tab>
                            <v-tab>{{
                                $t(
                                    'expressweb.account.shipment.formTabHeaderText'
                                )
                            }}</v-tab>
                        </v-tabs>
                    </template>
                </v-toolbar>
                <v-divider></v-divider>
                <!-- <v-card-text>
                    <shipment-details-card :form-data="formData" />
                </v-card-text> -->
                <v-card-text>
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            <shipment-status
                                :timelines="shipmentData.timelines"
                            />
                        </v-tab-item>
                        <v-tab-item>
                            <label-carousel :label-data="labelData" />
                        </v-tab-item>
                        <v-tab-item>
                            <shipment-form
                                :disabled="true"
                                :form-data="shipmentData"
                            />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="visible = false">{{
                        $t('components.dialog.closeButtonText')
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import ShipmentStatus from './ShipmentStatus.vue';

import ShipmentForm from '@/components/expressweb/Shipment/CreateShipment/Form.vue';
import LabelCarousel from '@/components/expressweb/Shipment/CreateShipment/LabelCarousel.vue';

import * as ShipmentApi from '@/api/expressweb/account/shipment';
import { IShipment, ShipmentData } from '@/models/expressweb/Shipment';

@Component({
    components: {
        ShipmentForm,
        LabelCarousel,
        ShipmentStatus
    }
})
class WatchAction extends Vue {
    @Prop({ type: Object, required: true })
    readonly item!: ShipmentApi.IShipmentItem;

    visible = false;
    shipmentData: ShipmentApi.IShipmentDetails;

    tab = null;

    get labelData() {
        return { labels: this.shipmentData.labels };
    }

    async onClick() {
        this.$emit('overlay');

        this.shipmentData = await ShipmentApi.$detail(this.item);

        this.$emit('unOverlay');
        this.visible = true;
    }
}

export default WatchAction;
</script>

<style>
</style>