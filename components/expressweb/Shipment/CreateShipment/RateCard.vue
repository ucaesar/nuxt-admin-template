<template>
    <v-card>
        <v-alert icon="mdi-alert-circle-outline" color="error" border="left">
            {{ rate.error }}
        </v-alert>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { IReturnData } from '@/api/expressweb/shipment/rate';

@Component
class RateCard extends Vue {
    @Prop({ type: Object, required: true }) readonly rateData!: IReturnData | undefined;
}

export default RateCard;
</script>

<style>
</style>