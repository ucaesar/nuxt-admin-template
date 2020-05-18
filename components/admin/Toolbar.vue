<template>
    <v-app-bar app color="primary" dark :flat="isMobile">
        <v-app-bar-nav-icon @click.stop="toogleDrawer" />
        <v-toolbar-title v-if="!isMobile">{{ pageTitle }}</v-toolbar-title>
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
    @adminStore.State('pageTitle') pageTitle;

    get isMobile() {
        return (this as any).$breakpoint.isMobile;
    }
}

export default Toolbar;
</script>

<style>
</style>
