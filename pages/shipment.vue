<template>
    <div>
        <create-shipment-form />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, namespace } from 'nuxt-property-decorator';

// import ShipmentPanels from '@/components/expressweb/Shipment/ShipmentPanels.vue';
import CreateShipmentForm from '@/components/expressweb/Shipment/CreateShipment/Form.vue';

import { Address } from '@/models/expressweb/Address';
import { VForm } from '@/utils/form';

const adminStore = namespace('admin');

@Component({
    layout: 'admin',
    components: {
        CreateShipmentForm
    }
})
class Page extends Vue {
    @adminStore.Mutation('SET_PAGETITLE') setPageTitle;

    mounted() {
        this.setPageTitle('Create Shipment');
    }
}

export default Page;
</script>

<style></style>
