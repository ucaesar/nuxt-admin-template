<template>
    <v-card flat>
        <pdf :src="base64Src" />
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
}

export default PdfLabel;
</script>

<style>
</style>