<template>
    <!-- <ct-card
        header-color="primary"
        :header-title="
            $t('expressweb.shipment.createShipment.receiverAddressHeaderText')
        "
        :header-full-width="false"
        :show-header="mobileMode"
    > -->
    <v-card class="elevation-0">
        <v-card-title>
            <v-btn text color="primary">
                <v-icon>mdi-plus</v-icon>
                {{
                    $t(
                        'expressweb.shipment.createShipment.fromAddressBookButtonText'
                    )
                }}
            </v-btn>
        </v-card-title>
        <v-card-text class="px-md-12">
            <address-form ref="form" :value="value" @input="onUpdate" />
        </v-card-text>
        <!-- <v-card-actions>
            <v-btn text color="primary" @click="onBack">{{
                $t('components.stepper.backButtonText')
            }}</v-btn>
            <v-btn color="primary" @click="onNext">{{
                $t('components.stepper.nextButtonText')
            }}</v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'nuxt-property-decorator';

import _ from 'lodash';

import AddressForm from '@/components/expressweb/Address/AddressForm.vue';

import { Address } from '@/models/expressweb/Address';

@Component({
    components: {
        AddressForm
    }
})
class ReceiverAddressForm extends Vue {
    @Prop({ type: Object, required: true }) readonly value!: Address;

    get mobileMode() {
        return this.$vuetify.breakpoint.smAndDown;
    }

    onUpdate(field, value) {
        this.$emit(
            'input',
            _.assign(new Address(), this.value, { [field]: value })
        );
    }
}

export default ReceiverAddressForm;
</script>

<style>
</style>