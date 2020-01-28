<template>
    <v-text-field
        :value="value"
        :label="$t('expressweb.address.phoneLabel')"
        :rules="[rules.fieldRequired]"
        @change="onUpdate"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { fieldRequired } from '@/utils/form';

@Component
class PhoneInput extends Vue {
    @Prop({ type: String, required: true }) readonly value!: string;

    rules = { fieldRequired };

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default PhoneInput;
</script>

<style>
</style>