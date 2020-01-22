<template>
    <v-autocomplete
        :disabled="sender"
        :value="value"
        :label="$t('expressweb.zone.countryLabel')"
        :items="countries"
        :item-value="countryValue"
        :item-text="countryText"
        :rules="[rules.fieldRequired]"
        :hint="$props.sender ? $t('expressweb.zone.sendCountryHint') : ''"
        persistent-hint
    />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { fieldRequired } from '@/utils/form';

import { ICountry } from '@/models/expressweb/zone';
import { countries } from '@/conf/expressweb/countries';

@Component
class CountryInput extends Vue {
    @Prop() readonly value!: string;
    @Prop({ type: Boolean, default: true }) readonly sender!: boolean;

    rules = { fieldRequired };
    countries = countries;

    countryValue(country: ICountry) {
        return country.code;
    }

    countryText(country: ICountry) {
        return `${country.code} - ${country.name}`;
    }
}

export default CountryInput;
</script>

<style>
</style>