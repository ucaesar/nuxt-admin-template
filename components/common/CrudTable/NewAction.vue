<template>
    <div>
        <v-btn color="primary" @click.stop="onNew">
            <v-icon>mdi-plus</v-icon>
            {{ text }}
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator';

@Component
class NewAction extends Vue {
    @Prop({ type: String, required: true }) readonly text!: String;
    onNew() {
        this.$emit('new');
    }
}

export default NewAction;
</script>

<style>
</style>