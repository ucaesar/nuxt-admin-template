<template>
    <fixed-label-input
        label-width="100px"
        :label="label"
        :show-label="!mobileMode"
    >
        <v-radio-group
            :label="mobileMode ? label : ''"
            :value="value"
            row
            dense
            @change="val => $emit('input', val)"
        >
            <v-radio :label="$t('expressweb.package.kg')" value="kg" />
            <v-radio :label="$t('expressweb.package.lb')" value="lb" />
        </v-radio-group>
    </fixed-label-input>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import FixedLabelInput from '@/components/common/FixedLabelInput.vue';

import { $t } from '@/utils/NuxtOptions';

@Component({
    components: {
        FixedLabelInput
    }
})
class WeightUnitInput extends Vue {
    @Prop({ required: true }) readonly value!: string;

    get label() {
        return $t('expressweb.package.weightUnitLabel');
    }

    get mobileMode() {
        /* const name = this.$vuetify.breakpoint.name;
        return ['xs', 'sm'].includes(name); */
        return this.$vuetify.breakpoint.smAndDown;
    }
}

export default WeightUnitInput;
</script>

<style>
</style>