<template>
    <v-container class="fill-height" fluid>
        <message />
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>{{
                            $t('login.toolbarText')
                        }}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="loginForm" v-model="valid">
                            <v-text-field
                                v-model="loginForm.username"
                                :rules="[rules.fieldRequired]"
                                :label="$t('login.usernameLabel')"
                                :error-messages="errorMessages"
                                prepend-icon="mdi-account"
                                @input="clearErrorMessages"
                            ></v-text-field>
                            <v-text-field
                                v-model="loginForm.password"
                                :rules="[rules.fieldRequired]"
                                :label="$t('login.passwordLabel')"
                                :error-messages="errorMessages"
                                prepend-icon="mdi-lock"
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

<script>
import { fieldRequired } from '~/utils/form'
import Message from '~/components/Message'

export default {
    components: {
        Message
    },
    data: () => ({
        url: 'api/user/login',
        loginForm: {
            username: '',
            password: ''
        },
        valid: true,
        loading: false,
        errorMessages: '',
        rules: {
            fieldRequired
        }
    }),
    methods: {
        async onSubmit() {
            if (this.$refs.loginForm.validate()) {
                this.clearErrorMessages()
                this.loading = true
                try {
                    const data = (await this.$axios.$post(
                        this.url,
                        this.loginForm
                    )).redirect
                    window.location.href = data
                } catch (error) {
                    const code = parseInt(
                        error.response && error.response.status
                    )
                    if (code === 401) {
                        this.unAuthError()
                    }
                }
                this.loading = false
            }
        },
        unAuthError() {
            this.errorMessages = this.$t('login.error.invalidAccount')
        },
        clearErrorMessages() {
            this.errorMessages = ''
        }
    }
}
</script>

<style></style>
