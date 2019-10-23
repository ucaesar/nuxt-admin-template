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
// import AdminNavigator from '@/components/admin/Navigator'
// import AdminToolbar from '@/components/admin/Toolbar'
import { Component, Vue } from 'vue-property-decorator'

/* export default {
    middleware: 'admin/navigation',
    components: {
        AdminNavigator,
        AdminToolbar
    }
} */

@Component({
    components: {
        AdminNavigator: () => import('@/components/admin/Navigator'),
        AdminToolbar: () => import('@/components/admin/Toolbar')
    },
    middleware: 'admin/navigation'
})

</script>

<style>
.nav {
    padding-top: 64px;
}
</style>
