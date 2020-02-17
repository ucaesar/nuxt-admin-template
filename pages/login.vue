<template>
    <Login />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import Login from '@/components/user/Login/Login.vue';

@Component({
    layout: 'login-register',
    components: {
        Login
    }
})
class LoginPage extends Vue {}

export default LoginPage;
</script>

<style></style>
