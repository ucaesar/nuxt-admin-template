<template>
    <span>
        <v-icon small @click="openAskDialog">mdi-delete</v-icon>
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
class DeleteAction extends Vue {
    @Prop({ type: Object, required: true }) readonly item: IResourceGroup;
    @Ref('askDialog') readonly askDialog!: any;

    get text() {
        return this.item.groupname;
    }

    openAskDialog() {
        this.askDialog!.showDialog();
    }

    onDelete() {}
}
export default DeleteAction;
</script>

<style>
</style>