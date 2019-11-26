<template>
    <span>
        <v-icon small @click="onDelete">mdi-delete</v-icon>
    </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'nuxt-property-decorator';

@Component
class DeleteAction extends Vue {
    @Prop({ type: Object, required: true }) readonly item!: any;

    onDelete() {
        this.$emit('delete', this.item);
    }
}
export default DeleteAction;
</script>

<style>
</style>