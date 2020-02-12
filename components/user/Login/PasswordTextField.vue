<template>
    <validation-provider v-slot="{ errors }" vid="password" rules="required">
        <v-text-field
            :value="value"
            :error-messages="errors[0]"
            v-bind="$attrs"
            :label="$t('login.passwordLabel')"
            prepend-icon="mdi-lock"
            type="password"
            autocomplete="new-password"
            @input="val => $emit('input', val)"
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
class PasswordTextField extends Vue {
    @Prop({ required: true }) readonly value!: string;
}

export default PasswordTextField;
</script>

<style>
</style>