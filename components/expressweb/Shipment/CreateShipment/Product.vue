<template>
    <v-card class="elevation-0">
        <v-card-text class="px-md-12">
            <product-form
                :value="value"
                :weight-unit="weightUnit"
                @input="onUpdate"
            />
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

import ProductForm from '@/components/expressweb/Product/ProductForm.vue';

import { Product } from '@/models/expressweb/Product';

@Component({
    components: {
        ProductForm
    }
})
class ProductComponent extends Vue {
    @Prop({ type: Array, required: true }) readonly value;
    @Prop({ type: String, required: true }) readonly weightUnit!: String;

    // products = [new Product()];

    get mobileMode() {
        return this.$vuetify.breakpoint.smAndDown;
    }

    onUpdate(products) {
        // this.products = products;
        this.$emit('input', products);
    }
}

export default ProductComponent;
</script>

<style>
</style>