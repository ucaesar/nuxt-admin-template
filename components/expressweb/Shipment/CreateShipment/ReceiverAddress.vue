<template>
    <!-- <ct-card
        header-color="primary"
        :header-title="
            $t('expressweb.shipment.createShipment.receiverAddressHeaderText')
        "
        :header-full-width="false"
        :show-header="mobileMode"
    > -->
    <v-card flat>
        <v-card-title v-if="!disabled">
            <v-btn text color="primary">
                <v-icon>mdi-plus</v-icon>
                {{
                    $t(
                        'expressweb.shipment.completeForm.fromAddressBookButtonText'
                    )
                }}
            </v-btn>
        </v-card-title>
        <v-card-text class="px-md-12">
            <address-form
                ref="form"
                :disabled="disabled"
                :value="value"
                @input="onUpdate"
            />
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
import { Vue, Component, Ref, Prop, Watch } from 'nuxt-property-decorator';

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
    @Prop({ required: false }) readonly failed!: boolean;
    @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

    @Watch('failed')
    failedChanged(val) {
        this.$emit('failed', val);
    }

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