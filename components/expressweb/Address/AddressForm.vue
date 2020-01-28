<template>
    <v-form ref="form">
        <v-row>
            <v-col :cols="layout.name">
                <name-input
                    :value="value.name"
                    @input="val => onUpdate('name', val)"
                />
            </v-col>
            <v-col :cols="layout.phone">
                <phone-input
                    :value="value.phone"
                    @input="val => onUpdate('phone', val)"
                />
            </v-col>
            <v-col :cols="layout.country">
                <country-input
                    :value="value.country"
                    :sender="sender"
                    @input="val => onUpdate('country', val)"
                />
            </v-col>
            <v-col :cols="layout.province">
                <province-input
                    :value="value.province"
                    :country-code="value.country"
                    @input="val => onUpdate('province', val)"
                />
            </v-col>
            <v-col :cols="layout.city">
                <city-input
                    :value="value.city"
                    @input="val => onUpdate('city', val)"
                />
            </v-col>
            <v-col :cols="layout.postcode">
                <postcode-input
                    :value="value.postcode"
                    @input="val => onUpdate('postcode', val)"
                />
            </v-col>
            <v-col :cols="layout.address">
                <address-input
                    :value="value.address"
                    @input="val => onUpdate('address', val)"
                />
            </v-col>
            <v-col :cols="layout.address2">
                <address2-input
                    :value="value.address2"
                    @input="val => onUpdate('address2', val)"
                />
            </v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';

import NameInput from './NameInput.vue';
import PhoneInput from './PhoneInput.vue';
import CountryInput from './CountryInput.vue';
import ProvinceInput from './ProvinceInput.vue';
import CityInput from './CityInput.vue';
import PostcodeInput from './PostcodeInput.vue';
import AddressInput from './AddressInput.vue';
import Address2Input from './Address2Input.vue';

import { Address } from '@/models/expressweb/Address';
import { VForm } from '@/utils/form';

@Component({
    components: {
        NameInput,
        PhoneInput,
        CountryInput,
        ProvinceInput,
        CityInput,
        PostcodeInput,
        AddressInput,
        Address2Input
    }
})
class AddressForm extends Vue {
    @Prop({ type: Object, required: true }) readonly value!: Address;
    @Prop({ type: Boolean, default: true }) readonly sender!: boolean;
    @Prop({
        type: Object,
        default() {
            return {
                name: 6,
                phone: 6,
                country: 6,
                province: 6,
                city: 6,
                postcode: 6,
                address: 12,
                address2: 12
            };
        }
    })
    readonly layout!: any;

    @Ref('form') readonly form!: VForm;

    onUpdate(field, value) {
        this.$emit('input', field, value);
    }

    checkValid() {
        return this.form.validate();
    }

    reset() {
        this.form.reset();
    }

    resetValidation() {
        this.form.resetValidation();
    }
}

export default AddressForm;

/* export default {
    components: {
        NameInput,
        PhoneInput,
        CountryInput,
        ProvinceInput,
        CityInput,
        PostcodeInput,
        AddressInput,
        Address2Input
    },
    props: {
        value: {
            type: Object,
            required: true
        },
        sender: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        onUpdate(field, value) {
            if (field === 'country') {
                this.$emit('input', 'province', '');
                this.$refs.province.reset();
            }
        },

        validate() {
            this.$refs.form.validate();
        }
    }
}; */
</script>

<style>
</style>