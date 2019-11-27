import {
    ITableDataFromServer,
    IPageOptions,
    computePaginationParams
} from '@/api/admin/table';
import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

export interface IResource {
    id: number;
    name: string;
    action: string;
    url: string;
    description: string;
}
export class Resource implements IResource {
    id = -1;
    name = '';
    action = '';
    url = '';
    description = '';
}

function getBaseUrl() {
    return '/api/resource';
}

export async function $list(
    pageOptions?: IPageOptions
): Promise<ITableDataFromServer> {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();
    let serverData: ITableDataFromServer;

    try {
        let config = pageOptions
            ? { params: computePaginationParams(pageOptions) }
            : {};
        serverData = await $axios.$get(url, config);
    } catch (e) {
        throw e;
    }

    return serverData;
}
