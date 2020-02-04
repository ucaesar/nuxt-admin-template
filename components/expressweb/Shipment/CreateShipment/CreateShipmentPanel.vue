<template>
    <v-expansion-panel>
        <v-expansion-panel-header>{{
            $t('expressweb.shipment.createShipment.panelHeaderText')
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-window v-model="step">
                <v-window-item :value="SENDER_FORM_STEP">
                    <sender-address :step="SENDER_FORM_STEP" @next="onNext" />
                </v-window-item>

                <v-window-item :value="RECEIVER_FORM_STEP">
                    <receiver-address
                        :step="RECEIVER_FORM_STEP"
                        @back="onBack"
                        @next="onNext"
                    />
                </v-window-item>

                <v-window-item :value="PACKAGE_FORM_STEP">
                    <Package
                        :step="PACKAGE_FORM_STEP"
                        @back="onBack"
                        @next="onNext"
                    />
                </v-window-item>
            </v-window>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import SenderAddress from './SenderAddress.vue';
import ReceiverAddress from './ReceiverAddress.vue';
import Package from './Package.vue';

import { Address } from '@/models/expressweb/Address';

@Component({
    components: {
        SenderAddress,
        ReceiverAddress,
        Package
    }
})
class CreateShipmentPanel extends Vue {
    step = 0;
    firstStep = 1;
    lastStep = 3;

    SENDER_FORM_STEP = 1;
    RECEIVER_FORM_STEP = 2;
    PACKAGE_FORM_STEP = 0;

    senderAddress = new Address();
    receiverAddress = new Address();

    onBack(step) {
        step < this.firstStep
            ? (this.step = this.firstStep)
            : (this.step = step);
    }

    onNext({ nextStep, field, value }) {
        // this[field] = value;
        if (nextStep <= this.lastStep) {
            this.step = nextStep;
        }
    }
}

export default CreateShipmentPanel;
</script>

<style>
</style>