<template>
    <div class="d-flex">
        <div v-if="showLabel" :style="inlineStyle" :class="classes">
            {{ label }}
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
class FixedLabelInput extends Vue {
    @Prop({ required: true, default: '' }) readonly labelWidth!: string;
    @Prop({ type: String, default: '' }) readonly label!: string;
    @Prop({ type: Boolean, default: false }) readonly error!: boolean;
    @Prop({ type: Boolean, default: true }) readonly showLabel!: boolean;

    get inlineStyle() {
        return {
            flex: `0 0 ${this.labelWidth}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
        };
    }

    get classes() {
        const normal = 'mr-4 v-label theme--light';
        if (!this.error) return normal;
        return normal + ' error--text';
    }
}

export default FixedLabelInput;
</script>

<style>
</style>