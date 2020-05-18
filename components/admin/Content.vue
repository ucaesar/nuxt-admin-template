<template>
    <v-content id="app-content">
        <v-toolbar v-if="$breakpoint.isMobile" color="primary" dark>
            <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <nuxt />
        </v-container>
    </v-content>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';

const adminStore = namespace('admin');

@Component
class Content extends Vue {
    @adminStore.State('pageTitle') pageTitle;
}

export default Content;
</script>

<style>
#app-content {
    background: #eeeeee;
}
</style>