<template>
    <validation-provider
        v-slot="{ errors }"
        rules="required|gt0"
        :style="{ width: '100%' }"
    >
        <v-text-field
            v-bind="$attrs"
            :value="value"
            :error-messages="errors[0]"
            :label="aliasLabel === '' ? label : aliasLabel"
            type="number"
            :suffix="weightUnitTranslation"
            @input="val => $emit('input', val)"
        />
    </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

import { $t } from '@/utils/NuxtOptions';

@Component({
    components: {
        ValidationProvider
    },
    inheritAttrs: false
})
class WeightInput extends Vue {
    @Prop({ required: true }) readonly value!: string;
    @Prop({ required: true, default: 'kg' }) readonly weightUnit!: string;
    @Prop({ type: String, default: '' }) readonly aliasLabel!: string;

    get label() {
        return $t('expressweb.package.weightLabel');
    }

    get weightUnitTranslation() {
        return $t('expressweb.package["' + this.weightUnit + '"]');
    }
}

export default WeightInput;
</script>

<style>
</style>