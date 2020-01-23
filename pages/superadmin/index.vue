<template>
    <div>
        <v-form>
            <country-input sender />
            <province-input country-code="CN" />
            <address-input />
        </v-form>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import CountryInput from '@/components/expressweb/Address/CountryInput.vue';
import ProvinceInput from '@/components/expressweb/Address/ProvinceInput.vue';
import AddressInput from '@/components/expressweb/Address/AddressInput.vue';

@Component({
    layout: 'admin',
    components: {
        CountryInput,
        ProvinceInput,
        AddressInput
    }
})
class Page extends Vue {}

export default Page;
</script>

<style></style>
