<template>
    <div>
        <pdf src="~/assets/aaa.pdf" />
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
