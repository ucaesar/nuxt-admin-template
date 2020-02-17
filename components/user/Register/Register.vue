<template>
    <v-container class="fill-height" fluid>
        <message />
        <v-row align="center" justify="center">
            <v-col cols="12">
                <validation-observer ref="form" v-slot="{}">
                    <v-card>
                        <v-card-title>
                            {{ $t('register.toolbarText') }}
                        </v-card-title>
                        <!--
                    <v-toolbar color="primary" dark flat>
                        <v-btn icon><v-icon>mdi-account</v-icon></v-btn>
                        <v-toolbar-title>
                            {{ $t('register.toolbarText') }}
                        </v-toolbar-title>
                    </v-toolbar> -->
                        <v-card-text>
                            <v-form>
                                <email-text-field
                                    v-model="registerForm.email"
                                />
                                <username-text-field
                                    v-model="registerForm.username"
                                />
                                <password-text-field
                                    v-model="registerForm.password"
                                />
                                <password-confirm-text-field
                                    v-model="registerForm.password2"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <div class="mb-1">
                                <lang-switch-button />
                                <v-btn color="primary" text @click="onLogin">
                                    {{ $t('register.loginButtonText') }}
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    :loading="loading"
                                    @click="onSubmit"
                                >
                                    {{ $t('register.submitButtonText') }}
                                </v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                </validation-observer>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch, Ref } from 'nuxt-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import EmailTextField from './EmailTextField.vue';
import UsernameTextField from './UsernameTextField.vue';
import PasswordTextField from './PasswordTextField.vue';
import PasswordConfirmTextField from './PasswordConfirmTextField.vue';

import LangSwitchButton from '@/components/admin/LangSwitchButton.vue';
import Message from '@/components/Message.vue';

import { computeLocalePath } from '@/utils/i18n';

class RegisterForm {
    username = '';
    password = '';
    password2 = '';
    email = '';
}

@Component({
    components: {
        Message,
        LangSwitchButton,
        ValidationObserver,
        EmailTextField,
        UsernameTextField,
        PasswordTextField,
        PasswordConfirmTextField
    }
})
class Register extends Vue {
    registerForm = new RegisterForm();

    onLogin() {
        this.$router.push(computeLocalePath('/login'));
    }
}

export default Register;
</script>

<style>
</style>