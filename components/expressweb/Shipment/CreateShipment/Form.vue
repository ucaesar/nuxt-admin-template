<template>
    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-card>
                <v-toolbar flat>
                    <v-btn text color="primary"
                        ><v-icon>mdi-plus</v-icon>读取运单</v-btn
                    >
                </v-toolbar>
                <v-card-text>
                    <v-tabs
                        :vertical="!$breakpoint.isMobile"
                        show-arrows
                        center-active
                        :class="$breakpoint.isMobile ? '' : 'my-tabs'"
                        :color="silderColor"
                        @change="onTabChanged"
                    >
                        <form-tab
                            :label="
                                $t(
                                    'expressweb.shipment.createShipment.senderAddressHeaderText'
                                )
                            "
                            :error="failedFlags[SENDER_ADDRESS_STEP]"
                            icon="mdi-map-marker"
                        >
                        </form-tab>
                        <form-tab
                            :label="
                                $t(
                                    'expressweb.shipment.createShipment.receiverAddressHeaderText'
                                )
                            "
                            :error="failedFlags[RECEIVER_ADDRESS_STEP]"
                            icon="mdi-map-marker"
                        >
                        </form-tab>
                        <form-tab
                            :label="
                                $t(
                                    'expressweb.shipment.createShipment.packageHeaderText'
                                )
                            "
                            :error="failedFlags[PACKAGE_STEP]"
                            icon="mdi-package-variant"
                        ></form-tab>
                        <form-tab
                            :label="
                                $t(
                                    'expressweb.shipment.createShipment.productHeaderText'
                                )
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
                                    :value="formData.senderAddress"
                                    :failed="failed"
                                    @input="
                                        val => onUpdate('senderAddress', val)
                                    "
                                    @failed="
                                        val =>
                                            setFailedFlags(
                                                SENDER_ADDRESS_STEP,
                                                val
                                            )
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
                                    :value="formData.receiverAddress"
                                    :failed="failed"
                                    @input="
                                        val => onUpdate('receiverAddress', val)
                                    "
                                    @failed="
                                        val =>
                                            setFailedFlags(
                                                RECEIVER_ADDRESS_STEP,
                                                val
                                            )
                                    "
                                /> </validation-observer
                        ></v-tab-item>
                        <v-tab-item eager
                            ><validation-observer
                                ref="packageForm"
                                v-slot="{ failed }"
                            >
                                <package-form
                                    :value="formData.pac"
                                    :failed="failed"
                                    @input="val => onUpdate('pac', val)"
                                    @failed="
                                        val => setFailedFlags(PACKAGE_STEP, val)
                                    "
                                /> </validation-observer
                        ></v-tab-item>
                        <v-tab-item eager
                            ><validation-observer
                                ref="productsForm"
                                v-slot="{ failed }"
                            >
                                <product-form
                                    :value="formData.products"
                                    :failed="failed"
                                    :weight-unit="formData.pac.weightUnit"
                                    @input="val => onUpdate('products', val)"
                                    @failed="
                                        val =>
                                            setFailedFlags(PRODUCTS_STEP, val)
                                    "
                                /> </validation-observer
                        ></v-tab-item>
                    </v-tabs>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="8">
            <v-btn color="primary" dark @click="onSubmit">创建运单</v-btn>
            <v-btn text>重置</v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';
import { ValidationObserver } from 'vee-validate';
import _ from 'lodash';

import FormTab from './FormTab.vue';
import SenderAddressForm from './SenderAddress.vue';
import ReceiverAddressForm from './ReceiverAddress.vue';
import PackageForm from './Package.vue';
import ProductForm from './Product.vue';

import { ShipmentData } from '@/models/expressweb/Shipment';

import * as Api from '@/api/expressweb/createShipment';

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

    formData = new ShipmentData();

    failedFlags = [false, false, false, false];

    curStep = 0;
    SENDER_ADDRESS_STEP = 0;
    RECEIVER_ADDRESS_STEP = 1;
    PACKAGE_STEP = 2;
    PRODUCTS_STEP = 3;

    onUpdate(field, value) {
        this.formData[field] = value;
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
        const productsValid = await this.productsForm.validate();

        if (
            senderAddressValid &&
            receiverAddressValid &&
            packageValid &&
            productsValid
        ) {
            Api.$post(this.formData);
        }
    }

    mounted() {
        this.formData = this.getTestFormData();
    }

    getTestFormData() {
        const formData = new ShipmentData();

        formData.senderAddress.name = 'James Wang';
        formData.senderAddress.phone = '123';
        formData.senderAddress.country = 'CA';
        formData.senderAddress.province = 'BC';
        formData.senderAddress.city = 'Burnaby';
        formData.senderAddress.postcode = 'V5C 3J1';
        formData.senderAddress.address = '3845 William St';

        formData.receiverAddress.name = 'Caesar You';
        formData.receiverAddress.phone = '123';
        formData.receiverAddress.country = 'CA';
        formData.receiverAddress.province = 'BC';
        formData.receiverAddress.city = 'Vancouver';
        formData.receiverAddress.postcode = 'V6B 2T9';
        formData.receiverAddress.address = '1111 Mainland St';

        formData.pac.weightUnit = 'kg';
        formData.pac.dimensionUnit = 'cm';
        formData.pac.packageType = '1';
        formData.pac.weight = '0.1';

        formData.products[0] = {
            description: 'desc',
            origin: 'CN',
            weight: '1',
            quantity: '1',
            unit: 'piece',
            pricePerUnit: '35'
        };

        return formData;
    }
}

export default CreateShipmentForm;
</script>

<style>
.my-tabs [role='tab'] {
    justify-content: flex-start;
}
</style>