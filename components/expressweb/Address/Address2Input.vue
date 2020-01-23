<template>
    <v-textarea
        :value="value"
        :label="$t('expressweb.address.address2Label')"
        auto-grow
        rows="1"
        @change="onUpdate"
    />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
class Address2Input extends Vue {
    @Prop({ required: false }) readonly value!: string;

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default Address2Input;
</script>

<style>
</style>