<template>
    <v-app>
        <Message />
        <admin-navigator />
        <admin-toolbar />
        <admin-content />
    </v-app>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';

import Message from '@/components/Message.vue';
import AdminNavigator from '@/components/admin/Navigator.vue';
import AdminToolbar from '@/components/admin/Toolbar.vue';
import AdminContent from '@/components/admin/Content.vue';

const adminStore = namespace('admin');

@Component({
    components: {
        AdminNavigator,
        AdminToolbar,
        AdminContent,
        Message
    }
    // middleware: 'admin/navigation'
})
class Admin extends Vue {
    @adminStore.Action('setNavigations') setNavigations;

    created() {
        this.setNavigations();
    }
}
export default Admin;
</script>

<style>
</style>
