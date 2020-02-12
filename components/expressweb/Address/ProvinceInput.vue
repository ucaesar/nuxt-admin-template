<template>
    <validation-provider ref="input" v-slot="{ errors }" rules="required">
        <template v-if="asAutoComplete">
            <v-autocomplete
                :value="value"
                :error-messages="errors[0]"
                v-bind="$attrs"
                :label="$t('expressweb.address.provinceLabel')"
                :items="provinces"
                :item-value="provinceValue"
                :item-text="provinceText"
                @input="onUpdate"
            />
        </template>
        <template v-else>
            <v-text-field
                :value="value"
                :error-messages="errors[0]"
                v-bind="$attrs"
                :label="$t('expressweb.address.provinceLabel')"
                @input="onUpdate"
            />
        </template>
    </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

import { VForm } from '@/utils/form';

import { IProvince } from '@/models/expressweb/zone';
import { provinces } from '@/conf/expressweb/provinces';

@Component({
    components: {
        ValidationProvider
    }
})
class ProvinceInput extends Vue {
    @Prop({ required: true }) readonly countryCode!: string | undefined;
    @Prop({ required: true }) readonly value!: string | undefined;

    @Ref('input') readonly input!: InstanceType<typeof ValidationProvider>;
    @Watch('countryCode')
    onChangeCountry() {
        this.$emit('input', '');
        this.input.reset();
    }

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