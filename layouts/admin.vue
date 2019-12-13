<template>
    <v-app>
        <Message />
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
import Message from '@/components/Message.vue';

@Component({
    components: {
        AdminNavigator: () => import('@/components/admin/Navigator.vue'),
        AdminToolbar: () => import('@/components/admin/Toolbar.vue'),
        Message
    },
    middleware: ['admin/navigation']
})
class Admin extends Vue {}
export default Admin;
</script>

<style>
</style>
