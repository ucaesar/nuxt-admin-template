<template>
    <!-- <ct-card
        header-color="primary"
        :header-title="
            $t('expressweb.shipment.createShipment.senderAddressHeaderText')
        "
        :header-full-width="false"
        :show-header="mobileMode"
    > 
    </ct-card> -->

    <v-card flat>
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
            <address-form :value="value" sender @input="onUpdate" />
        </v-card-text>
        <!-- <v-card-actions>
            <v-btn disabled text color="primary" @click="onBack">{{
                $t('components.stepper.backButtonText')
            }}</v-btn>
            <v-btn color="primary" @click="onNext">{{
                $t('components.stepper.nextButtonText')
            }}</v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from 'nuxt-property-decorator';
import _ from 'lodash';

import AddressForm from '@/components/expressweb/Address/AddressForm.vue';

import { Address } from '@/models/expressweb/Address';

@Component({
    components: {
        AddressForm
    }
})
class SenderAddress extends Vue {
    @Prop({ type: Object, required: true }) readonly value!: Address;
    @Prop({ required: false }) readonly failed!: boolean;

    @Watch('failed')
    failedChanged(val) {
        this.$emit('failed', val);
    }

    onUpdate(field, value) {
        this.$emit(
            'input',
            _.assign(new Address(), this.value, { [field]: value })
        );
    }
}

export default SenderAddress;
</script>

<style>
</style>