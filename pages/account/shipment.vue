<template>
    <div></div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';

const adminStore = namespace('admin');

@Component({
    layout: 'admin'
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