<template>
    <validation-provider v-slot="{ errors }" rules="required">
        <v-autocomplete
            :disabled="sender"
            :value="value"
            :error-messages="errors[0]"
            v-bind="$attrs"
            :label="$t('expressweb.address.countryLabel')"
            :items="countries"
            :item-value="countryValue"
            :item-text="countryText"
            :hint="
                $props.sender ? $t('expressweb.address.sendCountryHint') : ''
            "
            persistent-hint
            @input="onUpdate"
        />
    </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

import { $t } from '@/utils/NuxtOptions';

import { ICountry } from '@/models/expressweb/zone';
import { countries } from '@/conf/expressweb/countries';

@Component({
    components: {
        ValidationProvider
    }
})
class CountryInput extends Vue {
    @Prop({ required: true }) readonly value!: string | undefined;
    @Prop({ type: Boolean, default: false }) readonly sender!: boolean;

    countries = countries;

    countryValue(country: ICountry) {
        return country.code;
    }

    countryText(country: ICountry) {
        return `${country.code} - ${country.name}`;
    }

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default CountryInput;
</script>

<style>
</style>