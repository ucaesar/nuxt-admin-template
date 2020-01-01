<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-btn icon><v-icon>mdi-account</v-icon></v-btn>
                        <v-toolbar-title>
                            {{ $t('register.toolbarText') }}
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="registerForm" v-model="valid"></v-form>
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn
                            color="primary"
                            class="mb-1"
                            :loading="loading"
                            @click="onSubmit"
                            >{{ $t('register.submitButtonText') }}</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';

import { VForm, fieldRequired } from '@/utils/form';
import * as validator from '@/utils/validator/register';

class RegisterForm {
    username: '';
    password: '';
    password2: '';
    email: '';
}

@Component
class Register extends Vue {
    @Ref('registerForm') readonly form!: VForm;

    registerForm = new RegisterForm();

    valid = true;
    loading = false;

    rules = {
        fieldRequired,
        isEmail: value =>
            validator.isEmail(value) ||
            this.$t('register.error.incorrecteEailFormatt'),
        usernameType: value =>
            validator.usernameType(value) ||
            this.$t('register.error.usernameType'),
        usernameLength: value =>
            validator.usernameLength(value) ||
            this.$t('register.error.usernameLength'),
        passwordType: value =>
            validator.passwordType(value) ||
            this.$t('register.error.passwordType'),
        passwordLength: value =>
            validator.passwordLength(value) ||
            this.$t('register.error.passwordLength')
    };

    onSubmit() {}
}

export default Register;
</script>

<style>
</style>