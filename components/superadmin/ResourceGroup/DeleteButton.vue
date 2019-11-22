<template>
    <span>
        <v-btn color="primary" :disabled="disabledState" @click="openAskDialog"
            ><v-icon>mdi-delete</v-icon
            >{{
                $t(
                    'superadmin.resourceGroupManager.removeResourceGroupButtonText'
                )
            }}</v-btn
        >
        <ask-yes-or-no-dialog
            ref="askDialog"
            :title="$t('components.dialog.makeSureToDeleteTitle')"
            :text="text"
            @ok="onDelete"
        />
    </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'nuxt-property-decorator';
import { IResourceGroup, $delete } from '@/api/superadmin/ResourceGroup';

import AskYesOrNoDialog from '@/components/common/AskYesOrNoDialog.vue';

@Component({
    components: {
        AskYesOrNoDialog
    }
})
class DeleteButton extends Vue {
    @Prop({ type: Array, required: true }) readonly selected: IResourceGroup[];
    @Ref('askDialog') readonly askDialog!: any;

    get disabledState() {
        return this.selected.length === 0;
    }

    get text() {
        return this.selected.length === 0 ? '' : this.selected[0].groupname;
    }

    openAskDialog() {
        this.askDialog!.showDialog();
    }

    onDelete() {}
}

export default DeleteButton;
</script>

<style>
</style>