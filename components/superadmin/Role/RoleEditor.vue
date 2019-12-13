<template>
    <v-dialog :value="visible" persistent max-width="1200">
        <v-card>
            <v-card-title class="headline">{{
                $t('superadmin.roleTable.editorTitle')
            }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="roleForm">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="clonedItem.rolename"
                                :rules="[rules.fieldRequired]"
                                :label="
                                    $t(
                                        'superadmin.roleTable.roleNameHeaderText'
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
                                        'superadmin.roleTable.descriptionHeaderText'
                                    )
                                "
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
                <v-tabs>
                    <v-tab>角色继承</v-tab>
                    <v-tab>包含资源组</v-tab>

                    <v-tab-item>
                        <v-row>
                            <v-col cols="12">
                                <chip-input
                                    :value="clonedItem.parents"
                                    label="继承自角色"
                                    messages="从列表中勾选角色"
                                    field="rolename"
                                    item-key="id"
                                    @input="onChangeParents"
                                />
                            </v-col>
                            <v-col coles="12">
                                <role-table
                                    :value="clonedItem.parents"
                                    select-action
                                    search-action
                                    @input="onChangeParents"
                                />
                            </v-col>
                        </v-row>
                    </v-tab-item>

                    <v-tab-item>
                        <v-row>
                            <v-col cols="12">
                                <chip-input
                                    :value="clonedItem.groups"
                                    label="包含资源组"
                                    messages="从列表中勾选"
                                    field="groupname"
                                    item-key="id"
                                    @input="onChangeGroups"
                                />
                            </v-col>
                            <v-col cols="12">
                                <resource-group-table
                                    :value="clonedItem.groups"
                                    select-action
                                    search-action
                                    @input="onChangeGroups"
                                />
                            </v-col>
                        </v-row>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click.stop="onCancel">{{
                    $t('components.dialog.cancelButtonText')
                }}</v-btn
                ><v-btn color="primary" text @click.stop="onOK">{{
                    $t('components.dialog.submitButtonText')
                }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'nuxt-property-decorator';
import _ from 'lodash';

import ChipInput from '@/components/common/Table/ChipInput.vue';
import ResourceGroupTable from '@/components/superadmin/ResourceGroup/ResourceGroupTable.vue';

import { VForm, fieldRequired } from '@/utils/form';

import { Role } from '@/api/superadmin/Role';

@Component({
    components: {
        RoleTable: () => import('./RoleTable.vue'),
        ResourceGroupTable,
        ChipInput
    }
})
class RoleEditor extends Vue {
    @Prop({ type: Boolean, required: true }) readonly visible!: boolean;
    @Prop({ type: Object, required: true }) readonly item!: Role;

    @Ref('roleForm') readonly form!: VForm;

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
    clonedItem = new Role();

    onOK() {
        this.$emit('close', this.clonedItem);
    }

    onCancel() {
        this.$emit('close', false);
    }

    onChangeParents(items) {
        this.clonedItem.parents = items;
    }

    onChangeGroups(items) {
        this.clonedItem.groups = items;
    }
}

export default RoleEditor;
</script>

<style>
</style>