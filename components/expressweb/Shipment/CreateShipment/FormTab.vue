<template>
    <v-tab>
        <v-icon left>{{ icon }}</v-icon>
        {{ label }}
    </v-tab>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
class FormTab extends Vue {
    @Prop({ required: true }) readonly label!: string;
    @Prop({ required: true }) readonly error!: boolean;
    @Prop({ required: true }) readonly icon!: string;
}

export default FormTab;
</script>

<style>
</style>