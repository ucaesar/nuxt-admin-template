import { NuxtAxiosInstance } from '@nuxtjs/axios';
import Vue from 'vue';

import { TableDataFromServer } from '@/api/admin';

export interface ResourceGroup {
    id: number;
    groupname: string;
    description: string;
}

export async function readResourceGroups({
    page,
    itemsPerPage
}: {
    page: number;
    itemsPerPage: number;
}): Promise<TableDataFromServer> {
    const url = 'api/resource-group/1/children';
    const $axios: NuxtAxiosInstance = Vue.prototype.$nuxt.$options.$axios;
    let resourceGroups: TableDataFromServer = { result: [], total: 0 };

    try {
        resourceGroups = (await $axios.$get(url, {
            params: { start: (page - 1) * itemsPerPage, count: itemsPerPage }
        })) as TableDataFromServer;
    } catch (error) {
        throw error;
    }

    return resourceGroups;
}
