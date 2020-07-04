<template>
    <v-card flat>
        <v-card-title>
            <v-toolbar dense flat>
                <v-btn color="primary" @click="print">
                    <v-icon>mdi-printer</v-icon>打印此标签
                </v-btn>
            </v-toolbar>
        </v-card-title>
        <pdf ref="pdfLabel" :src="base64Src" />
    </v-card>
</template>

<script>
import { Vue, Component, Ref, Prop } from 'nuxt-property-decorator';
import pdf from 'vue-pdf';

@Component({
    components: {
        pdf
    }
})
class PdfLabel extends Vue {
    @Prop({ type: String, required: true }) src;

    get base64Src() {
        const prefix = 'data:application/pdf;base64,';
        return prefix + this.src;
    }

    print() {
        this.$refs.pdfLabel.print(100);
    }
}

export default PdfLabel;
</script>

<style>
</style>