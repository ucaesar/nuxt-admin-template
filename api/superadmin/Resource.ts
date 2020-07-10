import { ITableDataFromServer, IPaginationParams } from '@/api/admin/crudTable';
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
    paginationParams?: IPaginationParams
): Promise<ITableDataFromServer> {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    const config = paginationParams ? { params: paginationParams } : {};
    const serverData: ITableDataFromServer = await $axios.$get(url, config);

    return serverData;
}

export async function $add(resource: IResource) {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    await $axios.$post(url, resource);
}

export async function $delete(resource: IResource) {
    const url = getBaseUrl() + `/${resource.id}`;
    const $axios = getNuxtAxiosInstance();

    await $axios.$delete(url);
}

export async function $edit(resource: IResource) {
    const url = getBaseUrl() + `/${resource.id}`;
    const $axios = getNuxtAxiosInstance();

    await $axios.$put(url, resource);
}

export async function $detail(resource: IResource): Promise<Resource> {
    const r = await resource;
    return r;
}
