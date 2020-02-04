<template>
    <v-autocomplete
        :disabled="sender"
        :value="value"
        :label="$t('expressweb.address.countryLabel')"
        :items="countries"
        :item-value="countryValue"
        :item-text="countryText"
        :rules="[rules.fieldRequired]"
        :hint="$props.sender ? $t('expressweb.address.sendCountryHint') : ''"
        persistent-hint
        @input="onUpdate"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { fieldRequired } from '@/utils/form';
import { $t } from '@/utils/NuxtOptions';

import { ICountry } from '@/models/expressweb/zone';
import { countries } from '@/conf/expressweb/countries';

@Component
class CountryInput extends Vue {
    @Prop({ required: true }) readonly value!: string | undefined;
    @Prop({ type: Boolean, default: false }) readonly sender!: boolean;

    rules = {
        fieldRequired
    };
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