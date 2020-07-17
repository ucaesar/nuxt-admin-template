<template>
    <div>
        <shipment-form :disabled="true" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import ShipmentForm from '@/components/expressweb/Shipment/CreateShipment/Form.vue';

@Component({
    components: {
        ShipmentForm
    }
})
class ShipmentDetailsCard extends Vue {}

export default ShipmentDetailsCard;
</script>

<style>
</style>