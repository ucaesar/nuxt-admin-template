<template>
    <div>This is Resource Group Manager!</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

interface ResourceGroup {
    id: number;
    groupname: string;
    description: string;
}

interface ResourceGroupList {
    result: ResourceGroup[],
    total: number
}

@Component({
    layout: 'admin'
})
class ResourceGroupManager extends Vue {}
export default ResourceGroupManager;
</script>

<style>
</style>