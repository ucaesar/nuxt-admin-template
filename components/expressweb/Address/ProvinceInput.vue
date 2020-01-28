<template>
    <div>
        <template v-if="asAutoComplete">
            <v-autocomplete
                ref="input"
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
                ref="input"
                :value="value"
                :label="$t('expressweb.address.provinceLabel')"
                :rules="[rules.fieldRequired]"
                @change="onUpdate"
            />
        </template>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'nuxt-property-decorator';

import { fieldRequired, VForm } from '@/utils/form';

import { IProvince } from '@/models/expressweb/zone';
import { provinces } from '@/conf/expressweb/provinces';

@Component
class ProvinceInput extends Vue {
    @Prop({ required: true }) readonly countryCode!: string | undefined;
    @Prop({ required: true }) readonly value!: string | undefined;

    @Ref('input') readonly input!: VForm;

    @Watch('countryCode')
    onChangeCountry() {
        this.$emit('input', '');
        this.input.resetValidation();
    }

    rules = { fieldRequired };

    get provinces() {
        if (this.asAutoComplete && typeof this.countryCode === 'string') {
            return provinces[this.countryCode];
        }
        return [];
    }

    get asAutoComplete() {
        switch (this.countryCode) {
            case 'CA':
            case 'US':
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