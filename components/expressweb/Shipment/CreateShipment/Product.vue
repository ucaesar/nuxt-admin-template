<template>
    <v-card flat>
        <v-card-text class="px-md-12">
            <product-form
                :disabled="disabled"
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
import { Vue, Component, Prop, Ref, Watch } from 'nuxt-property-decorator';

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
    @Prop({ required: false }) readonly failed!: boolean;
    @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

    @Watch('failed')
    failedChanged(val) {
        this.$emit('failed', val);
    }

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