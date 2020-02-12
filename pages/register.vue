<template>
    <Register />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import Register from '@/components/user/Register/Register.vue';

@Component({
    layout: 'login-register',
    components: {
        Register
    }
})
class RegisterPage extends Vue {}

export default RegisterPage;
</script>

<style lang="scss">
    @import '@/assets/styles/variables.scss';
</style>
