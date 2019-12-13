<template>
    <v-input :label="label" :messages="messages">
        <template v-slot:default>
            <v-chip-group column>
                <v-chip
                    v-for="(item, index) in value"
                    :key="index"
                    close
                    @click:close="onCloseChip(item)"
                >
                    {{ item[field] }}
                </v-chip>
            </v-chip-group>
        </template>
    </v-input>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import _ from 'lodash';

@Component
class ChipInut extends Vue {
    @Prop({ type: String, required: true }) readonly label!: string;
    @Prop({ type: String, required: true }) readonly messages!: string;
    @Prop({ type: String, required: true }) readonly field!: string;
    @Prop({ type: String, required: true }) readonly itemKey!: string;
    @Prop({ type: Array, required: true }) readonly value!: any[];

    onCloseChip(item) {
        this.$emit(
            'input',
            _.filter(this.value, x => {
                return x[this.itemKey] !== item[this.itemKey];
            })
        );
    }
}

export default ChipInut;
</script>

<style>
</style>