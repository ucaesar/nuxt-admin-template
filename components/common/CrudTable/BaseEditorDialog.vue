<template>
    <div />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';

import _ from 'lodash';

@Component
class BaseEditorDialog extends Vue {
    @Prop({ type: Boolean, required: true }) readonly visible!: boolean;
    @Prop({ required: true }) readonly item!: any | undefined;

    @Watch('visible')
    onOpenDialog(val: boolean, oldVal: boolean) {
        if (!oldVal && val) {
            if (typeof this.item === 'undefined')
                this.clonedItem = this.newItemFactory();
            else this.clonedItem = _.cloneDeep(this.item);

            this.reset();
        }
    }

    clonedItem = this.newItemFactory();

    onCancel() {
        this.$emit('close', false);
    }

    /** Must be override */
    newItemFactory() {
        return {};
    }

    /** Must be override */
    reset() {}

    /** Must be override */
    onOK() {}

    onUpdateItem(key, value) {
        this.clonedItem[key] = value;
    }
}

export default BaseEditorDialog;
</script>

<style>
</style>