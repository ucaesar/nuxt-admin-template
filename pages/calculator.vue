<template>
    <calculator />
</template>

<script lang="ts">
import { Vue, Component, Ref, namespace } from 'nuxt-property-decorator';

import Calculator from '@/components/expressweb/Calculator/Calculator.vue';

const adminStore = namespace('admin');

@Component({
    layout: 'admin',
    components: {
        Calculator
    }
})
class Page extends Vue {
    @adminStore.Mutation('SET_PAGETITLE') setPageTitle;

    mounted() {
        this.setPageTitle(this.$t('expressweb.pageTitle.calculator'));
    }
}

export default Page;
</script>

<style></style>
