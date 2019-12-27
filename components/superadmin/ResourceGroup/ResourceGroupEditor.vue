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
                                v-model="clonedItem.groupname"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceGroupTable.groupNameHeaderText'
                                    )
                                "
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="8">
                            <v-text-field
                                v-model="clonedItem.description"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.resourceGroupTable.descriptionHeaderText'
                                    )
                                "
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
                                @input="onChangeResources"
                            />
                        </v-col>
                    </v-row>
                </v-form>
                <resource-table
                    :value="clonedItem.resources"
                    select-action
                    search-action
                    @input="onChangeResources"
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

import ResourceTable from '@/components/superadmin/Resource/ResourceTable.vue';
import ChipInput from '@/components/common/CrudTable/ChipInput.vue';

import {
    IResourceGroup,
    ResourceGroup,
    $detail
} from '@/api/superadmin/ResourceGroup';
import { VForm, fieldRequired } from '@/utils/form';
import { IResource } from '@/api/superadmin/Resource';

@Component({
    components: {
        ResourceTable,
        ChipInput
    }
})
class ResourceGroupEditor extends Vue {
    @Prop({ type: Boolean, required: true }) readonly visible!: boolean;
    @Prop({ required: true }) readonly item!: ResourceGroup | undefined;

    @Ref('resourceGroupForm') readonly form!: VForm;

    @Watch('visible')
    onOpenDialog(val: boolean, oldVal: boolean) {
        if (!oldVal && val) {
            if (typeof this.item === 'undefined')
                this.clonedItem = new ResourceGroup();
            else this.clonedItem = _.cloneDeep(this.item);
            if (this.form) {
                this.form.resetValidation();
            }
        }
    }

    rules = { fieldRequired };
    clonedItem = new ResourceGroup();

    onOK() {
        if (this.form.validate()) {
            this.$emit('close', this.clonedItem);
        }
    }

    onCancel() {
        this.$emit('close', false);
    }

    onChangeResources(items) {
        this.clonedItem.resources = items;
    }
}
export default ResourceGroupEditor;
</script>

<style>
</style>