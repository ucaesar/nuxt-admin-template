<template>
    <v-card flat>
        <v-card-title v-if="!hasError"> {{ rateText }}</v-card-title>
        <v-card-text>
            <v-alert v-if="hasError" icon="mdi-alert-circle" color="error" text>
                <div>{{ rateData.error }}</div>
                <div>{{ $t('expressweb.shipment.rate.errorHint') }}</div>
            </v-alert>
        </v-card-text>
        <v-card-actions>
            <v-toolbar dense flat>
                <v-btn
                    :disabled="!!hasError"
                    color="primary"
                    @click="next"
                    >{{ $t('expressweb.shipment.rate.payButtonText') }}</v-btn
                >
                <v-btn text @click="back">{{
                    $t('components.stepper.backButtonText')
                }}</v-btn>
            </v-toolbar>
        </v-card-actions>
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

    get rateText() {
        return `${this.rateData.money!.amount} ${
            this.rateData.money!.currency
        }`;
    }

    back() {
        this.$emit('back');
    }

    next() {
        this.$emit('next');
    }
}

export default RateCard;
</script>

<style>
</style>