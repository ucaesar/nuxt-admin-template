<template>
    <div>
        <v-data-table :headers="headers" class="elevation-1"></v-data-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
class ResourceGroupTable extends Vue {
    headers = [
        {
            text: 'Name',
            value: 'name',
            sortable: false
        },
        {
            text: 'Description',
            value: 'description',
            sortable: false
        }
    ];
}

export default ResourceGroupTable;
</script>

<style>
</style>