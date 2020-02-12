<template>
    <fixed-label-input
        label-width="100px"
        :label="label"
        :show-label="!mobileMode"
    >
        <v-radio-group
            :label="mobileMode ? label : ''"
            row
            dense
            :value="value"
            @change="val => $emit('input', val)"
        >
            <v-radio :label="$t('expressweb.package.cm')" value="cm" />
            <v-radio :label="$t('expressweb.package.in')" value="in" />
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
        return $t('expressweb.package.dimensionUnitLabel');
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