<template>
    <v-tab :style="colorStyle">
        <v-icon left :style="colorStyle">{{ iconString }}</v-icon>
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

    get iconString() {
        return this.error ? 'mdi-alert' : this.icon;
    }

    get colorStyle() {
        return this.error ? { color: 'red' } : {};
    }
}

export default FormTab;
</script>

<style>
</style>