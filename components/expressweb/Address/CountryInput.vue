<template>
    <v-autocomplete
        :disabled="sender"
        :value="value"
        :label="$t('expressweb.address.countryLabel')"
        :items="countries"
        :item-value="countryValue"
        :item-text="countryText"
        :rules="[rules.fieldRequired, rules.onlyCanada]"
        :hint="$props.sender ? $t('expressweb.address.sendCountryHint') : ''"
        persistent-hint
        @change="onUpdate"
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
    @Prop({ type: Boolean, default: true }) readonly sender!: boolean;

    rules = {
        fieldRequired,
        onlyCanada: val => {
            if (this.sender && this.value === 'CA') return true;
            return $t('expressweb.address.sendCountryHint');
        }
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