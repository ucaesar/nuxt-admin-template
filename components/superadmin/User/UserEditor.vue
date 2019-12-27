<template>
    <v-dialog :value="visible" persistent max-width="1200" scrollable>
        <v-card>
            <v-card-title class="headline">{{
                $t('superadmin.userTable.editorTitle')
            }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="userForm">
                    <v-row>
                        <v-col cols="12">
                            <chip-input
                                :value="clonedItem.roles"
                                :label="
                                    $t('superadmin.userTable.roleInputLabel')
                                "
                                :messages="
                                    $t('superadmin.userTable.roleInputHint')
                                "
                                field="rolename"
                                item-key="id"
                                @input="onChangeRoles"
                            />
                        </v-col>
                    </v-row>
                </v-form>
                <role-table
                    :value="clonedItem.roles"
                    select-action
                    search-action
                    @input="onChangeRoles"
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
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'nuxt-property-decorator';
import _ from 'lodash';

import ChipInput from '@/components/common/CrudTable/ChipInput.vue';
import RoleTable from '@/components/superadmin/Role/RoleTable.vue';

import { VForm, fieldRequired } from '@/utils/form';

import { User } from '@/api/superadmin/User';

@Component({
    components: {
        RoleTable,
        ChipInput
    }
})
class UserEditor extends Vue {
    @Prop({ type: Boolean, required: true }) readonly visible!: boolean;
    @Prop({ required: true }) readonly item!: User | undefined;

    @Ref('userForm') readonly form!: VForm;

    @Watch('visible')
    onOpenDialog(val: boolean, oldVal: boolean) {
        if (!oldVal && val) {
            if (typeof this.item === 'undefined') this.clonedItem = new User();
            else this.clonedItem = _.cloneDeep(this.item);
            if (this.form) {
                this.form.resetValidation();
            }
        }
    }

    rules = { fieldRequired };
    clonedItem = new User();

    onOK() {
        if (this.form.validate()) {
            this.$emit('close', this.clonedItem);
        }
    }

    onCancel() {
        this.$emit('close', false);
    }

    onChangeRoles(items) {
        this.clonedItem.roles = items;
    }
}

export default UserEditor;
</script>

<style>
</style>