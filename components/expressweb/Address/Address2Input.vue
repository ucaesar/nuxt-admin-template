<template>
    <validation-provider>
        <v-textarea
            :value="value"
            v-bind="$attrs"
            :label="$t('expressweb.address.address2Label')"
            auto-grow
            rows="1"
            @input="onUpdate"
        />
    </validation-provider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

@Component({
    components: {
        ValidationProvider
    }
})
class Address2Input extends Vue {
    @Prop({ required: true }) readonly value!: string | undefined;

    onUpdate(val) {
        this.$emit('input', val);
    }
}

export default Address2Input;
</script>

<style>
</style>