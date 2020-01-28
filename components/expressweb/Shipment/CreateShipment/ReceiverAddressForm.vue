<template>
    <v-card elevation="0">
        <v-card-title
            >接收方地址
            <v-btn color="primary" class="ml-4"
                ><v-icon>mdi-plus</v-icon>从地址簿中选择</v-btn
            >
        </v-card-title>
        <v-card-text>
            <address-form ref="form" :value="address" @input="onUpdate" />
        </v-card-text>
        <v-card-actions>
            <v-btn text @click="onReset">重置</v-btn>
            <v-btn color="primary" @click="onNext">下一步</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';

import AddressForm from '@/components/expressweb/Address/AddressForm.vue';

import { Address } from '@/models/expressweb/Address';
import { VForm } from '@/utils/form';

@Component({
    components: {
        AddressForm
    }
})
class ReceiverAddressForm extends Vue {
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

    onNext() {
        if ((this.form as any).checkValid()) {
        }
    }
}

export default ReceiverAddressForm;
</script>

<style>
</style>