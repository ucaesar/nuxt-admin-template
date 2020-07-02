<template>
    <v-card flat>
        <v-card-actions class="justify-space-between">
            <v-btn text @click="prev">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-item-group v-model="curPdf" class="text-center" mandatory>
                <v-item
                    v-for="n in pdfList.length"
                    :key="`btn-${n}`"
                    v-slot:default="{ active, toggle }"
                >
                    <v-btn :input-value="active" icon @click="toggle">
                        <v-icon>mdi-record</v-icon>
                    </v-btn>
                </v-item>
            </v-item-group>
            <v-btn text @click="next">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-card-actions>
        <v-window v-model="curPdf" show-arrows>
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

    curPdf = 0;

    next() {
        this.curPdf =
            this.curPdf + 1 === this.pdfList.length ? 0 : this.curPdf + 1;
    }
    prev() {
        this.curPdf =
            this.curPdf - 1 < 0 ? this.pdfList.length - 1 : this.curPdf - 1;
    }
}

export default LabelCarousel;
</script>

<style>
</style>