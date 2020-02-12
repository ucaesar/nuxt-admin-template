<template>
    <ct-card
        header-color="primary"
        :header-title="
            $t('expressweb.shipment.createShipment.receiverAddressHeaderText')
        "
        :header-full-width="false"
        :show-header="mobileMode"
    >
        <v-card-text>
            <v-btn text color="primary">
                <v-icon>mdi-plus</v-icon>
                {{
                    $t(
                        'expressweb.shipment.createShipment.fromAddressBookButtonText'
                    )
                }}
            </v-btn>
            <validation-observer ref="form" v-slot="{}">
                <address-form ref="form" :value="address" @input="onUpdate" />
            </validation-observer>
        </v-card-text>
        <v-card-actions>
            <v-btn text color="primary" @click="onBack">{{
                $t('components.stepper.backButtonText')
            }}</v-btn>
            <v-btn color="primary" @click="onNext">{{
                $t('components.stepper.nextButtonText')
            }}</v-btn>
        </v-card-actions>
    </ct-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'nuxt-property-decorator';
import { ValidationObserver } from 'vee-validate';

import AddressForm from '@/components/expressweb/Address/AddressForm.vue';
import CtCard from '@/components/ImprovedUI/CtCard';

import { Address } from '@/models/expressweb/Address';

@Component({
    components: {
        AddressForm,
        CtCard,
        ValidationObserver
    }
})
class ReceiverAddressForm extends Vue {
    @Ref('form') readonly form!: InstanceType<typeof ValidationObserver>;

    address = new Address();

    get mobileMode() {
        return this.$vuetify.breakpoint.smAndDown;
    }

    onUpdate(field, value) {
        this.address[field] = value;
    }

    getFormData() {
        return this.address;
    }

    onBack() {
        this.$emit('back');
    }

    async onNext() {
        const valid = await this.form.validate();
        if (!valid) return;
        this.$emit('next');
    }
}

export default ReceiverAddressForm;
</script>

<style>
</style>