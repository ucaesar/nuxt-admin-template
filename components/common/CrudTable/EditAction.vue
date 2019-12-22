<template>
    <span>
        <v-icon small @click.stop="onEdit">mdi-pencil</v-icon>
    </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
class EditAction extends Vue {
    @Prop({ type: Object, required: true }) readonly item!: any;

    onEdit() {
        this.$emit('edit', this.item);
    }
}
export default EditAction;
</script>

<style>
</style>