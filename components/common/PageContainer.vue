<template>
    <v-container :class="paddingStyle">
        <slot />
    </v-container>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';

@Component
class PageContainer extends Vue {
    get paddingStyle() {
        if ((this as any).$breakpoint.isMobile) return 'px-0';
        return '';
    }
}

export default PageContainer;
</script>

<style>
</style>