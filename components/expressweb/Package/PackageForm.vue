<template>
    <v-form :disabled="disabled">
        <v-row>
            <v-col cols="12" md="6" class="py-0">
                <weight-unit-input
                    v-bind="$attrs"
                    :value="value.weightUnit"
                    @input="val => onUpdate('weightUnit', val)"
                />
            </v-col>
            <v-col cols="12" md="6" class="py-0">
                <dimension-unit-input
                    v-bind="$attrs"
                    :value="value.dimensionUnit"
                    @input="val => onUpdate('dimensionUnit', val)"
                />
            </v-col>
            <v-col cols="12" md="6">
                <package-type-select
                    v-bind="$attrs"
                    :value="value.packageType"
                    @input="val => onUpdate('packageType', val)"
                />
            </v-col>
            <v-col v-if="value.packages === undefined" cols="12" md="6">
                <weight-input
                    v-bind="$attrs"
                    :value="value.weight"
                    :weight-unit="value.weightUnit"
                    @input="val => onUpdate('weight', val)"
                />
            </v-col>
            <v-col v-if="value.packages !== undefined" cols="12">
                <package-list
                    :disabled="disabled"
                    v-bind="$attrs"
                    :value="value.packages"
                    :dimension-unit="value.dimensionUnit"
                    :weight-unit="value.weightUnit"
                    @input="val => onUpdate('packages', val)"
            /></v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import WeightUnitInput from './WeightUnitInput.vue';
import DimensionUnitInput from './DimensionUnitInput.vue';
import UnitInput from './UnitInput.vue';
import PackageList from './PackageList.vue';
import WeightInput from './WeightInput.vue';
import PackageTypeSelect from './PackageTypeSelect.vue';
import { PACKAGE_TYPE } from './const';

import { Package, PackageItem } from '@/models/expressweb/Package';
import { VForm } from '@/utils/form';

@Component({
    components: {
        PackageList,
        WeightUnitInput,
        DimensionUnitInput,
        UnitInput,
        WeightInput,
        PackageTypeSelect
    }
})
class PackageForm extends Vue {
    @Prop({ type: Object, required: true }) readonly value!: Package;
    @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

    onUpdate(field, value) {
        this.$emit('input', field, value);
    }

    onChangePackageType(val) {
        this.value.packageType = val;
        if (val === PACKAGE_TYPE.YOUR_PACKAGING) {
            this.value.packages = [new PackageItem()];
            this.value.weight = undefined;
        } else {
            this.value.packages = undefined;
        }
    }
}

export default PackageForm;
</script>

<style>
</style>