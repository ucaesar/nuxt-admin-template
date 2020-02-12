<template>
    <create-shipment-panel />
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import CreateShipmentPanel from './CreateShipment/CreateShipmentPanel.vue';

@Component({
    components: {
        CreateShipmentPanel
    }
})
class ShipmentPanels extends Vue {}

export default ShipmentPanels;
</script>

<style>
</style>