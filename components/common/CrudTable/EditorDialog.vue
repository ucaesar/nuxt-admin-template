<template>
    <v-dialog :value="visible" persisitent max-width="900" scrollable>
        <v-card>
            <v-card-title class="headline">{{ editorTitle }}</v-card-title>
        </v-card>
        <v-divider />
        <v-card-text></v-card-text>
        <v-divider />
        <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click.stop="onCancel">{{
                $t('components.dialog.cancelButtonText')
            }}</v-btn
            ><v-btn color="primary" text @click.stop="onOK">{{
                $t('components.dialog.submitButtonText')
            }}</v-btn>
        </v-card-actions>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
class EditorDialog extends Vue {
    @Prop({ type: Boolean, required: true }) readonly visible!: boolean;
    @Prop({ type: String, required: true }) readonly editorTitle!: string;
}

export default EditorDialog;
</script>

<style>
</style>