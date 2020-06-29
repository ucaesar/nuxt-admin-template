<template>
    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-expansion-panels v-model="curStep" accordion>
                <v-expansion-panel :key="COMPLETE_FORM_STEP">
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
                    /></v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel :key="RATE_STEP">
                    <expansion-step-header
                        :step="RATE_STEP"
                        :header-text="
                            $t('expressweb.shipment.rate.stepHeaderText')
                        "
                    />
                    <v-expansion-panel-content></v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel :key="ORDER_STEP">
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
import { Vue, Component, Ref, namespace } from 'nuxt-property-decorator';

import ShipmentForm from './Form.vue';
import ExpansionStepHeader from './ExpansionStepHeader.vue';

@Component({
    components: { ShipmentForm, ExpansionStepHeader }
})
class IndexPage extends Vue {
    COMPLETE_FORM_STEP = 0;
    RATE_STEP = 1;
    ORDER_STEP = 2;

    curStep = this.COMPLETE_FORM_STEP;
}

export default IndexPage;
</script>

<style>
</style>