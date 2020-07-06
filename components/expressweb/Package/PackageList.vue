<template>
    <v-row>
        <v-col cols="12" class="py-0">
            <v-alert
                text
                dismissible
                icon="mdi-alert-circle-outline"
                color="warning"
                class="ma-0"
            >
                <div>{{ $t('expressweb.package.yourPackagingHint.text') }}</div>
                <div>
                    {{ $t('expressweb.package.yourPackagingHint.rules') }}
                </div>
            </v-alert>
        </v-col>

        <v-col
            v-for="(item, index) in value"
            :key="index"
            cols="12"
            class="py-0"
        >
            <v-col v-if="inlineChip" cols="12" class="py-0">
                <v-chip
                    :close="value.length > 1"
                    @click:close="onDelete(index)"
                    >{{
                        $t('expressweb.package.orderLabel') + `${index + 1}`
                    }}</v-chip
                >
            </v-col>

            <v-col cols="12" class="d-flex py-0">
                <div v-if="!inlineChip" class="package-order">
                    <v-chip
                        :close="value.length > 1"
                        small
                        @click:close="onDelete(index)"
                        >{{
                            $t('expressweb.package.orderLabel') + `${index + 1}`
                        }}</v-chip
                    >
                </div>

                <validation-provider
                    v-slot="{ errors }"
                    :style="{ width: '100%' }"
                    rules="package.required|package.weightType|package.dimensionType|package.dimensionSum"
                >
                    <package-input
                        :value="item"
                        v-bind="$attrs"
                        :errors="errors"
                        :dimension-unit="dimensionUnit"
                        :weight-unit="weightUnit"
                        @input="value => onUpdate(value, index)"
                    />
                </validation-provider>
            </v-col>
        </v-col>

        <v-col>
            <v-btn color="primary" outlined @click="onAdd">
                <v-icon>mdi-plus</v-icon
                >{{ $t('expressweb.package.newPackageButtonLabel') }}
            </v-btn>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';
import _ from 'lodash';

import PackageInput from './PackageInput.vue';

import CtNotification from '@/components/ImprovedUI/CtNotification';

import { PackageItem } from '@/models/expressweb/Package';

@Component({
    components: {
        PackageInput,
        ValidationProvider,
        CtNotification
    }
})
class PackageList extends Vue {
    @Prop({ type: Array, required: true }) readonly value: PackageItem[];
    @Prop({ required: true, default: 'cm' }) readonly dimensionUnit!: string;
    @Prop({ required: true, default: 'kg' }) readonly weightUnit!: string;

    get inlineChip() {
        /* const name = this.$vuetify.breakpoint.name;
        return ['xs', 'sm'].includes(name); */
        return this.$vuetify.breakpoint.smAndDown;
    }

    onUpdate(item: PackageItem, index) {
        const clonedValue = _.clone(this.value);
        clonedValue.splice(index, 1, item);
        this.$emit('input', clonedValue);
    }

    onAdd() {
        const clonedValue = _.clone(this.value);
        clonedValue.push(new PackageItem());
        this.$emit('input', clonedValue);
    }

    onDelete(index) {
        const clonedValue = _.clone(this.value);
        clonedValue.splice(index, 1);
        this.$emit('input', clonedValue);
    }
}

export default PackageList;
</script>

<style>
.package-order {
    flex: 0 0 150px;
    display: flex;
    align-items: center;
}
</style>