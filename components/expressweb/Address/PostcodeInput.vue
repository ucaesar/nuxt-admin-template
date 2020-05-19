<template>
    <validation-provider v-slot="{ errors }" rules="required">
        <v-text-field
            :value="value"
            :error-messages="errors[0]"
            v-bind="$attrs"
            :label="aliasLabel === '' ? label : aliasLabel"
            @input="onUpdate"
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
class PostcodeInput extends Vue {
    @Prop({ required: true }) readonly value!: string | undefined;
    @Prop({ type: String, default: '' }) readonly aliasLabel!: string;

    get label() {
        return $t('expressweb.address.postcodeLabel');
    }

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default PostcodeInput;
</script>

<style>
</style>