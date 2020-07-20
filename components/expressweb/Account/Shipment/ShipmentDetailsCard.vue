<template>
    <div>
        <shipment-form :disabled="true" :form-data="formData" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import ShipmentForm from '@/components/expressweb/Shipment/CreateShipment/Form.vue';
import { IShipment } from '@/models/expressweb/Shipment';

@Component({
    components: {
        ShipmentForm
    }
})
class ShipmentDetailsCard extends Vue {
    @Prop({ type: Object, required: true }) readonly formData!: IShipment;
}

export default ShipmentDetailsCard;
</script>

<style>
</style>