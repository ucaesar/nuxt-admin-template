<template>
    <v-overlay :value="loading" absolute opacity="0.3">
        <!-- <v-progress-circular indeterminate />
        <span>{{ loadingText }}</span> -->
        <v-chip>
            <v-progress-circular indeterminate size="16" class="mr-2" />
            <span>{{ loadingText }}</span>
        </v-chip>
    </v-overlay>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
class LoadingOverlay extends Vue {
    @Prop({ type: Boolean, required: true }) readonly loading!: boolean;
    @Prop({ type: String, default: 'Loading...' }) readonly loadingText: string;
}

export default LoadingOverlay;
</script>

<style>
</style>