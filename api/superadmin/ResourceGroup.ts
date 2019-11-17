import { TableDataFromServer } from '@/api/admin';
import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

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
    const $axios = getNuxtAxiosInstance();
    let resourceGroups = new TableDataFromServer();

    try {
        resourceGroups.setData(
            await $axios.$get(url, {
                params: {
                    start: (page - 1) * itemsPerPage,
                    count: itemsPerPage
                }
            })
        );
    } catch (error) {
        throw error;
    }

    return resourceGroups;
}
