<template>
    <shipment-table />
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';

import ShipmentTable from './ShipmentTable.vue';

@Component({
    components: {
        ShipmentTable
    }
})
class IndexPage extends Vue {}

export default IndexPage;
</script>

<style>
</style>