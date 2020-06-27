<template>
    <div>
        <button
            @click="
                $refs.myPdfComponent.print(100, [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14
                ])
            "
        >
            print
        </button>
        <pdf
            ref="myPdfComponent"
            src="https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/freeculture.pdf"
        />
    </div>
</template>

<script>
import { Vue, Component, Ref, namespace } from 'nuxt-property-decorator';
import pdf from 'vue-pdf';

@Component({
    layout: 'admin',
    components: {
        pdf
    }
})
class Page extends Vue {}

export default Page;
</script>

<style></style>
