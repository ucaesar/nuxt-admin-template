<template>
    <v-textarea
        :value="value"
        :label="$t('expressweb.address.addressLabel')"
        :rules="[rules.fieldRequired]"
        auto-grow
        rows="1"
        @input="onUpdate"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { fieldRequired } from '@/utils/form';

@Component
class AddressInput extends Vue {
    @Prop({ required: true }) readonly value!: string | undefined;
    rules = { fieldRequired };

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default AddressInput;
</script>

<style>
</style>