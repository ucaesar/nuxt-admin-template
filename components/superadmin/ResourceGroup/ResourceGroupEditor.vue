<template>
    <v-dialog :value="visible" persistent max-width="1200" scrollable
        ><v-card
            ><v-card-title class="headline">{{
                $t('superadmin.resourceGroupTable.editorTitle')
            }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="resourceGroupForm">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field
                                :value="clonedItem.groupname"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceGroupTable.groupNameHeaderText'
                                    )
                                "
                                @input="val => onUpdateItem('groupname', val)"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="8">
                            <v-text-field
                                :value="clonedItem.description"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceGroupTable.descriptionHeaderText'
                                    )
                                "
                                @input="val => onUpdateItem('description', val)"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <chip-input
                                :value="clonedItem.resources"
                                :label="
                                    $t(
                                        'superadmin.resourceGroupTable.resourceInputLabel'
                                    )
                                "
                                :messages="
                                    $t(
                                        'superadmin.resourceGroupTable.resourceInputHint'
                                    )
                                "
                                field="name"
                                item-key="id"
                                @input="val => onUpdateItem('resources', val)"
                            />
                        </v-col>
                    </v-row>
                </v-form>
                <resource-table
                    ref="resourceTable"
                    :value="clonedItem.resources"
                    select-action
                    search-action
                    @input="val => onUpdateItem('resources', val)"
                />
            </v-card-text>
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

import ResourceTable from '@/components/superadmin/Resource/ResourceTable.vue';
import ChipInput from '@/components/common/CrudTable/ChipInput.vue';

import { IResourceGroup, ResourceGroup } from '@/api/superadmin/ResourceGroup';
import { VForm, fieldRequired } from '@/utils/form';
import { CrudTableComponent } from '@/utils/crudTable';
import { IResource } from '@/api/superadmin/Resource';

@Component({
    components: {
        ResourceTable,
        ChipInput
    }
})
class ResourceGroupEditor extends BaseEditorDialog {
    @Ref('resourceGroupForm') readonly form!: VForm;
    @Ref('resourceTable') readonly resourceTable!: CrudTableComponent;

    rules = { fieldRequired };

    newItemFactory() {
        return new ResourceGroup();
    }

    onOK() {
        if (this.form.validate()) {
            this.$emit('close', this.clonedItem);
        }
    }

    reset() {
        if (this.form) {
            this.form.resetValidation();
            this.resourceTable.reset();
        }
    }
}
export default ResourceGroupEditor;
</script>

<style>
</style>