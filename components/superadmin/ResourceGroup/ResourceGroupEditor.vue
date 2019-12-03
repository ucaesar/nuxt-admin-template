<template>
    <v-dialog :value="visible" persistent max-width="1200"
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
                            <v-input
                                label="包含资源"
                                messages="从列表中勾选资源"
                            >
                                <template v-slot:default>
                                    <v-chip-group column>
                                        <v-chip
                                            v-for="(resource,
                                            index) in clonedItem.resources"
                                            :key="index"
                                            close
                                            @click:close="onCloseChip(resource)"
                                        >
                                            {{ resource.name }}
                                        </v-chip>
                                    </v-chip-group>
                                </template>
                            </v-input>
                        </v-col>
                    </v-row>
                </v-form>
                <resource-table
                    :value="clonedItem.resources"
                    select-action
                    search-action
                    @input="onSelectResources"
                />
            </v-card-text>
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

import {
    IResourceGroup,
    ResourceGroup,
    $detail
} from '@/api/superadmin/ResourceGroup';
import { VForm, fieldRequired } from '@/utils/form';
import { IResource } from '@/api/superadmin/Resource';

@Component({
    components: {
        ResourceTable
    }
})
class ResourceGroupEditor extends Vue {
    @Prop({ type: Boolean, required: true }) readonly visible!: boolean;
    @Prop({ type: Object, required: true }) readonly item!: ResourceGroup;

    @Ref('resourceGroupForm') readonly form!: VForm;

    @Watch('visible')
    onOpenDialog(val: boolean, oldVal: boolean) {
        if (!oldVal && val) {
            this.clonedItem = _.cloneDeep(this.item);
            if (this.form) {
                this.form.resetValidation();
            }
        }
    }

    rules = { fieldRequired };
    clonedItem = new ResourceGroup();

    onOK() {
        this.$emit('close', this.clonedItem);
    }

    onCancel() {
        this.$emit('close', false);
    }

    onSelectResources(items) {
        this.clonedItem.resources = items;
    }

    onCloseChip(resource) {
        const i = _.findIndex(this.clonedItem.resources, function(
            x: IResource
        ) {
            return x.id === resource.id;
        });

        this.clonedItem.resources.splice(i, 1);
    }
}
export default ResourceGroupEditor;
</script>

<style>
</style>