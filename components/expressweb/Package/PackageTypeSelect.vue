<template>
    <validation-provider
        v-slot="{ errors }"
        rules="required"
        :style="{ width: '100%' }"
    >
        <v-select
            v-bind="$attrs"
            :items="packageTypes"
            :error-messages="errors[0]"
            item-value="value"
            item-text="title"
            :label="label"
            :value="value"
            @change="val => $emit('input', val)"
        ></v-select
    ></validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

import { PACKAGE_TYPE } from './const';

import FixedLabelInput from '@/components/common/FixedLabelInput.vue';

import { $t } from '@/utils/NuxtOptions';
import { fieldRequired } from '@/utils/form';

@Component({
    components: {
        ValidationProvider
    }
})
class PackageTypeSelect extends Vue {
    @Prop({ required: true }) readonly value!: String;

    get packageTypes() {
        return [
            {
                value: PACKAGE_TYPE.BOX,
                title: this.$t('expressweb.package.type.fedexBox')
            },
            {
                value: PACKAGE_TYPE.ENVELOPE,
                title: this.$t('expressweb.package.type.fedexEnvelope')
            },
            {
                value: PACKAGE_TYPE.PAK,
                title: this.$t('expressweb.package.type.fedexPak')
            },
            {
                value: PACKAGE_TYPE.YOUR_PACKAGING,
                title: this.$t('expressweb.package.type.yourPackaging')
            }
        ];
    }

    get label() {
        return $t('expressweb.package.packageTypeLabel');
    }
}

export default PackageTypeSelect;
</script>

<style>
</style>