<template>
    <v-dialog v-model="visible" max-width="300" persistent>
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
class AskYesOrNoDialog extends Vue {
    @Prop({ type: String, required: true }) readonly title: string;
    @Prop({ type: String }) readonly text: string;

    @Emit('ok')
    onOK() {
        this.visible = false;
    }

    @Emit('cancel')
    onCancel() {
        this.visible = false;
    }

    visible = false;
    showDialog() {
        this.visible = true;
    }
}

export default AskYesOrNoDialog;
</script>

<style>
</style>