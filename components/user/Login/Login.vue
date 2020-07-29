<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card>
                    <v-card-title class="pa-0">
                        <v-toolbar color="primary" dark>
                            {{ $t('login.toolbarText') }}
                        </v-toolbar>
                    </v-card-title>
                    <validation-observer ref="form" v-slot="{}">
                        <v-card-text>
                            <v-form>
                                <username-text-field
                                    v-model="loginForm.username"
                                />
                                <password-text-field
                                    v-model="loginForm.password"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <div class="mb-1">
                                <lang-switch-button />
                                <v-btn color="primary" text @click="onRegister">
                                    {{ $t('register.submitButtonText') }}
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    :loading="loading"
                                    @click="onSubmit"
                                >
                                    {{ $t('login.submitButtonText') }}
                                </v-btn>
                            </div>
                        </v-card-actions>
                    </validation-observer>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch, Ref } from 'nuxt-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import UsernameTextField from './UsernameTextField.vue';
import PasswordTextField from './PasswordTextField.vue';

import LangSwitchButton from '@/components/admin/LangSwitchButton.vue';

import { computeLocalePath } from '@/utils/i18n';
import * as UserApi from '@/api/user/user';

class LoginForm {
    username = '';
    password = '';
}

@Component({
    components: {
        LangSwitchButton,
        ValidationObserver,
        UsernameTextField,
        PasswordTextField
    }
})
class Login extends Vue {
    @Ref('form') readonly form!: InstanceType<typeof ValidationObserver>;

    loginForm = new LoginForm();
    loading = false;

    async onSubmit() {
        const valid = await this.form.validate();
        if (!valid) return;

        this.loading = true;
        try {
            const redirect = await UserApi.login(this.loginForm);
            // window.location.href = computeLocalePath(redirect);
            this.$router.push(computeLocalePath(redirect));
        } catch (error) {
            const code = parseInt(error.response && error.response.status);
            if (code === 401) {
                this.unAuthError();
            }
        }
        this.loading = false;
    }

    unAuthError() {
        this.form.setErrors({
            username: this.$t('login.error.invalidAccount').toString(),
            password: this.$t('login.error.invalidAccount').toString()
        });
    }

    onRegister() {
        this.$router.push(computeLocalePath('/register'));
    }
}

export default Login;
</script>

<style>
</style>