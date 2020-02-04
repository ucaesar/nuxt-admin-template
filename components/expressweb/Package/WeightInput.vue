<template>
    <v-text-field
        ref="input"
        v-bind="$attrs"
        :value="value"
        :label="$t('expressweb.package.weightLabel')"
        type="number"
        :suffix="weightUnitTranslation"
        :rules="[weightRules.fieldRequired, weightRules.weightType]"
        @input="val => $emit('input', val)"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';

import { fieldRequired, VForm } from '@/utils/form';
import * as validator from '@/utils/expressweb/validator/package';
import { $t } from '@/utils/NuxtOptions';

@Component({
    inheritAttrs: false
})
class WeightInput extends Vue {
    @Prop({ required: true }) readonly value!: string;
    @Prop({ required: true, default: 'kg' }) readonly weightUnit!: string;

    @Ref('input') readonly input: VForm;

    get weightUnitTranslation() {
        return $t('expressweb.package["' + this.weightUnit + '"]');
    }

    weightRules = {
        fieldRequired,
        weightType: val =>
            validator.weightType(val) ||
            $t('expressweb.package.error.weightType')
    };

    checkValid() {
        return this.input.validate();
    }

    resetValidation() {
        this.input.resetValidation();
    }
}

export default WeightInput;
</script>

<style>
</style>