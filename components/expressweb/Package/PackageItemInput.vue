<template>
    <div class="d-flex">
        <v-col v-if="inlineChip" class="package-order">
            <v-chip :close="total > 1" @click:close="onDelete">{{
                $t('expressweb.package.orderLabel') + `${index + 1}`
            }}</v-chip>
        </v-col>
        <v-row>
            <v-col v-if="!inlineChip" cols="12">
                <v-chip :close="total > 1" @click:close="onDelete">{{
                    $t('expressweb.package.orderLabel') + `${index + 1}`
                }}</v-chip>
            </v-col>
            <v-col cols="12" md="3">
                <weight-input
                    ref="weightInput"
                    dense
                    outlined
                    :value="value.weight"
                    :weight-unit="weightUnit"
                    @input="val => onUpdate('weight', val)"
                />
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field
                    ref="lengthInput"
                    dense
                    outlined
                    :value="value.length"
                    :label="$t('expressweb.package.lengthLabel')"
                    type="number"
                    suffix="*"
                    :error-messages="dimensionErrorMessages"
                    :error="dimensionError"
                    :rules="[
                        dimensionRules.fieldRequired,
                        dimensionRules.dimensionType
                    ]"
                    @input="val => onUpdate('length', val)"
                />
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field
                    ref="widthInput"
                    dense
                    outlined
                    :value="value.width"
                    :label="$t('expressweb.package.widthLabel')"
                    type="number"
                    suffix="*"
                    :error="dimensionError"
                    :rules="[
                        dimensionRules.fieldRequired,
                        dimensionRules.dimensionType
                    ]"
                    @input="val => onUpdate('width', val)"
                />
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field
                    ref="heightInput"
                    dense
                    outlined
                    :value="value.height"
                    :label="$t('expressweb.package.heightLabel')"
                    type="number"
                    :suffix="dimensionUnitTranslation"
                    :error="dimensionError"
                    :rules="[
                        dimensionRules.fieldRequired,
                        dimensionRules.dimensionType
                    ]"
                    @input="val => onUpdate('height', val)"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'nuxt-property-decorator';
import _ from 'lodash';

import WeightInput from './WeightInput.vue';

import { PackageItem } from '@/models/expressweb/Package';

import { fieldRequired, VForm, VCustomInput } from '@/utils/form';
import * as validator from '@/utils/expressweb/validator/package';
import { $t } from '@/utils/NuxtOptions';

@Component({
    components: {
        WeightInput
    }
})
export default class PackageItemInput extends Vue {
    @Prop({ required: true }) readonly value!: PackageItem;
    @Prop({ required: true, default: 'cm' }) readonly dimensionUnit!: string;
    @Prop({ required: true, default: 'kg' }) readonly weightUnit!: string;
    @Prop({ type: Number, required: true }) readonly index!: number;
    @Prop({ type: Number, required: true }) readonly total!: number;

    @Ref('weightInput') readonly weightInput: VCustomInput;
    @Ref('lengthInput') readonly lengthInput: VForm;
    @Ref('widthInput') readonly widthInput: VForm;
    @Ref('heightInput') readonly heightInput: VForm;

    @Watch('value')
    onChangeValue(oldVal: PackageItem, newVal: PackageItem) {
        this.weightInput.checkValid();

        const lengthValid = this.lengthInput.validate();
        const widthValid = this.widthInput.validate();
        const heightValid = this.heightInput.validate();
        if (lengthValid && widthValid && heightValid) this.validateDimension();
    }

    dimensionRules = {
        fieldRequired,
        dimensionType: val =>
            validator.dimensionType(val) ||
            $t('expressweb.package.error.dimensionType')
    };

    dimensionErrorMessages: string[] = [];

    get limit() {
        return this.dimensionUnit === 'cm' ? 330 : 125;
    }

    get inlineChip() {
        const name = this.$vuetify.breakpoint.name;
        if (['xs', 'sm'].includes(name)) return false;
        return true;
    }

    get dimensionError() {
        return this.dimensionErrorMessages.length > 0;
    }

    get dimensionUnitTranslation() {
        return $t('expressweb.package["' + this.dimensionUnit + '"]');
    }

    onUpdate(field, value) {
        const item = _.cloneDeep(this.value);
        Object.assign(item, { [field]: value });
        this.$emit('input', item);
    }

    validateDimension() {
        if (!validator.dimensionSum(this.value, this.limit)) {
            this.dimensionErrorMessages = [
                this.$t('expressweb.package.error.dimensionSum') +
                    ` : ${this.value.dimensionSum()} ${this.dimensionUnit} > ${
                        this.limit
                    } ${this.dimensionUnit}`
            ];
            return false;
        }

        this.dimensionErrorMessages = [];
        return true;
    }

    onDelete() {
        this.$emit('delete', this.index);
    }

    checkValid() {
        const weightValid = this.weightInput.checkValid();
        const lengthValid = this.lengthInput.validate();
        const widthValid = this.widthInput.validate();
        const heightValid = this.heightInput.validate();

        if (weightValid && lengthValid && widthValid && heightValid) {
            return this.validateDimension();
        }

        return false;
    }
}
</script>

<style>
.package-order {
    flex: 0 0 180px;
}
</style>