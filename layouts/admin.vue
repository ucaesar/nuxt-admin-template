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

<script>
import AdminNavigator from '@/components/admin/Navigator';
import AdminToolbar from '@/components/admin/Toolbar';

export default {
    middleware: 'admin/navigation',
    components: {
        AdminNavigator,
        AdminToolbar
    }
};
</script>

<style>
</style>
