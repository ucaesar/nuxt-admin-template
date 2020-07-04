<template>
    <v-card flat>
        <v-card-actions v-if="pdfList.length > 1" class="justify-center">
            <v-pagination v-model="curPdf" :length="pdfList.length" circle />
        </v-card-actions>
        <v-window :value="windowIndex" show-arrows @change="changeIndex">
            <v-window-item v-for="(pdf, i) in pdfList" :key="`pdf-${i}`">
                <pdf-label :src="pdf" />
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import PdfLabel from './PdfLabel.vue';

@Component({
    components: {
        PdfLabel
    }
})
class LabelCarousel extends Vue {
    @Prop({ type: Array, required: true }) readonly pdfList!: string[];

    curPdf = 1;

    get windowIndex() {
        return this.curPdf - 1;
    }

    changeIndex(val) {
        this.curPdf = val + 1;
    }
}

export default LabelCarousel;
</script>

<style>
</style>