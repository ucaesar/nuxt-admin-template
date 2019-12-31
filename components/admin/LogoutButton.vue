<template>
    <v-btn text color="primary" :loading="loading" @click="onLogout">
        {{ $t('admin.toolbar.logoutButtonText') }}
    </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import * as UserApi from '@/api/user/user';

@Component
class LogoutButton extends Vue {
    url = 'api/user/logout';
    loading = false;

    async onLogout() {
        this.loading = true;
        try {
            const redirect = await UserApi.logout();
            window.location.href = redirect;
        } catch (error) {}
        this.loading = false;
    }
}

export default LogoutButton;
</script>

<style></style>
