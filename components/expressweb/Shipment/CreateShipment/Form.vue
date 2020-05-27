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
                    >
                        <form-tab
                            :label="
                                $t(
                                    'expressweb.shipment.createShipment.senderAddressHeaderText'
                                )
                            "
                            error
                            icon="mdi-map-marker"
                        >
                        </form-tab>
                        <form-tab
                            :label="
                                $t(
                                    'expressweb.shipment.createShipment.receiverAddressHeaderText'
                                )
                            "
                            error
                            icon="mdi-map-marker"
                        >
                        </form-tab>
                        <form-tab
                            :label="
                                $t(
                                    'expressweb.shipment.createShipment.packageHeaderText'
                                )
                            "
                            error
                            icon="mdi-package-variant"
                        ></form-tab>
                        <form-tab
                            :label="
                                $t(
                                    'expressweb.shipment.createShipment.productHeaderText'
                                )
                            "
                            error
                            icon="mdi-sack"
                        ></form-tab>

                        <v-tab-item>
                            <validation-observer
                                ref="senderAddressForm"
                                v-slot="{}"
                            >
                                <sender-address-form
                                    :value="formData.senderAddress"
                                    @input="
                                        val => onUpdate('senderAddress', val)
                                    "
                                />
                            </validation-observer>
                        </v-tab-item>

                        <v-tab-item
                            ><validation-observer
                                ref="receiverAddressForm"
                                v-slot="{}"
                            >
                                <receiver-address-form
                                    :value="formData.receiverAddress"
                                    @input="
                                        val => onUpdate('receiverAddress', val)
                                    "
                                /> </validation-observer
                        ></v-tab-item>
                        <v-tab-item
                            ><validation-observer ref="packageForm" v-slot="{}">
                                <package-form
                                    :value="formData.pac"
                                    @input="val => onUpdate('pac', val)"
                                /> </validation-observer
                        ></v-tab-item>
                        <v-tab-item
                            ><validation-observer ref="productForm" v-slot="{}">
                                <product-form
                                    :value="formData.products"
                                    :weight-unit="formData.pac.weightUnit"
                                    @input="val => onUpdate('products', val)"
                                /> </validation-observer
                        ></v-tab-item>
                    </v-tabs>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="8">
            <v-btn color="primary" dark>创建运单</v-btn>
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
    @Ref('productForm') readonly productForm!: InstanceType<
        typeof ValidationObserver
    >;

    get tabStyle() {
        return (this as any).$breakpoint.isMobile
            ? {}
            : { 'justify-content': 'flex-start' };
    }

    formData = new ShipmentData();

    SENDER_ADDRESS_STEP = 0;
    RECEIVER_ADDRESS_STEP = 1;
    PACKAGE_STEP = 2;
    PRODUCT_STEP = 3;

    onUpdate(field, value) {
        this.formData[field] = value;
    }
}

export default CreateShipmentForm;
</script>

<style>
.my-tabs [role='tab'] {
    justify-content: flex-start;
}
</style>