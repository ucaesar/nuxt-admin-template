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
                    <v-card-text></v-card-text>
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
import { Vue, Component } from 'nuxt-property-decorator';

@Component
class Register extends Vue {
    onSubmit() {}
}

export default Register;
</script>

<style>
</style>