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
import { Component, Vue, Prop, Ref, Emit } from 'nuxt-property-decorator';
import { IResourceGroup } from '@/api/superadmin/ResourceGroup';

import AskYesOrNoDialog from '@/components/common/AskYesOrNoDialog.vue';

@Component({
    components: {
        AskYesOrNoDialog
    }
})
class DeleteAction extends Vue {
    @Prop({ type: Object, required: true }) readonly item: IResourceGroup;
    @Ref('askDialog') readonly askDialog!: any;

    onDelete() {
        this.$emit('delete', this.item);
    }

    get text() {
        return this.item.groupname;
    }

    openAskDialog() {
        this.askDialog!.showDialog();
    }
}
export default DeleteAction;
</script>

<style>
</style>