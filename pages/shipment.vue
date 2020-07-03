<template>
    <index-page />
</template>

<script lang="ts">
import { Vue, Component, Ref, namespace } from 'nuxt-property-decorator';

// import ShipmentPanels from '@/components/expressweb/Shipment/ShipmentPanels.vue';
import IndexPage from '@/components/expressweb/Shipment/CreateShipment/index.vue';

import { Address } from '@/models/expressweb/Address';
import { VForm } from '@/utils/form';

const adminStore = namespace('admin');

@Component({
    layout: 'admin',
    components: {
        IndexPage
    }
})
class Page extends Vue {
    @adminStore.Mutation('SET_PAGETITLE') setPageTitle;

    mounted() {
        this.setPageTitle(this.$t('expressweb.pageTitle.shipment'));
    }
}

export default Page;
</script>

<style></style>
