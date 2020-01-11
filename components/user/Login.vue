<template>
    <v-container class="fill-height" fluid>
        <message />
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-btn icon><v-icon>mdi-account</v-icon></v-btn>
                        <v-toolbar-title>
                            {{ $t('login.toolbarText') }}
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="loginForm" v-model="valid">
                            <v-text-field
                                v-model="loginForm.username"
                                :rules="[rules.fieldRequired]"
                                :label="$t('login.usernameLabel')"
                                :error="error"
                                :error-messages="errorMessages"
                                prepend-icon="mdi-account"
                                @input="clearErrorMessages"
                            ></v-text-field>
                            <v-text-field
                                v-model="loginForm.password"
                                :rules="[rules.fieldRequired]"
                                :label="$t('login.passwordLabel')"
                                :error="error"
                                :error-messages="errorMessages"
                                prepend-icon="mdi-lock"
                                type="password"
                                autocomplete="new-password"
                                @input="clearErrorMessages"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn
                            color="primary"
                            class="mb-1"
                            :loading="loading"
                            @click="onSubmit"
                            >{{ $t('login.submitButtonText') }}</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'nuxt-property-decorator';

import { VForm, fieldRequired } from '@/utils/form';
import { computeLocalePath } from '@/utils/i18n';

import * as UserApi from '@/api/user/user';

class LoginForm {
    username = '';
    password = '';
}

@Component({
    components: {
        Message: () => import('@/components/Message.vue')
    }
})
class Login extends Vue {
    loginForm = new LoginForm();

    valid = true;
    loading = false;
    error = false;
    errorMessages = '';
    rules = { fieldRequired };

    @Ref('loginForm') readonly form!: VForm;

    async onSubmit() {
        if ((this.form as VForm).validate()) {
            this.clearErrorMessages();
            this.loading = true;
            try {
                const redirect = await UserApi.login(this.loginForm);
                window.location.href = computeLocalePath(redirect);
            } catch (error) {
                const code = parseInt(error.response && error.response.status);
                if (code === 401) {
                    this.unAuthError();
                }
            }
            this.loading = false;
        }
    }
    unAuthError() {
        this.error = true;
        this.errorMessages = this.$t('login.error.invalidAccount').toString();
    }
    clearErrorMessages() {
        this.error = false;
        this.errorMessages = '';
    }
}
export default Login;
</script>

<style></style>
