<template>
    <div>
        <v-form>
            <country-input sender />
            <province-input country-code="CN" />
        </v-form>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import CountryInput from '@/components/expressweb/Zone/CountryInput.vue';
import ProvinceInput from '@/components/expressweb/Zone/ProvinceInput.vue';

@Component({
    layout: 'admin',
    components: {
        CountryInput,
        ProvinceInput
    }
})
class Page extends Vue {}

export default Page;
</script>

<style></style>
