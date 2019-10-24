<template>
    <Login />
</template>

<script lang="ts">
/* import Login from '@/components/Login'
export default {
    layout: 'login-register',
    components: {
        Login
    }
} */
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        Login: () => import('@/components/Login')
    }
})
export default class Login extends Vue {}
</script>

<style></style>
