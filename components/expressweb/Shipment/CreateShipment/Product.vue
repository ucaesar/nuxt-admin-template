<template>
    <ct-card
        header-color="primary"
        :header-title="
            $t('expressweb.shipment.createShipment.productHeaderText')
        "
        :header-full-width="false"
        :show-header="mobileMode"
    >
        <validation-observer ref="form" v-slot="{}">
            <v-card-text>
                <product-form
                    :value="products"
                    :weight-unit="weightUnit"
                    @input="onUpdate"
                />
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
    </ct-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import { ValidationObserver } from 'vee-validate';

import ProductForm from '@/components/expressweb/Product/ProductForm.vue';
import CtCard from '@/components/ImprovedUI/CtCard';

import { Product } from '@/models/expressweb/Product';

@Component({
    components: {
        ProductForm,
        CtCard,
        ValidationObserver
    }
})
class ProductComponent extends Vue {
    @Prop({ type: String, required: true }) readonly weightUnit!: String;

    @Ref('form') readonly form!: InstanceType<typeof ValidationObserver>;

    products = [new Product()];

    get mobileMode() {
        return this.$vuetify.breakpoint.smAndDown;
    }

    onUpdate(products) {
        this.products = products;
    }

    onBack() {
        this.$emit('back');
    }

    async onNext() {
        const valid = await this.form.validate();
        if (!valid) return;
        this.$emit('next', 'products', this.products);
    }
}

export default ProductComponent;
</script>

<style>
</style>