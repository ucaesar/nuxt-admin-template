<template>
    <v-form>
        <v-row v-for="(item, index) in value" :key="index">
            <v-col cols="12">
                <v-chip :close="value.length > 1" small @click:close="onDelete">
                    {{ $t('expressweb.product.orderLabel') + `${index + 1}` }}
                </v-chip>
            </v-col>
            <v-col cols="12" md="4">
                <description-input
                    :value="item.description"
                    @input="value => onUpdate('description', value, index)"
                />
            </v-col>
            <v-col cols="12" md="4">
                <country-input
                    :value="item.origin"
                    :alias-label="$t('expressweb.product.originLabel')"
                    @input="value => onUpdate('origin', value, index)"
                />
            </v-col>
            <v-col cols="12" md="4">
                <weight-input
                    :value="item.weight"
                    :weight-unit="weightUnit"
                    @input="value => onUpdate('weight', value, index)"
                />
            </v-col>
            <v-col cols="12" md="4">
                <quantity-input
                    :value="item.quantity"
                    @input="value => onUpdate('quantity', value, index)"
                />
            </v-col>
            <v-col cols="12" md="4">
                <unit-input
                    :value="item.unit"
                    @input="value => onUpdate('unit', value, index)"
                />
            </v-col>
            <v-col cols="12" md="4">
                <price-input
                    :value="item.pricePerUnit"
                    @input="value => onUpdate('pricePerUnit', value, index)"
                />
            </v-col>
        </v-row>
        <v-btn color="primary" outlined @click="onAdd">
            <v-icon>mdi-plus</v-icon
            >{{ $t('expressweb.product.newProductButtonLabel') }}
        </v-btn>
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import _ from 'lodash';

import DescriptionInput from './DescriptionInput.vue';
import QuantityInput from './QuantityInput.vue';
import UnitInput from './UnitInput.vue';
import PriceInput from './PriceInput.vue';

import CountryInput from '@/components/expressweb/Address/CountryInput.vue';
import WeightInput from '@/components/expressweb/Package/WeightInput.vue';

import { Product } from '@/models/expressweb/Product';

@Component({
    components: {
        DescriptionInput,
        CountryInput,
        WeightInput,
        QuantityInput,
        UnitInput,
        PriceInput
    }
})
class ProductForm extends Vue {
    @Prop({ type: Array, required: true }) value: Product[];
    @Prop({ type: String, required: true }) readonly weightUnit!: String;

    onUpdate(field, value, index) {
        const newProduct = _.cloneDeep(this.value[index]);
        Object.assign(newProduct, { [field]: value });
        const clonedValue = _.clone(this.value);
        clonedValue.splice(index, 1, newProduct);
        this.$emit('input', clonedValue);
    }

    onAdd() {
        const clonedValue = _.clone(this.value);
        clonedValue.push(new Product());
        this.$emit('input', clonedValue);
    }

    onDelete(index) {
        const clonedValue = _.clone(this.value);
        clonedValue.splice(index, 1);
        this.$emit('input', clonedValue);
    }
}

export default ProductForm;
</script>

<style>
</style>