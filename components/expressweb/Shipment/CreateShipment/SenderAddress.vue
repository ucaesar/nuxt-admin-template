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
    <v-card>
        <v-card-title>
            {{
                $t('expressweb.shipment.createShipment.senderAddressHeaderText')
            }}
            <v-btn text color="primary">
                <v-icon>mdi-plus</v-icon>
                {{
                    $t(
                        'expressweb.shipment.createShipment.fromAddressBookButtonText'
                    )
                }}
            </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
            <validation-observer ref="form" v-slot="{}">
                <address-form
                    ref="form"
                    :value="address"
                    sender
                    @input="onUpdate"
                />
            </validation-observer>
        </v-card-text>
        <v-card-actions>
            <v-btn disabled text color="primary" @click="onBack">{{
                $t('components.stepper.backButtonText')
            }}</v-btn>
            <v-btn color="primary" @click="onNext">{{
                $t('components.stepper.nextButtonText')
            }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop } from 'nuxt-property-decorator';
import { ValidationObserver } from 'vee-validate';

import AddressForm from '@/components/expressweb/Address/AddressForm.vue';

import { Address } from '@/models/expressweb/Address';

@Component({
    components: {
        AddressForm,
        ValidationObserver
    }
})
class SenderAddress extends Vue {
    @Ref('form') readonly form!: InstanceType<typeof ValidationObserver>;

    address = new Address();

    get mobileMode() {
        return this.$vuetify.breakpoint.smAndDown;
    }

    mounted() {
        this.address.country = 'CA';
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
        this.$emit('next', 'senderAddress', this.address);
    }
}

export default SenderAddress;
</script>

<style>
</style>