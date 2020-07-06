<template>
    <v-card flat>
        <v-card-text>
            <v-alert
                v-if="hasError"
                icon="mdi-alert-circle"
                color="error"
                text
            >
                {{ rateData.error }}
            </v-alert>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { IReturnData } from '@/api/expressweb/shipment/rate';

@Component
class RateCard extends Vue {
    @Prop({ type: Object, required: true }) readonly rateData!: IReturnData;

    get hasError() {
        return this.rateData.error;
    }
}

export default RateCard;
</script>

<style>
</style>