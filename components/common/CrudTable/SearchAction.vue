<template>
    <v-text-field
        :value="value"
        :placeholder="$t('components.crudTable.searchText')"
        append-outer-icon="mdi-magnify"
        hide-details
        @input="onInput"
        @keyup.enter.native="onSearch"
        @click:append-outer="onSearch"
    >
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