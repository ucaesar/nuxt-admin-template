import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { IResource } from './Resource';

import { ITableDataFromServer, IPaginationParams } from '@/api/admin/table';

export interface IResourceGroup {
    id: number;
    groupname: string;
    description: string;
    resources?: IResource[];
}
export class ResourceGroup implements IResourceGroup {
    id = -1;
    groupname = '';
    description = '';
    resources = [];
}

function getBaseUrl() {
    return '/api/resource-group';
}

export async function $list(
    paginationParams?: IPaginationParams
): Promise<ITableDataFromServer> {
    const url = getBaseUrl() + '/1/children';
    const $axios = getNuxtAxiosInstance();
    let serverData: ITableDataFromServer;

    try {
        let config = paginationParams ? { params: paginationParams } : {};
        serverData = await $axios.$get(url, config);
    } catch (e) {
        throw e;
    }

    return serverData;
}

export async function $delete(resourceGroup: IResourceGroup) {
    const url = getBaseUrl() + `/${resourceGroup.id}`;
    const $axios = getNuxtAxiosInstance();

    try {
        $axios.$delete(url);
    } catch (e) {
        throw e;
    }
}

export async function $add(resourceGroup: IResourceGroup) {
    const url = getBaseUrl() + '/1/children';
    const $axios = getNuxtAxiosInstance();

    try {
        $axios.$post(url, resourceGroup);
    } catch (e) {
        throw e;
    }
}

export async function $detail(
    resourceGroup: IResourceGroup
): Promise<ResourceGroup> {
    const url = getBaseUrl() + `/${resourceGroup.id}`;
    const $axios = getNuxtAxiosInstance();
    let group: ResourceGroup;

    try {
        group = await $axios.$get(url);
    } catch (e) {
        throw e;
    }

    return group;
}
