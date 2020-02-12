<template>
    <v-input :error-messages="errors[0]">
        <v-row>
            <v-col cols="12" md="3">
                <v-text-field
                    :value="value.weight"
                    :error="errors.length > 0"
                    v-bind="$attrs"
                    hide-details
                    :label="$t('expressweb.package.weightLabel')"
                    type="number"
                    :suffix="weightUnitTranslation"
                    @input="val => onUpdate('weight', val)"
                    @blur="onBlur"
                />
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field
                    :value="value.length"
                    :error="errors.length > 0"
                    v-bind="$attrs"
                    hide-details
                    :label="$t('expressweb.package.lengthLabel')"
                    type="number"
                    suffix="*"
                    @input="val => onUpdate('length', val)"
                    @blur="onBlur"
                />
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field
                    :value="value.width"
                    :error="errors.length > 0"
                    v-bind="$attrs"
                    hide-details
                    :label="$t('expressweb.package.widthLabel')"
                    type="number"
                    suffix="*"
                    @input="val => onUpdate('width', val)"
                    @blur="onBlur"
                />
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field
                    :value="value.height"
                    :error="errors.length > 0"
                    v-bind="$attrs"
                    hide-details
                    :label="$t('expressweb.package.heightLabel')"
                    type="number"
                    :suffix="dimensionUnitTranslation"
                    @input="val => onUpdate('height', val)"
                    @blur="onBlur"
                />
            </v-col>
        </v-row>
    </v-input>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import _ from 'lodash';

import { PackageItem } from '@/models/expressweb/Package';

import { $t } from '@/utils/NuxtOptions';

@Component
class PackageInput extends Vue {
    @Prop({ required: true }) readonly value!: PackageItem;
    @Prop({ required: true, default: 'cm' }) readonly dimensionUnit!: string;
    @Prop({ required: true, default: 'kg' }) readonly weightUnit!: string;
    @Prop({ type: Array, required: true }) readonly errors!: string[];

    get dimensionUnitTranslation() {
        return $t('expressweb.package["' + this.dimensionUnit + '"]');
    }

    get weightUnitTranslation() {
        return $t('expressweb.package["' + this.weightUnit + '"]');
    }

    onUpdate(field, value) {
        const item = _.cloneDeep(this.value);
        Object.assign(item, { [field]: value });
        this.$emit('input', item);
    }

    onBlur() {
        this.$emit('blur');
    }
}

export default PackageInput;
</script>

<style scoped>
div.col-md-3 {
    padding-bottom: 0px;
}
</style>