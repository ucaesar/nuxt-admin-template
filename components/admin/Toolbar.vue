<template>
    <v-app-bar fixed app>
        <v-app-bar-nav-icon @click.stop="toogleDrawer"></v-app-bar-nav-icon>
        <v-spacer />
        <logout-button />
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Action } from 'nuxt-property-decorator'

@Component({
    components: {
        LogoutButton: () => import('@/components/admin/LogoutButton.vue')
    }
})
class Toolbar extends Vue {
    @Action('admin/toogleDrawer') toogleDrawer
}

export default Toolbar
</script>

<style>
</style>