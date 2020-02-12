<template>
    <!-- <v-expansion-panel>
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
    </v-expansion-panel> -->

    <v-stepper
        :value="step"
        class="elevation-0"
        :style="{ background: '#eeeeee' }"
        alt-labels
    >
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-stepper-header class="elevation-0">
                    <v-stepper-step :step="1">{{
                        $t(
                            'expressweb.shipment.createShipment.senderAddressHeaderText'
                        )
                    }}</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :step="2">{{
                        $t(
                            'expressweb.shipment.createShipment.receiverAddressHeaderText'
                        )
                    }}</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :step="3">{{
                        $t(
                            'expressweb.shipment.createShipment.packageHeaderText'
                        )
                    }}</v-stepper-step>
                </v-stepper-header>
            </v-col>
            <v-col cols="12" md="6">
                <v-stepper-items>
                    <v-stepper-content :step="1" class="pa-0">
                        <sender-address @next="onNext" />
                    </v-stepper-content>
                    <v-stepper-content :step="2" class="pa-0">
                        <receiver-address @back="onBack" @next="onNext" />
                    </v-stepper-content>
                    <v-stepper-content :step="3" class="pa-0">
                        <package @back="onBack" @next="onNext" />
                    </v-stepper-content>
                </v-stepper-items>
            </v-col>
        </v-row>
    </v-stepper>
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
    step = 1;
    firstStep = 1;
    lastStep = 3;

    SENDER_FORM_STEP = 1;
    RECEIVER_FORM_STEP = 2;
    PACKAGE_FORM_STEP = 0;

    senderAddress = new Address();
    receiverAddress = new Address();

    onBack() {
        const backStep = this.step - 1;
        backStep < this.firstStep
            ? (this.step = this.firstStep)
            : (this.step = backStep);
    }

    onNext() {
        // this[field] = value;
        const nextStep = this.step + 1;
        if (nextStep <= this.lastStep) {
            this.step = nextStep;
        }
    }
}

export default CreateShipmentPanel;
</script>

<style>
</style>