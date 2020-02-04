<template>
    <v-card elevation="0">
        <v-card-title
            ><v-avatar color="primary" size="36" class="mr-2">
                <span class="white--text headline">{{ step }}</span>
            </v-avatar>
            {{
                $t(
                    'expressweb.shipment.createShipment.receiverAddressHeaderText'
                )
            }}
            <v-btn color="primary" class="ml-4"
                ><v-icon>mdi-plus</v-icon
                >{{
                    $t(
                        'expressweb.shipment.createShipment.fromAddressBookButtonText'
                    )
                }}</v-btn
            >
        </v-card-title>

        <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
                <v-card-text>
                    <address-form
                        ref="form"
                        :value="address"
                        @input="onUpdate"
                    />
                </v-card-text>
            </v-col>
        </v-row>
        <v-card-actions>
            <v-btn text @click="onBack">{{
                $t('components.stepper.backButtonText')
            }}</v-btn>
            <v-btn text @click="onReset">{{
                $t('components.stepper.resetButtonText')
            }}</v-btn>
            <v-btn color="primary" @click="onNext">{{
                $t('components.stepper.nextButtonText')
            }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'nuxt-property-decorator';

import AddressForm from '@/components/expressweb/Address/AddressForm.vue';

import { Address } from '@/models/expressweb/Address';
import { VForm } from '@/utils/form';

@Component({
    components: {
        AddressForm
    }
})
class ReceiverAddressForm extends Vue {
    @Prop({ type: Number, required: true }) readonly step!: number;
    @Ref('form') readonly form: VForm;

    address = new Address();

    onUpdate(field, value) {
        this.address[field] = value;
    }

    getFormData() {
        return this.address;
    }

    checkValid() {
        return (this.form as any).checkValid();
    }

    onReset() {
        this.address = new Address();
        this.form.resetValidation();
    }

    onBack() {
        this.$emit('back', this.step - 1);
    }
    onNext() {
        if ((this.form as any).checkValid()) {
            this.$emit('next', {
                nextStep: this.step + 1,
                field: 'receiverAddress',
                value: this.address
            });
        }
    }
}

export default ReceiverAddressForm;
</script>

<style>
</style>