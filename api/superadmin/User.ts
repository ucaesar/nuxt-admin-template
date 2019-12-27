import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { ITableDataFromServer, IPaginationParams } from '@/api/admin/crudTable';
import { IRole } from '@/api/superadmin/Role';

export interface IUser {
    id: number;
    username: string;
    roles?: IRole[];
}

export class User implements IUser {
    id = -1;
    username = '';
    roles = [];
}

function getBaseUrl() {
    return '/api/user';
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

export async function $delete() {
    return;
}

export async function $add() {
    return;
}

export async function $detail(user: IUser): Promise<User> {
    const url = getBaseUrl() + `/${user.id}`;
    const $axios = getNuxtAxiosInstance();
    let result: User;

    try {
        result = await $axios.$get(url);
    } catch (e) {
        throw e;
    }

    return result;
}

export async function $edit(user: IUser) {
    const url = getBaseUrl() + `/${user.id}`;
    const $axios = getNuxtAxiosInstance();

    try {
        await $axios.$put(url, user);
    } catch (e) {
        throw e;
    }
}
