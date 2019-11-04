<template>
    <v-app>
        <admin-navigator />
        <admin-toolbar />
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
@Component({
    components: {
        AdminNavigator: () => import('@/components/admin/Navigator.vue'),
        AdminToolbar: () => import('@/components/admin/Toolbar.vue')
    },
    middleware: ['admin/navigation']
})
class Admin extends Vue {}
export default Admin;
</script>

<style>
</style>
