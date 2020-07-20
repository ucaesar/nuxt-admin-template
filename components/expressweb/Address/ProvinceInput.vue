<template>
    <div>
        <validation-provider
            v-if="asComboBox"
            ref="input"
            v-slot="{ errors }"
            rules="required|address.provinceCode"
        >
            <v-combobox
                :value="comboBoxObject"
                :error-messages="errors[0]"
                v-bind="$attrs"
                :label="aliasLabel === '' ? label : aliasLabel"
                :items="provinces"
                :item-text="provinceText"
                @input="onUpdate"
            />
        </validation-provider>
        <validation-provider
            v-if="!asComboBox"
            ref="input"
            v-slot="{ errors }"
            rules="required"
        >
            <v-text-field
                :value="value"
                :error-messages="errors[0]"
                v-bind="$attrs"
                :label="aliasLabel === '' ? label : aliasLabel"
                @input="onUpdate"
        /></validation-provider>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

import { $t } from '@/utils/NuxtOptions';

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
    @Prop({ type: String, default: '' }) readonly aliasLabel!: string;

    @Ref('input') readonly input!: InstanceType<typeof ValidationProvider>;

    get label() {
        return $t('expressweb.address.provinceLabel');
    }

    get provinces() {
        if (this.asComboBox && typeof this.countryCode === 'string') {
            return provinces[this.countryCode];
        }
        return [];
    }

    get asComboBox() {
        switch (this.countryCode) {
            case 'CA':
            case 'US':
                return true;
        }
        return false;
    }

    get comboBoxObject() {
        if (this.value === null || this.value === undefined) return '';
        for (const province of this.provinces) {
            if (province.code === this.value) return province;
        }
        return this.value;
    }

    provinceValue(province: IProvince) {
        return province.code;
    }

    provinceText(province: IProvince) {
        return `${province.code} - ${province.name}`;
    }

    onUpdate(val) {
        if (val === null || val === undefined) this.$emit('input', '');
        else if (typeof val === 'string') this.$emit('input', val);
        else this.$emit('input', (val as IProvince).code);
    }
}

export default ProvinceInput;
</script>

<style>
</style>