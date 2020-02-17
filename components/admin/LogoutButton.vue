<template>
    <v-btn text :loading="loading" @click="onLogout">
        {{ $t('admin.toolbar.logoutButtonText') }}
    </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import * as UserApi from '@/api/user/user';

import { computeLocalePath } from '@/utils/i18n';

@Component
class LogoutButton extends Vue {
    loading = false;

    async onLogout() {
        this.loading = true;
        try {
            const redirect = await UserApi.logout();
            // window.location.href = redirect;
            this.$router.push(computeLocalePath(redirect));
        } catch (error) {}
        this.loading = false;
    }
}

export default LogoutButton;
</script>

<style></style>
