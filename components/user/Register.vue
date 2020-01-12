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
                        <v-form ref="registerForm" v-model="valid">
                            <v-text-field
                                v-model="registerForm.email"
                                :rules="[rules.fieldRequired, rules.isEmail]"
                                :label="$t('register.emailLabel')"
                                prepend-icon="mdi-email"
                                :error="error.email.state"
                                :error-count="error.email.errorCount"
                                :error-messages="error.email.errorMessages"
                                @input="inputEmail"
                            ></v-text-field>
                            <v-text-field
                                v-model="registerForm.username"
                                :rules="[
                                    rules.fieldRequired,
                                    rules.usernameType,
                                    rules.usernameLength
                                ]"
                                :label="$t('register.usernameLabel')"
                                prepend-icon="mdi-account"
                                :error="error.username.state"
                                :error-count="error.username.errorCount"
                                :error-messages="error.username.errorMessages"
                                @input="inputUsername"
                            ></v-text-field>
                            <v-text-field
                                ref="password"
                                v-model="registerForm.password"
                                :rules="[
                                    rules.fieldRequired,
                                    rules.passwordType,
                                    rules.passwordLength
                                ]"
                                :label="$t('register.passwordLabel')"
                                prepend-icon="mdi-lock"
                                :error="error.password.state"
                                :error-count="error.password.errorCount"
                                :error-messages="error.password.errorMessages"
                                type="password"
                                autocomplete="new-password"
                                @input="inputPassword"
                            ></v-text-field>
                            <v-text-field
                                ref="password2"
                                v-model="registerForm.password2"
                                :rules="[
                                    rules.fieldRequired,
                                    rules.passwordType,
                                    rules.passwordLength
                                ]"
                                :label="$t('register.passwordConfirmLabel')"
                                prepend-icon="mdi-lock"
                                :error="error.password2.state"
                                :error-count="error.password2.errorCount"
                                :error-messages="error.password2.errorMessages"
                                type="password"
                                @input="inputPassword2"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <div class="mb-1">
                            <lang-switch-button />
                            <v-btn
                                color="primary"
                                :loading="loading"
                                @click="onSubmit"
                                >{{ $t('register.submitButtonText') }}
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';

import LangSwitchButton from '@/components/admin/LangSwitchButton.vue';

import { VForm, fieldRequired } from '@/utils/form';
import * as validator from '@/utils/validator/register';
import { $t } from '@/utils/NuxtOptions';

class RegisterForm {
    username = '';
    password = '';
    password2 = '';
    email = '';
}

class ErrorState {
    state = false;
    errorCount = 1;
    errorMessages: string[] = [];

    setState({ state, errorCount, errorMessages }) {
        this.state = state;
        this.errorCount = errorCount;
        this.errorMessages = errorMessages;
    }
}

@Component({
    components: {
        LangSwitchButton
    }
})
class Register extends Vue {
    @Ref('registerForm') readonly form!: VForm;
    @Ref('password') readonly password: any;
    @Ref('password2') readonly password2: any;

    registerForm = new RegisterForm();

    valid = true;
    loading = false;

    error = {
        email: new ErrorState(),
        username: new ErrorState(),
        password: new ErrorState(),
        password2: new ErrorState()
    };

    rules = {
        fieldRequired,
        isEmail: value =>
            validator.isEmail(value) || $t('register.error.emailFormatt'),
        usernameType: value =>
            validator.usernameType(value) || $t('register.error.usernameType'),
        usernameLength: value =>
            validator.usernameLength(value) ||
            $t('register.error.usernameLength'),
        passwordType: value =>
            validator.passwordType(value) || $t('register.error.passwordType'),
        passwordLength: value =>
            validator.passwordLength(value) ||
            $t('register.error.passwordLength')
    };

    /** 错误时，返回的respone是一个对象，指明了错误域的名称和类型
     * key: email, username, password, password2
     * value: usernameType, usernameLength, existedUsername
     *        passwordType, passwordLength, differentPassword,
     *        emailFormatt, existedEmail
     */
    onSubmit() {
        if (this.form.validate() && this.confirmPasswords()) {
            this.loading = true;
        }
    }

    setErrorState(field, state) {
        this.error[field].setState(state);
    }
    clearErrorMessages(field) {
        this.setErrorState(field, new ErrorState());
    }

    inputEmail(value) {
        this.clearErrorMessages('email');
    }

    inputUsername(value) {
        this.clearErrorMessages('username');
    }

    inputPassword(value) {
        this.confirmPasswords();
    }

    inputPassword2(value) {
        this.confirmPasswords();
    }

    setErrorMessagesFromResponse(response) {
        for (const key in response) {
            if (response.hasOwnProperty(key)) {
                this.setErrorState(key, {
                    state: true,
                    errorCount: response[key].length,
                    errorMessages: response[key].map(str => this.$t(str))
                });
            }
        }
    }

    confirmPasswords() {
        this.password.validate();
        this.password.validate();
        if (this.password.valid && this.password2.valid) {
            if (this.registerForm.password !== this.registerForm.password2) {
                const state = {
                    state: true,
                    errorCount: 1,
                    errorMessages: [this.$t('register.error.differentPassword')]
                };
                this.setErrorState('password', state);
                this.setErrorState('password2', state);
                return false;
            } else {
                this.clearErrorMessages('password');
                this.clearErrorMessages('password2');
                return true;
            }
        }
        return false;
    }
}

export default Register;
</script>

<style>
</style>