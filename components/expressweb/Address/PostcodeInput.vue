<template>
    <v-text-field
        :value="value"
        :label="$t('expressweb.address.postcodeLabel')"
        :rules="[rules.fieldRequired]"
        @input="onUpdate"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { fieldRequired } from '@/utils/form';

@Component
class PostcodeInput extends Vue {
    @Prop({ required: true }) readonly value!: string | undefined;

    rules = { fieldRequired };

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default PostcodeInput;
</script>

<style>
</style>