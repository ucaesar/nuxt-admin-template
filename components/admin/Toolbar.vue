<template>
    <v-app-bar fixed app>
        <v-app-bar-nav-icon @click.stop="toogleDrawer"></v-app-bar-nav-icon>
        <v-spacer />
        <lang-switch-button />
        <logout-button />
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';

import LogoutButton from '@/components/admin/LogoutButton.vue';
import LangSwitchButton from '@/components/admin/LangSwitchButton.vue';

const adminStore = namespace('admin');

@Component({
    components: {
        LogoutButton,
        LangSwitchButton
    }
})
class Toolbar extends Vue {
    @adminStore.Action('toogleDrawer') toogleDrawer;
}

export default Toolbar;
</script>

<style></style>
