<template>
    <v-card class="elevation-0">
        <v-card-text class="px-md-12">
            <package-form :value="value" @input="onUpdate" />
        </v-card-text>

        <!-- <v-card-actions>
            <v-btn text color="primary" @click="onBack">{{
                $t('components.stepper.backButtonText')
            }}</v-btn>
            <v-btn color="primary" @click="onNext">{{
                $t('components.stepper.nextButtonText')
            }}</v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import _ from 'lodash';

import PackageForm from '@/components/expressweb/Package/PackageForm.vue';
import { PACKAGE_TYPE } from '@/components/expressweb/Package/const';

import { Package, PackageItem } from '@/models/expressweb/Package';

@Component({
    components: {
        PackageForm
    }
})
class PackageComponent extends Vue {
    @Prop({ type: Object, required: true }) readonly value!: Package;

    get mobileMode() {
        return this.$vuetify.breakpoint.smAndDown;
    }

    /* onUpdate(field, value) {
        this.pac[field] = value;

        if (field === 'packageType') {
            if (value === PACKAGE_TYPE.YOUR_PACKAGING) {
                this.pac.packages = [new PackageItem()];
                this.pac.weight = undefined;
            } else {
                this.pac.packages = undefined;
            }
        }
    } */
    onUpdate(field, value) {
        const pac = _.assign(new Package(), this.value, { [field]: value });
        if (field === 'packageType') {
            if (value === PACKAGE_TYPE.YOUR_PACKAGING) {
                pac.packages = [new PackageItem()];
                pac.weight = undefined;
            } else {
                pac.packages = undefined;
            }
        }
        this.$emit('input', pac);
    }
}

export default PackageComponent;
</script>

<style>
</style>