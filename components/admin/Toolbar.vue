<template>
    <v-app-bar fixed app>
        <v-app-bar-nav-icon @click.stop="toogleDrawer"></v-app-bar-nav-icon>
        <v-spacer />
        <logout-button />
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'

const adminStore = namespace('admin')

@Component({
    components: {
        LogoutButton: () => import('@/components/admin/LogoutButton.vue')
    }
})
class Toolbar extends Vue {
    @adminStore.Action('toogleDrawer') toogleDrawer
}

export default Toolbar
</script>

<style>
</style>