<template>
    <Register />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import Register from '@/components/user/Register.vue';

@Component({
    layout: 'login-register',
    components: {
        Register
    }
})
class RegisterPage extends Vue {}

export default RegisterPage;
</script>

<style></style>
