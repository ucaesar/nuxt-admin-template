<template>
    <v-text-field
        :value="value"
        :label="$t('expressweb.address.cityLabel')"
        :rules="[rules.fieldRequired]"
        @change="onUpdate"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { fieldRequired } from '@/utils/form';

@Component
class CityInput extends Vue {
    @Prop({ required: false }) readonly value!: string;

    rules = { fieldRequired };

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default CityInput;
</script>

<style>
</style>