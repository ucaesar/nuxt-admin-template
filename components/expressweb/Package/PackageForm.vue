<template>
    <v-form ref="form">
        <v-row>
            <v-col cols="12">
                <unit-input
                    :weight-unit="pac.weightUnit"
                    :dimension-unit="pac.dimensionUnit"
                    @input="
                        val => {
                            pac.weightUnit = val.weightUnit;
                            pac.dimensionUnit = val.dimensionUnit;
                        }
                    "
                />
            </v-col>
            <v-col cols="12" md="6">
                <package-type-select
                    :value="pac.packageType"
                    @input="onChangePackageType"
                />
            </v-col>
            <v-col v-if="pac.packages === undefined" cols="12" md="6">
                <weight-input
                    ref="weightInput"
                    v-model="pac.weight"
                    :weight-unit="pac.weightUnit"
                />
            </v-col>
            <v-col v-if="pac.packages !== undefined" cols="12">
                <package-item-list
                    v-model="pac.packages"
                    :dimension-unit="pac.dimensionUnit"
                    :weight-unit="pac.weightUnit"
            /></v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'nuxt-property-decorator';

import UnitInput from './UnitInput.vue';
import PackageItemList from './PackageItemList.vue';
import WeightInput from './WeightInput.vue';
import PackageTypeSelect from './PackageTypeSelect.vue';
import { PACKAGE_TYPE } from './const';

import { Package, PackageItem } from '@/models/expressweb/Package';
import { VForm } from '@/utils/form';

@Component({
    components: {
        PackageItemList,
        UnitInput,
        WeightInput,
        PackageTypeSelect
    }
})
class PackageForm extends Vue {
    @Ref('weightInput') readonly weightInput: VForm;

    pac = new Package();

    onChangePackageType(val) {
        this.pac.packageType = val;
        if (val === PACKAGE_TYPE.YOUR_PACKAGING) {
            this.pac.packages = [new PackageItem()];
            this.pac.weight = undefined;
            this.weightInput.resetValidation();
        } else {
            this.pac.packages = undefined;
        }
    }

    checkValid() {
        
    }
}

export default PackageForm;
</script>

<style>
</style>