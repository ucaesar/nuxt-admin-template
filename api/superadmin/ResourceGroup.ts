import { IResource } from './Resource';

import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { ITableDataFromServer, IPaginationParams } from '@/api/admin/crudTable';

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

    const config = paginationParams ? { params: paginationParams } : {};
    const serverData: ITableDataFromServer = await $axios.$get(url, config);

    return serverData;
}

export async function $delete(resourceGroup: IResourceGroup) {
    const url = getBaseUrl() + `/${resourceGroup.id}`;
    const $axios = getNuxtAxiosInstance();

    await $axios.$delete(url);
}

export async function $add(resourceGroup: IResourceGroup) {
    const url = getBaseUrl() + '/1/children';
    const $axios = getNuxtAxiosInstance();

    await $axios.$post(url, resourceGroup);
}

export async function $detail(
    resourceGroup: IResourceGroup
): Promise<ResourceGroup> {
    const url = getBaseUrl() + `/${resourceGroup.id}`;
    const $axios = getNuxtAxiosInstance();
    const group: ResourceGroup = await $axios.$get(url);

    return group;
}

export async function $edit(resourceGroup: IResourceGroup) {
    const url = getBaseUrl() + `/${resourceGroup.id}`;
    const $axios = getNuxtAxiosInstance();

    await $axios.$put(url, resourceGroup);
}
