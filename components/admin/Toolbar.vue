<template>
    <v-app-bar fixed app>
        <v-app-bar-nav-icon
            @click.stop="drawerState = !drawerState"
        ></v-app-bar-nav-icon>
        <v-spacer />
        <logout-button />
    </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

const LogoutButton = {
    data: () => ({
        url: '/api/user/logout',
        loading: false
    }),
    methods: {
        async onLogout() {
            this.loading = true
            try {
                const data = (await this.$axios.$post(this.url)).redirect
                window.location.href = data
            } catch (error) {}
            this.loading = false
        }
    },
    render() {
        return (
            <v-btn
                text
                color="primary"
                loading={this.loading}
                onClick={this.onLogout}
            >
                {this.$t('admin.toolbar.logoutButtonText')}
            </v-btn>
        )
    }
}

export default {
    components: {
        LogoutButton
    },
    computed: {
        ...mapState('admin', ['drawer']),
        drawerState: {
            get() {
                return this.drawer
            },
            set(val) {
                this.SET_DRAWER(val)
            }
        }
    },
    methods: {
        ...mapMutations('admin', ['SET_DRAWER'])
    }
}
</script>

<style>
</style>