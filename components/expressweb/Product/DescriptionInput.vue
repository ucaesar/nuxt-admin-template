<template>
    <validation-provider v-slot="{ errors }" rules="required">
        <v-text-field
            v-bind="$attrs"
            :value="value"
            :error-messages="errors[0]"
            :label="label"
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
class DescriptionInput extends Vue {
    @Prop({ required: true }) readonly value!: String;

    get label() {
        return $t('expressweb.product.descriptionLabel');
    }
}

export default DescriptionInput;
</script>

<style>
</style>