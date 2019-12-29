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
                                :value="clonedItem.name"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceTable.nameHeaderText'
                                    )
                                "
                                @input="val => onUpdateItem('name', val)"
                            ></v-text-field
                        ></v-col>
                        <v-col cols="12" md="4">
                            <v-select
                                :value="clonedItem.action"
                                :items="actionItems"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceTable.actionHeaderText'
                                    )
                                "
                                @input="val => onUpdateItem('action', val)"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="4"
                            ><v-text-field
                                :value="clonedItem.url"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t('superadmin.resourceTable.urlHeaderText')
                                "
                                @input="val => onUpdateItem('url', val)"
                            ></v-text-field
                        ></v-col>
                        <v-col cols="12">
                            <v-text-field
                                :value="clonedItem.description"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceTable.descriptionHeaderText'
                                    )
                                "
                                @input="val => onUpdateItem('description', val)"
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

import BaseEditorDialog from '@/components/common/CrudTable/BaseEditorDialog.vue';

import { IResource, Resource } from '@/api/superadmin/Resource';
import { VForm, fieldRequired } from '@/utils/form';

@Component
class ResourecEditor extends BaseEditorDialog {
    @Ref('resourceForm') readonly form!: VForm;

    rules = { fieldRequired };

    actionItems = ['GET', 'POST', 'DELETE', 'PUT'];

    newItemFactory() {
        return new Resource();
    }

    onOK() {
        if (this.form.validate()) {
            this.$emit('close', this.clonedItem);
        }
    }

    reset() {
        if (this.form) {
            this.form.resetValidation();
        }
    }
}
export default ResourecEditor;
</script>

<style>
</style>