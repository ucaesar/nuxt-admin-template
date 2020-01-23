<template>
    <div>
        <template v-if="asAutoComplete">
            <v-autocomplete
                :value="value"
                :label="$t('expressweb.address.provinceLabel')"
                :items="provinces"
                :item-value="provinceValue"
                :item-text="provinceText"
                :rules="[rules.fieldRequired]"
                @change="onUpdate"
            />
        </template>
        <template v-else>
            <v-text-field
                :value="value"
                :label="$t('expressweb.address.provinceLabel')"
                :rules="[rules.fieldRequired]"
                @change="onUpdate"
            />
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { fieldRequired } from '@/utils/form';

import { IProvince } from '@/models/expressweb/zone';
import { provinces } from '@/conf/expressweb/provinces';

@Component
class ProvinceInput extends Vue {
    @Prop({ required: true }) readonly countryCode!: string;
    @Prop({ required: false }) readonly value!: string;

    rules = { fieldRequired };

    get provinces() {
        const code = this.countryCode.toLowerCase();
        switch (code) {
            case 'ca':
            case 'us':
                return provinces[code];
        }
        return [];
    }

    get asAutoComplete() {
        const code = this.countryCode.toLowerCase();

        switch (code) {
            case 'ca':
            case 'us':
                return true;
        }

        return false;
    }

    provinceValue(province: IProvince) {
        return province.code;
    }

    provinceText(province: IProvince) {
        return `${province.code} - ${province.name}`;
    }

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default ProvinceInput;
</script>

<style>
</style>