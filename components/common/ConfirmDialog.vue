<template>
    <v-dialog :value="visible" max-width="360" persistent>
        <v-card>
            <v-card-title class="headline">{{ title }}</v-card-title>
            <v-card-text>{{ text }}</v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click.stop="onCancel">{{
                    $t('components.dialog.cancelButtonText')
                }}</v-btn
                ><v-btn color="primary" text @click.stop="onOK">{{
                    $t('components.dialog.okButtonText')
                }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator';

@Component
class ConfirmDialog extends Vue {
    @Prop({ type: String, required: true }) readonly title: string;
    @Prop({ type: String }) readonly text: string;
    @Prop({ type: Boolean, required: true }) readonly visible: boolean;

    onOK() {
        this.$emit('close', true);
    }

    onCancel() {
        this.$emit('close', false);
    }
}

export default ConfirmDialog;
</script>

<style>
</style>