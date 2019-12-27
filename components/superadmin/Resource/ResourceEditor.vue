<template>
    <v-dialog :value="visible" persistent max-width="900" scrollable
        ><v-card
            ><v-card-title class="headline">{{
                $t('superadmin.resourceTable.editorTitle')
            }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text
                ><v-form ref="resourceForm"
                    ><v-row>
                        <v-col cols="12" md="4"
                            ><v-text-field
                                v-model="clonedItem.name"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceTable.nameHeaderText'
                                    )
                                "
                            ></v-text-field
                        ></v-col>
                        <v-col cols="12" md="4">
                            <v-select
                                v-model="clonedItem.action"
                                :items="actionItems"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceTable.actionHeaderText'
                                    )
                                "
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="4"
                            ><v-text-field
                                v-model="clonedItem.url"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t('superadmin.resourceTable.urlHeaderText')
                                "
                            ></v-text-field
                        ></v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="clonedItem.description"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceTable.descriptionHeaderText'
                                    )
                                "
                            ></v-text-field></v-col></v-row></v-form
            ></v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click.stop="onCancel">{{
                    $t('components.dialog.cancelButtonText')
                }}</v-btn
                ><v-btn color="primary" text @click.stop="onOK">{{
                    $t('components.dialog.submitButtonText')
                }}</v-btn>
            </v-card-actions></v-card
        ></v-dialog
    >
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'nuxt-property-decorator';
import _ from 'lodash';

import { IResource, Resource } from '@/api/superadmin/Resource';
import { VForm, fieldRequired } from '@/utils/form';

@Component
class ResourecEditor extends Vue {
    @Prop({ type: Boolean, required: true }) readonly visible!: boolean;
    @Prop({ required: true }) readonly item!: IResource | undefined;
    @Ref('resourceForm') readonly form!: VForm;

    @Watch('visible')
    onOpenDialog(val: boolean, oldVal: boolean) {
        if (!oldVal && val) {
            if (typeof this.item === 'undefined')
                this.clonedItem = new Resource();
            else this.clonedItem = _.cloneDeep(this.item);
            if (this.form) {
                this.form.resetValidation();
            }
        }
    }

    onOK() {
        if (this.form.validate()) {
            this.$emit('close', this.clonedItem);
        }
    }

    onCancel() {
        this.$emit('close', false);
    }

    rules = { fieldRequired };
    clonedItem = new Resource();

    actionItems = ['GET', 'POST', 'DELETE', 'PUT'];
}
export default ResourecEditor;
</script>

<style>
</style>