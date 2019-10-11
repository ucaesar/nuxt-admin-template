<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" fixed app class="nav">
            <navigator :config="navigations" />
        </v-navigation-drawer>
        <v-app-bar fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        </v-app-bar>
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Navigator from '@/components/admin/Navigator';

export default {
    middleware: 'admin/navigation',
    components: {
        Navigator
    },
    data: () => ({
        drawer: true
    }),
    computed: {
        ...mapState('admin', ['navigations'])
    }
};
</script>

<style>
.nav {
    padding-top: 64px;
}
</style>
