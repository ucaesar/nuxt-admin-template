<template>
    <v-row justify="center">
        <v-col cols="12" md="8" class="px-0">
            <v-expansion-panels v-model="curStep" accordion mandatory>
                <loading-overlay
                    :loading="loading"
                    :loading-text="loadingText"
                />
                <v-expansion-panel :disabled="curStep !== COMPLETE_FORM_STEP">
                    <expansion-step-header
                        :step="COMPLETE_FORM_STEP"
                        :header-text="
                            $t(
                                'expressweb.shipment.completeForm.stepHeaderText'
                            )
                        "
                    />
                    <v-expansion-panel-content
                        ><shipment-form @submit="rateStep"
                    /></v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel :disabled="curStep !== RATE_STEP">
                    <expansion-step-header
                        :step="RATE_STEP"
                        :header-text="
                            $t('expressweb.shipment.rate.stepHeaderText')
                        "
                    />
                    <v-expansion-panel-content>
                        <rate-card :rate-data="rateData" @back="back" />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel :disabled="curStep !== ORDER_STEP">
                    <expansion-step-header
                        :step="ORDER_STEP"
                        :header-text="
                            $t('expressweb.shipment.order.stepHeaderText')
                        "
                    />
                    <v-expansion-panel-content></v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';
import _ from 'lodash';

import ShipmentForm from './Form.vue';
import ExpansionStepHeader from './ExpansionStepHeader.vue';
import RateCard from './RateCard.vue';

import LoadingOverlay from '@/components/common/LoadingOverlay.vue';

import * as RateApi from '@/api/expressweb/shipment/rate';
import * as CreateApi from '@/api/expressweb/shipment/create';
import { IShipment } from '@/models/expressweb/Shipment';

@Component({
    components: {
        ShipmentForm,
        ExpansionStepHeader,
        RateCard,
        LoadingOverlay
    }
})
class IndexPage extends Vue {
    COMPLETE_FORM_STEP = 0;
    RATE_STEP = 1;
    ORDER_STEP = 2;

    curStep = this.COMPLETE_FORM_STEP;
    minStep = 0;
    maxStep = 2;

    formData: IShipment;
    rateData: RateApi.IReturnData = {};

    loading: boolean = false;
    loadingText: string = '';

    next() {
        this.curStep + 1 > this.maxStep
            ? (this.curStep = this.maxStep)
            : (this.curStep = this.curStep + 1);
    }

    back() {
        this.curStep - 1 < this.minStep
            ? (this.curStep = this.minStep)
            : (this.curStep = this.curStep - 1);
    }

    async rateStep(formData: IShipment) {
        this.loading = true;
        this.loadingText = this.$t(
            'expressweb.shipment.rate.loadingText'
        ) as string;

        this.formData = formData;
        this.rateData = await RateApi.$post(formData);

        this.loading = false;
        this.next();
    }
}

export default IndexPage;
</script>

<style>
</style>