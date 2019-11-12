<template>
    <div>This is Resource Group Manager!</div>
</template>

<script lang="ts">
/* 
    api/resource-group/:id/children
    获取指定id的ResourceGroup的所有子group, id=1的group是所有子group的根
*/
import consola from 'consola';
import { Component, Vue } from 'nuxt-property-decorator';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

interface ResourceGroup {
    id: number;
    groupname: string;
    description: string;
}

interface ResourceGroupList {
    result: ResourceGroup[];
    total: number;
}

@Component({
    layout: 'admin'
})
class ResourceGroupManager extends Vue {
    async asyncData({ $axios }: { $axios: NuxtAxiosInstance }) {
        const url = 'api/resource-group/1/children';
        let resourceGroups: ResourceGroupList = { result: [], total: 0 };
        try {
            resourceGroups = (await $axios.$get(url)) as ResourceGroupList;
        } catch (error) {
            consola.error(`error from get(${url})`, error);
        }
        return { resourceGroups };
    }
}
export default ResourceGroupManager;
</script>

<style>
</style>