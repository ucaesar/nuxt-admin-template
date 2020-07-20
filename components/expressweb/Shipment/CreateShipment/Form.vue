<template>
    <!-- this.$emit('submit', formData) -->
    <v-card flat>
        <v-card-title v-if="!disabled"
            ><v-toolbar flat dense>
                <v-btn text color="primary"
                    ><v-icon>mdi-plus</v-icon>读取运单</v-btn
                >
            </v-toolbar></v-card-title
        >

        <v-card-text class="px-0">
            <v-tabs
                :vertical="!$breakpoint.isMobile"
                center-active
                :class="$breakpoint.isMobile ? '' : 'my-tabs'"
                :color="silderColor"
                @change="onTabChanged"
            >
                <form-tab
                    :label="
                        $t(
                            'expressweb.shipment.completeForm.senderAddressHeaderText'
                        )
                    "
                    :error="failedFlags[SENDER_ADDRESS_STEP]"
                    icon="mdi-map-marker"
                >
                </form-tab>
                <form-tab
                    :label="
                        $t(
                            'expressweb.shipment.completeForm.receiverAddressHeaderText'
                        )
                    "
                    :error="failedFlags[RECEIVER_ADDRESS_STEP]"
                    icon="mdi-map-marker"
                >
                </form-tab>
                <form-tab
                    :label="
                        $t('expressweb.shipment.completeForm.packageHeaderText')
                    "
                    :error="failedFlags[PACKAGE_STEP]"
                    icon="mdi-package-variant"
                ></form-tab>
                <form-tab
                    v-if="showProductForm"
                    :label="
                        $t('expressweb.shipment.completeForm.productHeaderText')
                    "
                    :error="failedFlags[PRODUCTS_STEP]"
                    icon="mdi-sack"
                ></form-tab>

                <v-tab-item eager>
                    <validation-observer
                        ref="senderAddressForm"
                        v-slot="{ failed }"
                    >
                        <sender-address-form
                            :disabled="disabled"
                            :value="formData.senderAddress"
                            :failed="failed"
                            @input="val => onUpdate('senderAddress', val)"
                            @failed="
                                val => setFailedFlags(SENDER_ADDRESS_STEP, val)
                            "
                        />
                    </validation-observer>
                </v-tab-item>

                <v-tab-item eager
                    ><validation-observer
                        ref="receiverAddressForm"
                        v-slot="{ failed }"
                    >
                        <receiver-address-form
                            :disabled="disabled"
                            :value="formData.receiverAddress"
                            :failed="failed"
                            @input="val => onUpdate('receiverAddress', val)"
                            @failed="
                                val =>
                                    setFailedFlags(RECEIVER_ADDRESS_STEP, val)
                            "
                        /> </validation-observer
                ></v-tab-item>
                <v-tab-item eager
                    ><validation-observer ref="packageForm" v-slot="{ failed }">
                        <package-form
                            :disabled="disabled"
                            :value="formData.pac"
                            :failed="failed"
                            @input="val => onUpdate('pac', val)"
                            @failed="val => setFailedFlags(PACKAGE_STEP, val)"
                        /> </validation-observer
                ></v-tab-item>
                <v-tab-item v-if="showProductForm" eager
                    ><validation-observer
                        ref="productsForm"
                        v-slot="{ failed }"
                    >
                        <product-form
                            :disabled="disabled"
                            :value="formData.products"
                            :failed="failed"
                            :weight-unit="formData.pac.weightUnit"
                            @input="val => onUpdate('products', val)"
                            @failed="val => setFailedFlags(PRODUCTS_STEP, val)"
                        /> </validation-observer
                ></v-tab-item>
            </v-tabs>
        </v-card-text>
        <v-card-actions v-if="!disabled">
            <v-toolbar flat dense>
                <v-btn color="primary" dark @click="onSubmit">{{
                    $t('components.stepper.nextButtonText')
                }}</v-btn>
                <v-btn text>{{
                    $t('components.stepper.resetButtonText')
                }}</v-btn></v-toolbar
            >
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'nuxt-property-decorator';
import { ValidationObserver } from 'vee-validate';
import _ from 'lodash';

import FormTab from './FormTab.vue';
import SenderAddressForm from './SenderAddress.vue';
import ReceiverAddressForm from './ReceiverAddress.vue';
import PackageForm from './Package.vue';
import ProductForm from './Product.vue';

import { IShipment } from '@/models/expressweb/Shipment';

import * as Api from '@/api/expressweb/shipment/create';

@Component({
    components: {
        SenderAddressForm,
        ReceiverAddressForm,
        PackageForm,
        ProductForm,
        ValidationObserver,
        FormTab
    }
})
class CreateShipmentForm extends Vue {
    @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
    @Prop({ type: Object, required: true }) readonly formData!: IShipment;

    @Ref('senderAddressForm') readonly senderAddressForm!: InstanceType<
        typeof ValidationObserver
    >;
    @Ref('receiverAddressForm') readonly receiverAddressForm!: InstanceType<
        typeof ValidationObserver
    >;
    @Ref('packageForm') readonly packageForm!: InstanceType<
        typeof ValidationObserver
    >;
    @Ref('productsForm') readonly productsForm!: InstanceType<
        typeof ValidationObserver
    >;

    get silderColor() {
        return this.failedFlags[this.curStep] ? 'red' : '';
    }

    get showProductForm() {
        if (!this.formData.products || this.formData.products.length === 0)
            return false;
        return true;
    }

    failedFlags = [false, false, false, false];

    curStep = 0;
    SENDER_ADDRESS_STEP = 0;
    RECEIVER_ADDRESS_STEP = 1;
    PACKAGE_STEP = 2;
    PRODUCTS_STEP = 3;

    onUpdate(field, value) {
        // this.formData[field] = value;
        this.$emit('input', field, value);
    }

    onTabChanged(number) {
        this.curStep = number;
    }

    setFailedFlags(index, val) {
        this.$set(this.failedFlags, index, val);
    }

    async onSubmit() {
        const senderAddressValid = await this.senderAddressForm.validate();
        const receiverAddressValid = await this.receiverAddressForm.validate();
        const packageValid = await this.packageForm.validate();
        const productsValid = this.showProductForm
            ? await this.productsForm.validate()
            : true;

        if (
            senderAddressValid &&
            receiverAddressValid &&
            packageValid &&
            productsValid
        ) {
            this.$emit('submit', true);
        }
    }
}

export default CreateShipmentForm;
</script>

<style>
.my-tabs [role='tab'] {
    justify-content: flex-start;
}
</style>