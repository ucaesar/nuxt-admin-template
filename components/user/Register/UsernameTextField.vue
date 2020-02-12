<template>
    <validation-provider
        v-slot="{ errors }"
        vid="username"
        rules="required|register.usernameType|register.usernameLength"
    >
        <v-text-field
            :value="value"
            :error-messages="errors[0]"
            v-bind="$attrs"
            :label="$t('register.usernameLabel')"
            prepend-icon="mdi-account"
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
class UsernameTextField extends Vue {
    @Prop({ required: true }) readonly value!: string;
}

export default UsernameTextField;
</script>

<style>
</style>