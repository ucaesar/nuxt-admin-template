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
                        ><shipment-form
                            :form-data="formData"
                            @submit="rateStep"
                            @input="onChangeFormData"
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
                        <rate-card
                            :rate-data="rateData"
                            @back="back"
                            @next="showLabelStep"
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel :disabled="curStep !== SHOW_LABEL_STEP">
                    <expansion-step-header
                        :step="SHOW_LABEL_STEP"
                        :header-text="
                            $t('expressweb.shipment.showLabel.stepHeaderText')
                        "
                    />
                    <v-expansion-panel-content>
                        <label-carousel :label-data="labelData" />
                    </v-expansion-panel-content>
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
import LabelCarousel from './LabelCarousel.vue';

import LoadingOverlay from '@/components/common/LoadingOverlay.vue';

import * as RateApi from '@/api/expressweb/shipment/rate';
import * as CreateApi from '@/api/expressweb/shipment/create';
import { IShipment, ShipmentData } from '@/models/expressweb/Shipment';

@Component({
    components: {
        ShipmentForm,
        ExpansionStepHeader,
        RateCard,
        LoadingOverlay,
        LabelCarousel
    }
})
class IndexPage extends Vue {
    COMPLETE_FORM_STEP = 0;
    RATE_STEP = 1;
    SHOW_LABEL_STEP = 2;

    curStep = this.COMPLETE_FORM_STEP;
    minStep = 0;
    maxStep = 2;

    formData: IShipment = this.getTestFormData();
    rateData: RateApi.IReturnData = {};
    labelData: CreateApi.IReturnData = {};

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

    onChangeFormData(field, value) {
        this.formData[field] = value;
    }

    async rateStep(retVal: boolean) {
        if (!retVal) return;

        this.loading = true;
        this.loadingText = this.$t(
            'expressweb.shipment.rate.loadingText'
        ) as string;

        this.rateData = await RateApi.$post(this.formData);

        this.loading = false;
        this.next();
    }

    async showLabelStep() {
        this.loading = true;
        this.loadingText = this.$t(
            'expressweb.shipment.showLabel.loadingText'
        ) as string;

        this.labelData = await CreateApi.$post(this.formData);

        this.loading = false;
        this.next();
    }

    getTestFormData() {
        const formData = new ShipmentData();

        formData.senderAddress.name = 'James Wang';
        formData.senderAddress.phone = '123';
        formData.senderAddress.country = 'CA';
        formData.senderAddress.province = 'BC';
        formData.senderAddress.city = 'Burnaby';
        formData.senderAddress.postcode = 'V5C 3J1';
        formData.senderAddress.address = '3845 William St';

        formData.receiverAddress.name = 'Caesar You';
        formData.receiverAddress.phone = '123';
        formData.receiverAddress.country = 'CA';
        formData.receiverAddress.province = 'BC';
        formData.receiverAddress.city = 'Vancouver';
        formData.receiverAddress.postcode = 'V6B 2T9';
        formData.receiverAddress.address = '1111 Mainland St';

        formData.pac.weightUnit = 'kg';
        formData.pac.dimensionUnit = 'cm';
        formData.pac.packageType = '1';
        formData.pac.weight = '0.1';

        /* formData.products = [];
        formData.products[0] = {
            description: 'desc',
            origin: 'CN',
            weight: '1',
            quantity: '1',
            unit: 'piece',
            pricePerUnit: '35'
        }; */

        return formData;
    }
}

export default IndexPage;
</script>

<style>
</style>