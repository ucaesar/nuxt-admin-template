<template>
    <v-row>
        <v-col cols="12">
            <v-alert
                dense
                text
                icon="mdi-alert-circle-outline"
                color="warning"
                border="left"
            >
                <div>{{ $t('expressweb.package.yourPackagingHint.text') }}</div>
                <div>
                    {{ $t('expressweb.package.yourPackagingHint.rules') }}
                </div>
            </v-alert>
        </v-col>
        <package-item-input
            v-for="(item, index) in value"
            ref="packages"
            :key="index"
            :value="item"
            :index="index"
            :total="value.length"
            :weight-unit="weightUnit"
            :dimension-unit="dimensionUnit"
            @delete="onDelete"
            @input="val => onUpdate(val, index)"
        />
        <v-col>
            <v-btn color="primary" outlined @click="onAdd">
                <v-icon>mdi-plus</v-icon
                >{{ $t('expressweb.package.newPackageButtonLabel') }}
            </v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import _ from 'lodash';

import PackageItemInput from './PackageItemInput.vue';

import { PackageItem } from '@/models/expressweb/Package';
import { VCustomInput } from '@/utils/form';

@Component({
    components: {
        PackageItemInput
    }
})
class PacakgeItemList extends Vue {
    @Prop({ type: Array, required: true }) readonly value: PackageItem[];
    @Prop({ required: true, default: 'cm' }) readonly dimensionUnit!: string;
    @Prop({ required: true, default: 'kg' }) readonly weightUnit!: string;

    @Ref('packages') readonly packages: VCustomInput[];

    onAdd() {
        const clonedValue = _.clone(this.value);
        clonedValue.push(new PackageItem());
        this.$emit('input', clonedValue);
    }

    onDelete(index) {
        const clonedValue = _.clone(this.value);
        clonedValue.splice(index, 1);
        this.$emit('input', clonedValue);
    }

    onUpdate(packageItem: PackageItem, index) {
        const clonedValue = _.clone(this.value);
        clonedValue.splice(index, 1, packageItem);
        this.$emit('input', clonedValue);
    }

    checkValid() {
        let r = false;
        this.packages.forEach(pac => {
            r = r && pac.checkValid();
        });
        return r;
    }
}

export default PacakgeItemList;
</script>

<style>
</style>