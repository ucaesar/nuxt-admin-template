<template>
    <v-text-field
        :value="value"
        hide-details
        @input="onInput"
        @keyup.enter.native="onSearch"
    >
        <template v-slot:append>
            <v-icon color="primary" @click="onSearch">mdi-magnify</v-icon>
        </template>
    </v-text-field>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
class SearchAction extends Vue {
    @Prop({ type: String, required: true }) readonly value!: string;

    onInput(val) {
        this.$emit('input', val);
    }

    onSearch() {
        this.$emit('search');
    }
}
export default SearchAction;
</script>

<style>
</style>