import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { ITableDataFromServer, IPaginationParams } from '@/api/admin/table';
import { IResourceGroup } from './ResourceGroup';

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
    let serverData: ITableDataFromServer;

    try {
        let config = paginationParams ? { params: paginationParams } : {};
        serverData = await $axios.$get(url, config);
    } catch (e) {
        throw e;
    }

    return serverData;
}

export async function $delete(role: IRole) {
    const url = getBaseUrl() + `/${role.id}`;
    const $axios = getNuxtAxiosInstance();

    try {
        await $axios.$delete(url);
    } catch (e) {
        throw e;
    }
}

export async function $add(role: IRole) {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    try {
        await $axios.$post(url, role);
    } catch (e) {
        throw e;
    }
}

export async function $detail(role: IRole): Promise<Role> {
    const url = getBaseUrl() + `/${role.id}`;
    const $axios = getNuxtAxiosInstance();
    let result: Role;

    try {
        result = await $axios.$get(url);
    } catch (e) {
        throw e;
    }

    return result;
}

export async function $edit(role: IRole) {
    const url = getBaseUrl() + `/${role.id}`;
    const $axios = getNuxtAxiosInstance();

    try {
        await $axios.$put(url, role);
    } catch (e) {
        throw e;
    }
}
