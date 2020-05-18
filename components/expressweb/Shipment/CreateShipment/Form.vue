<template>
    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-card>
                <v-card-text>
                    <v-tabs :vertical="!$breakpoint.isMobile" show-arrows>
                        <v-tab>{{
                            $t(
                                'expressweb.shipment.createShipment.senderAddressHeaderText'
                            )
                        }}</v-tab>
                        <v-tab>{{
                            $t(
                                'expressweb.shipment.createShipment.receiverAddressHeaderText'
                            )
                        }}</v-tab>
                        <v-tab>{{
                            $t(
                                'expressweb.shipment.createShipment.packageHeaderText'
                            )
                        }}</v-tab>
                        <v-tab>{{
                            $t(
                                'expressweb.shipment.createShipment.productHeaderText'
                            )
                        }}</v-tab>

                        <v-tab-item>
                            <validation-observer
                                ref="senderAddressForm"
                                v-slot="{}"
                            >
                                <sender-address-form
                                    :value="senderAddress"
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
                                    :value="receiverAddress"
                                    @input="
                                        val => onUpdate('receiverAddress', val)
                                    "
                                /> </validation-observer
                        ></v-tab-item>
                        <v-tab-item
                            ><validation-observer ref="packageForm" v-slot="{}">
                                <package-form
                                    :value="pac"
                                    @input="val => onUpdate('pac', val)"
                                /> </validation-observer
                        ></v-tab-item>
                        <v-tab-item
                            ><validation-observer ref="productForm" v-slot="{}">
                                <product-form
                                    :value="products"
                                    :weight-unit="pac.weightUnit"
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

import SenderAddressForm from './SenderAddress.vue';
import ReceiverAddressForm from './ReceiverAddress.vue';
import PackageForm from './Package.vue';
import ProductForm from './Product.vue';

import { Address } from '@/models/expressweb/Address';
import { Package } from '@/models/expressweb/Package';
import { Product } from '@/models/expressweb/Product';

@Component({
    components: {
        SenderAddressForm,
        ReceiverAddressForm,
        PackageForm,
        ProductForm,
        ValidationObserver
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

    senderAddress = new Address();
    receiverAddress = new Address();
    pac = new Package();
    products = [new Product()];

    mounted() {
        this.senderAddress.country = 'CA';
    }

    onUpdate(field, value) {
        this[field] = value;
    }
}

export default CreateShipmentForm;
</script>