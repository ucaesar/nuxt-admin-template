<template>
    <validation-provider v-slot="{ errors }" rules="required">
        <v-textarea
            :value="value"
            :error-messages="errors[0]"
            v-bind="$attrs"
            :label="$t('expressweb.address.addressLabel')"
            auto-grow
            rows="1"
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
class AddressInput extends Vue {
    @Prop({ required: true }) readonly value!: string | undefined;

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default AddressInput;
</script>

<style>
</style>