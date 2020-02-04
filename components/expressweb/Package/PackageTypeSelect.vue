<template>
    <v-select
        outlined
        :items="packageTypes"
        item-value="value"
        item-text="title"
        :label="$t('expressweb.package.packageTypeLabel')"
        :value="value"
        :rules="[rules.fieldRequired]"
        @change="val => $emit('input', val)"
    ></v-select>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { PACKAGE_TYPE } from './const';

import { $t } from '@/utils/NuxtOptions';
import { fieldRequired } from '@/utils/form';

@Component
class PackageTypeSelect extends Vue {
    @Prop({ required: true }) readonly value!: String;
    rules = { fieldRequired };

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
}

export default PackageTypeSelect;
</script>

<style>
</style>