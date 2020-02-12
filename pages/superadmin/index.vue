<template>
    <div>
        <shipment-panels />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';

import ShipmentPanels from '@/components/expressweb/Shipment/ShipmentPanels.vue';

import { Address } from '@/models/expressweb/Address';
import { VForm } from '@/utils/form';

@Component({
    layout: 'admin',
    components: {
        ShipmentPanels
    }
})
class Page extends Vue {}

export default Page;
</script>

<style lang="scss">
    @import '@/assets/styles/variables.scss';
</style>
