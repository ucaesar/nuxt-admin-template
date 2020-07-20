<template>
    <span>
        <span>
            <v-icon small @click="onClick">mdi-eye</v-icon>
        </span>
        <v-dialog v-model="visible" persistent max-width="1200" scrollable>
            <v-card v-if="visible">
                <v-card-title class="headline">
                    运单详细信息
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <shipment-details-card :form-data="formData" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="visible = false"
                        >Disagree</v-btn
                    >
                    <v-btn color="green darken-1" text>Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import ShipmentDetailsCard from './ShipmentDetailsCard.vue';

import * as ShipmentApi from '@/api/expressweb/account/shipment';
import { IShipment, ShipmentData } from '@/models/expressweb/Shipment';

@Component({
    components: {
        ShipmentDetailsCard
    }
})
class WatchAction extends Vue {
    @Prop({ type: Object, required: true })
    readonly item!: ShipmentApi.IShipmentItem;

    visible = false;
    formData: ShipmentApi.IShipmentDetais;

    async onClick() {
        this.$emit('overlay');

        this.formData = await ShipmentApi.$detail(this.item);

        this.$emit('unOverlay');
        this.visible = true;
    }
}

export default WatchAction;
</script>

<style>
</style>