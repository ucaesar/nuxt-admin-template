<template>
    <v-expansion-panel-header>
        <div class="d-flex">
            <v-avatar size="32" color="primary mr-2"
                ><span class="white--text">{{ step + 1 }}</span></v-avatar
            >
            <div class="align-self-center text-subtitle-1">
                {{ headerText }}
            </div>
        </div>
    </v-expansion-panel-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
class ExpansionStepHeader extends Vue {
    @Prop({ type: Number, required: true }) readonly step!: number;
    @Prop({ type: String, required: true }) readonly headerText: string;
}

export default ExpansionStepHeader;
</script>

<style>
</style>