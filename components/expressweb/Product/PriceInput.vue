<template>
    <validation-provider v-slot="{ errors }" rules="required|gt0">
        <v-text-field
            v-bind="$attrs"
            :value="value"
            :error-messages="errors[0]"
            :label="label"
            type="number"
            @input="val => $emit('input', val)"
        />
    </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

import { $t } from '@/utils/NuxtOptions';

@Component({
    components: {
        ValidationProvider
    }
})
class PriceInput extends Vue {
    @Prop({ required: true }) readonly value!: String;

    get label() {
        return $t('expressweb.product.pricePerUnitLabel');
    }
}

export default PriceInput;
</script>

<style>
</style>