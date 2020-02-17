<template>
    <v-card>
        <v-card-title>
            {{
                $t('expressweb.shipment.createShipment.packageHeaderText')
            }}
        </v-card-title>
        <v-divider />
        <validation-observer ref="form" v-slot="{}">
            <v-card-text>
                <package-form :value="pac" @input="onUpdate" />
            </v-card-text>
        </validation-observer>

        <v-card-actions>
            <v-btn text color="primary" @click="onBack">{{
                $t('components.stepper.backButtonText')
            }}</v-btn>
            <v-btn color="primary" @click="onNext">{{
                $t('components.stepper.nextButtonText')
            }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import { ValidationObserver } from 'vee-validate';

import PackageForm from '@/components/expressweb/Package/PackageForm.vue';
import { PACKAGE_TYPE } from '@/components/expressweb/Package/const';

import { Package, PackageItem } from '@/models/expressweb/Package';

@Component({
    components: {
        PackageForm,
        ValidationObserver
    }
})
class PackageComponent extends Vue {
    @Ref('form') readonly form!: InstanceType<typeof ValidationObserver>;

    pac = new Package();

    get mobileMode() {
        return this.$vuetify.breakpoint.smAndDown;
    }

    onUpdate(field, value) {
        this.pac[field] = value;

        if (field === 'packageType') {
            if (value === PACKAGE_TYPE.YOUR_PACKAGING) {
                this.pac.packages = [new PackageItem()];
                this.pac.weight = undefined;
            } else {
                this.pac.packages = undefined;
            }
        }
    }

    onBack() {
        this.$emit('back');
    }

    async onNext() {
        const valid = await this.form.validate();
        if (!valid) return;
        this.$emit('next', 'pac', this.pac);
    }
}

export default PackageComponent;
</script>

<style>
</style>