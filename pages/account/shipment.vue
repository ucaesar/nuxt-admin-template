<template>
    <page-container>
        <index-page />
    </page-container>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';

import PageContainer from '@/components/common/PageContainer.vue';
import IndexPage from '@/components/expressweb/Account/Shipment/index.vue';

const adminStore = namespace('admin');

@Component({
    layout: 'admin',
    components: {
        PageContainer,
        IndexPage
    }
})
class ShipmentPage extends Vue {
    @adminStore.Mutation('SET_PAGETITLE') setPageTitle;

    mounted() {
        this.setPageTitle(this.$t('expressweb.pageTitle.account.shipment'));
    }
}

export default ShipmentPage;
</script>

<style>
</style>