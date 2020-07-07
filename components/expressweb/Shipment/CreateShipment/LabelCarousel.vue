<template>
    <v-card flat>
        <v-card-text>
            <v-alert v-if="hasError" icon="mdi-alert-circle" color="error" text>
                <div>{{ labelData.error }}</div>
                <div>{{ $t('expressweb.shipment.rate.errorHint') }}</div>
            </v-alert>
        </v-card-text>

        <v-card-actions
            v-if="!hasError && pdfList.length > 1"
            class="justify-center"
        >
            <v-pagination v-model="curPdf" :length="pdfList.length" circle />
        </v-card-actions>
        <v-window
            v-if="!hasError"
            :value="windowIndex"
            show-arrows
            @change="changeIndex"
        >
            <v-window-item v-for="(pdf, i) in pdfList" :key="`pdf-${i}`">
                <pdf-label :src="pdf" />
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import PdfLabel from './PdfLabel.vue';

import { IReturnData } from '@/api/expressweb/shipment/create';

@Component({
    components: {
        PdfLabel
    }
})
class LabelCarousel extends Vue {
    @Prop({ type: Object, required: true }) readonly labelData!: IReturnData;

    curPdf = 1;

    get windowIndex() {
        return this.curPdf - 1;
    }

    get hasError() {
        return this.labelData.error;
    }

    get pdfList() {
        return this.labelData.labels;
    }

    changeIndex(val) {
        this.curPdf = val + 1;
    }
}

export default LabelCarousel;
</script>

<style>
</style>