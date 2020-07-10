import { IResourceGroup } from './ResourceGroup';

import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { ITableDataFromServer, IPaginationParams } from '@/api/admin/crudTable';

export interface IRole {
    id: number;
    name: string;
    description: string;
    parents?: IRole[];
    groups?: IResourceGroup[];
}

export class Role implements IRole {
    id = -1;
    name = '';
    description = '';
    parents = [];
    groups = [];
}

function getBaseUrl() {
    return '/api/role';
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

export async function $delete(role: IRole) {
    const url = getBaseUrl() + `/${role.id}`;
    const $axios = getNuxtAxiosInstance();

    await $axios.$delete(url);
}

export async function $add(role: IRole) {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    await $axios.$post(url, role);
}

export async function $detail(role: IRole): Promise<Role> {
    const url = getBaseUrl() + `/${role.id}`;
    const $axios = getNuxtAxiosInstance();
    const result: Role = await $axios.$get(url);

    return result;
}

export async function $edit(role: IRole) {
    const url = getBaseUrl() + `/${role.id}`;
    const $axios = getNuxtAxiosInstance();

    await $axios.$put(url, role);
}
