<template>
    <v-dialog :value="visible" persistent max-width="900"
        ><v-card
            ><v-card-title class="headline">Edit Resource Group</v-card-title>
            <v-card-text> Pass </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click.stop="onCancel">{{
                    $t('components.dialog.cancelButtonText')
                }}</v-btn
                ><v-btn color="primary" text @click.stop="onOK">{{
                    $t('components.dialog.okButtonText')
                }}</v-btn>
            </v-card-actions></v-card
        ></v-dialog
    >
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import _ from 'lodash';

import { IResourceGroup, ResourceGroup } from '@/api/superadmin/ResourceGroup';

@Component
class ResourceGroupEditor extends Vue {
    @Prop({ type: Boolean, required: true }) readonly visible!: boolean;
    @Prop({ type: Object, required: true }) readonly item!: IResourceGroup;

    clonedItem = new ResourceGroup();

    @Watch('visible')
    onOpenDialog(val: boolean, oldVal: boolean) {
        if (!oldVal && val) {
            this.clonedItem = _.cloneDeep(this.item);
        }
    }

    onOK() {
        this.$emit('close', this.clonedItem);
    }

    onCancel() {
        this.$emit('close', false);
    }
}
export default ResourceGroupEditor;
</script>

<style>
</style>