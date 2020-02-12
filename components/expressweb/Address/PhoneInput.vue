<template>
    <validation-provider v-slot="{ errors }" rules="required">
        <v-text-field
            :value="value"
            :error-messages="errors[0]"
            v-bind="$attrs"
            :label="$t('expressweb.address.phoneLabel')"
            @input="onUpdate"
        />
    </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

@Component({
    components: {
        ValidationProvider
    }
})
class PhoneInput extends Vue {
    @Prop({ required: true }) readonly value!: string | undefined;

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default PhoneInput;
</script>

<style>
</style>