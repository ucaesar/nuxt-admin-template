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
                    <v-stepper-step
                        :step="SENDER_FORM_STEP"
                        :complete="SENDER_FORM_STEP < step"
                        >{{
                            $t(
                                'expressweb.shipment.createShipment.senderAddressHeaderText'
                            )
                        }}</v-stepper-step
                    >

                    <v-divider></v-divider>

                    <v-stepper-step
                        :step="RECEIVER_FORM_STEP"
                        :complete="RECEIVER_FORM_STEP < step"
                        >{{
                            $t(
                                'expressweb.shipment.createShipment.receiverAddressHeaderText'
                            )
                        }}</v-stepper-step
                    >

                    <v-divider></v-divider>

                    <v-stepper-step
                        :step="PACKAGE_FORM_STEP"
                        :complete="PACKAGE_FORM_STEP < step"
                        >{{
                            $t(
                                'expressweb.shipment.createShipment.packageHeaderText'
                            )
                        }}</v-stepper-step
                    >
                    <v-divider></v-divider>

                    <v-stepper-step
                        :step="PRODUCT_FORM_STEP"
                        :complete="PRODUCT_FORM_STEP < step"
                        >{{
                            $t(
                                'expressweb.shipment.createShipment.productHeaderText'
                            )
                        }}</v-stepper-step
                    >
                </v-stepper-header>
            </v-col>
            <v-col cols="12" md="6">
                <v-stepper-items>
                    <v-stepper-content :step="SENDER_FORM_STEP" class="pa-0">
                        <sender-address @next="onNext" />
                    </v-stepper-content>
                    <v-stepper-content :step="RECEIVER_FORM_STEP" class="pa-0">
                        <receiver-address @back="onBack" @next="onNext" />
                    </v-stepper-content>
                    <v-stepper-content :step="PACKAGE_FORM_STEP" class="pa-0">
                        <package-component @back="onBack" @next="onNext" />
                    </v-stepper-content>
                    <v-stepper-content :step="PRODUCT_FORM_STEP" class="pa-0">
                        <product-component
                            :weight-unit="pac.weightUnit"
                            @back="onBack"
                            @next="onNext"
                        />
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
import PackageComponent from './Package.vue';
import ProductComponent from './Product.vue';

import { Address } from '@/models/expressweb/Address';
import { Package } from '@/models/expressweb/Package';
import { Product } from '@/models/expressweb/Product';

@Component({
    components: {
        SenderAddress,
        ReceiverAddress,
        PackageComponent,
        ProductComponent
    }
})
class CreateShipmentPanel extends Vue {
    step = 1;
    firstStep = 1;
    lastStep = 4;

    SENDER_FORM_STEP = 1;
    RECEIVER_FORM_STEP = 2;
    PACKAGE_FORM_STEP = 3;
    PRODUCT_FORM_STEP = 4;

    senderAddress = new Address();
    receiverAddress = new Address();
    pac = new Package();
    products = [new Product()];

    completeState() {}

    onBack() {
        const backStep = this.step - 1;
        backStep < this.firstStep
            ? (this.step = this.firstStep)
            : (this.step = backStep);
    }

    onNext(field, value) {
        this[field] = value;
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